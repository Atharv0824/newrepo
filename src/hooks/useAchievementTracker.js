import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

/**
 * Centralized Achievement Tracker Hook
 * Automatically tracks user actions and unlocks achievements
 * Updates all connected features in real-time
 */

const useAchievementTracker = (user) => {
  const [achievements, setAchievements] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);

  // Load user achievements on mount
  useEffect(() => {
    if (user) {
      loadUserProgress();
    } else {
      loadDemoData();
    }
  }, [user]);

  // Load user's achievement progress from database
  const loadUserProgress = async () => {
    try {
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData?.user?.id;

      if (!userId) {
        loadDemoData();
        return;
      }

      // Fetch achievements
      const { data: achievementData, error: achError } = await supabase
        .from('user_achievements')
        .select('*')
        .eq('user_id', userId);

      // Fetch certificates
      const { data: certData, error: certError } = await supabase
        .from('certificates')
        .select('*')
        .order('issue_date', { ascending: false })
        .eq('user_id', userId);

      if (!achError && achievementData) {
        setAchievements(achievementData);
        calculateLevel(achievementData);
      }

      if (!certError && certData) {
        setCertificates(certData);
      }
    } catch (error) {
      console.error('Error loading progress:', error);
      loadDemoData();
    } finally {
      setLoading(false);
    }
  };

  // Load demo data for non-authenticated users
  const loadDemoData = () => {
    const demoAchievements = [
      { id: 1, achievement_id: 1, unlocked: true, unlocked_at: new Date().toISOString(), progress: 100, points: 100, xp: 100 },
      { id: 2, achievement_id: 3, unlocked: true, unlocked_at: new Date().toISOString(), progress: 1, points: 50, xp: 50 },
      { id: 3, achievement_id: 7, unlocked: true, unlocked_at: new Date().toISOString(), progress: 10, points: 75, xp: 75 }
    ];
    setAchievements(demoAchievements);
    calculateLevel(demoAchievements);
    setLoading(false);
  };

  // Calculate user level based on XP
  const calculateLevel = (userAchievements) => {
    const totalXP = userAchievements
      .filter(a => a.unlocked)
      .reduce((sum, a) => sum + (a.xp || 0), 0);
    
    setXp(totalXP);
    
    const levels = [
      { level: 1, minXP: 0, maxXP: 500 },
      { level: 2, minXP: 500, maxXP: 1500 },
      { level: 3, minXP: 1500, maxXP: 3000 },
      { level: 4, minXP: 3000, maxXP: 5000 },
      { level: 5, minXP: 5000, maxXP: 8000 },
      { level: 6, minXP: 8000, maxXP: 12000 },
      { level: 7, minXP: 12000, maxXP: 20000 },
      { level: 8, minXP: 20000, maxXP: 999999 }
    ];

    const currentLevel = levels.find(l => 
      totalXP >= l.minXP && totalXP < l.maxXP
    ) || levels[levels.length - 1];
    
    setLevel(currentLevel.level);
  };

  // Track any user action
  const trackAction = async (actionType, metadata = {}) => {
    if (!user) return;

    try {
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData?.user?.id;

      if (!userId) return;

      // Update or create achievement progress
      const achievementUpdates = getAchievementUpdates(actionType, metadata);
      
      for (const update of achievementUpdates) {
        await processAchievementUpdate(userId, update);
      }
    } catch (error) {
      console.error('Error tracking action:', error);
    }
  };

  // Get achievement updates based on action type
  const getAchievementUpdates = (actionType, metadata) => {
    switch (actionType) {
      case 'PROFILE_UPDATE':
        return handleProfileUpdate(metadata);
      case 'TEST_COMPLETED':
        return handleTestCompleted(metadata);
      case 'COLLEGE_VIEWED':
        return handleCollegeViewed(metadata);
      case 'SCHOLARSHIP_APPLIED':
        return handleScholarshipApplied(metadata);
      case 'APPLICATION_SUBMITTED':
        return handleApplicationSubmitted(metadata);
      case 'EVENT_ATTENDED':
        return handleEventAttended(metadata);
      case 'MATERIAL_DOWNLOADED':
        return handleMaterialDownloaded(metadata);
      case 'GOAL_SET':
        return handleGoalSet(metadata);
      case 'REVIEW_SUBMITTED':
        return handleReviewSubmitted(metadata);
      default:
        return [];
    }
  };

  // Process individual achievement update
  const processAchievementUpdate = async (userId, update) => {
    const { achievementId, increment = 1, checkUnlock = true } = update;

    // Get current progress
    const { data: current } = await supabase
      .from('user_achievements')
      .select('*')
      .eq('user_id', userId)
      .eq('achievement_id', achievementId)
      .single();

    const newProgress = (current?.progress || 0) + increment;

    if (current) {
      // Update existing
      await supabase
        .from('user_achievements')
        .update({ 
          progress: newProgress,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userId)
        .eq('achievement_id', achievementId);
    } else {
      // Create new
      await supabase
        .from('user_achievements')
        .insert([{
          user_id: userId,
          achievement_id: achievementId,
          progress: newProgress,
          unlocked: false
        }]);
    }

    // Check if should unlock
    if (checkUnlock) {
      await checkAndUnlockAchievement(userId, achievementId, newProgress);
    }

    // Refresh local state
    loadUserProgress();
  };

  // Check and unlock achievement if requirements met
  const checkAndUnlockAchievement = async (userId, achievementId, progress) => {
    const achievementDefinitions = getAchievementDefinitions();
    const definition = achievementDefinitions.find(a => a.id === achievementId);

    if (!definition) return;

    if (progress >= definition.requirement) {
      const { data: current } = await supabase
        .from('user_achievements')
        .select('*')
        .eq('user_id', userId)
        .eq('achievement_id', achievementId)
        .single();

      if (!current?.unlocked) {
        // Unlock achievement
        await supabase
          .from('user_achievements')
          .update({ 
            unlocked: true,
            unlocked_at: new Date().toISOString()
          })
          .eq('user_id', userId)
          .eq('achievement_id', achievementId);

        // Award points and XP (handled by database trigger or manually)
        showNotification(`🎉 Achievement Unlocked: ${definition.title}!`, 'success');
        
        // Generate certificate if applicable
        if (definition.certificate) {
          await generateCertificate(userId, definition);
        }
      }
    }
  };

  // Generate certificate for achievement
  const generateCertificate = async (userId, achievement) => {
    const credentialId = `FF-${achievement.id}-${Date.now()}`;
    
    await supabase
      .from('certificates')
      .insert([{
        user_id: userId,
        title: `${achievement.title} Certificate`,
        issuer: 'Future Forge',
        issue_date: new Date().toISOString().split('T')[0],
        score: 'Completed',
        percentile: 'Top Performer',
        credential_id: credentialId,
        verified: true
      }]);
  };

  // Show notification
  const showNotification = (message, type = 'info') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  // Action Handlers
  const handleProfileUpdate = (metadata) => {
    const updates = [];
    
    if (metadata.completion === 100) {
      updates.push({ achievementId: 1, increment: 1 }); // Profile Pioneer
    }
    
    if (metadata.allOptionalFields) {
      updates.push({ achievementId: 2, increment: 1 }); // Detail Master
    }
    
    return updates;
  };

  const handleTestCompleted = (metadata) => {
    const updates = [
      { achievementId: 3, increment: 1 } // First Step
    ];

    if (metadata.testCount >= 5) {
      updates.push({ achievementId: 4, increment: 1 }); // Test Warrior
    }

    if (metadata.score === 100) {
      updates.push({ achievementId: 5, increment: 1 }); // Perfect Score
    }

    return updates;
  };

  const handleCollegeViewed = (metadata) => {
    const updates = [];

    if (metadata.viewCount >= 10) {
      updates.push({ achievementId: 7, increment: 1 }); // College Explorer
    }

    if (metadata.viewCount >= 50) {
      updates.push({ achievementId: 8, increment: 1 }); // Deep Researcher
    }

    return updates;
  };

  const handleScholarshipApplied = (metadata) => {
    const updates = [
      { achievementId: 12, increment: 1 } // Scholarship Hunter
    ];

    if (metadata.applicationCount >= 5) {
      updates.push({ achievementId: 13, increment: 1 }); // Financial Aid Expert
    }

    return updates;
  };

  const handleApplicationSubmitted = (metadata) => {
    const updates = [
      { achievementId: 14, increment: 1 } // Application Starter
    ];

    if (metadata.applicationCount >= 3) {
      updates.push({ achievementId: 15, increment: 1 }); // Application Master
    }

    return updates;
  };

  const handleEventAttended = (metadata) => {
    return [{ achievementId: 16, increment: 1 }]; // Event Enthusiast
  };

  const handleMaterialDownloaded = (metadata) => {
    const updates = [];

    if (metadata.downloadCount >= 10) {
      updates.push({ achievementId: 17, increment: 1 }); // Active Learner
    }

    return updates;
  };

  const handleGoalSet = (metadata) => {
    const updates = [
      { achievementId: 10, increment: 1 } // Goal Setter
    ];

    if (metadata.isCompleteRoadmap) {
      updates.push({ achievementId: 11, increment: 1 }); // Vision Planner
    }

    return updates;
  };

  const handleReviewSubmitted = (metadata) => {
    const updates = [];

    if (metadata.reviewCount >= 5) {
      updates.push({ achievementId: 18, increment: 1 }); // Community Contributor
    }

    return updates;
  };

  // Get achievement definitions
  const getAchievementDefinitions = () => {
    return [
      { id: 1, title: 'Profile Pioneer', requirement: 100, category: 'Profile', points: 100, xp: 100, certificate: true },
      { id: 2, title: 'Detail Master', requirement: 1, category: 'Profile', points: 50, xp: 50 },
      { id: 3, title: 'First Step', requirement: 1, category: 'Tests', points: 50, xp: 50 },
      { id: 4, title: 'Test Warrior', requirement: 5, category: 'Tests', points: 150, xp: 150 },
      { id: 5, title: 'Perfect Score', requirement: 1, category: 'Tests', points: 300, xp: 300, certificate: true },
      { id: 7, title: 'College Explorer', requirement: 10, category: 'Exploration', points: 75, xp: 75 },
      { id: 8, title: 'Deep Researcher', requirement: 50, category: 'Exploration', points: 200, xp: 200 },
      { id: 10, title: 'Goal Setter', requirement: 1, category: 'Goals', points: 25, xp: 25 },
      { id: 11, title: 'Vision Planner', requirement: 1, category: 'Goals', points: 150, xp: 150 },
      { id: 12, title: 'Scholarship Hunter', requirement: 1, category: 'Scholarships', points: 100, xp: 100 },
      { id: 13, title: 'Financial Aid Expert', requirement: 5, category: 'Scholarships', points: 250, xp: 250 },
      { id: 14, title: 'Application Starter', requirement: 1, category: 'Applications', points: 125, xp: 125 },
      { id: 15, title: 'Application Master', requirement: 3, category: 'Applications', points: 300, xp: 300 },
      { id: 16, title: 'Event Enthusiast', requirement: 1, category: 'Engagement', points: 75, xp: 75 },
      { id: 17, title: 'Active Learner', requirement: 10, category: 'Engagement', points: 100, xp: 100 },
      { id: 18, title: 'Community Contributor', requirement: 5, category: 'Engagement', points: 150, xp: 150 }
    ];
  };

  return {
    achievements,
    certificates,
    level,
    xp,
    loading,
    notifications,
    trackAction,
    refreshProgress: loadUserProgress
  };
};

export default useAchievementTracker;
