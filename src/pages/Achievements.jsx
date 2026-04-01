import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../supabaseClient';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const Achievements = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('achievements');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [userAchievements, setUserAchievements] = useState([]);
  const [userCertificates, setUserCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);
  const [nextLevelXp, setNextLevelXp] = useState(500);

  // Comprehensive achievements database
  const allAchievements = [
    // Profile Category
    {
      id: 1,
      title: 'Profile Pioneer',
      description: 'Complete your profile to 100%',
      icon: '🏆',
      category: 'Profile',
      points: 100,
      xp: 100,
      requirement: 100,
      unlocked: false,
      unlockedAt: null,
      progress: 0,
      difficulty: 'Easy'
    },
    {
      id: 2,
      title: 'Detail Master',
      description: 'Fill in all optional profile fields',
      icon: '⭐',
      category: 'Profile',
      points: 50,
      xp: 50,
      requirement: 1,
      unlocked: false,
      unlockedAt: null,
      progress: 0,
      difficulty: 'Medium'
    },
    
    // Tests Category
    {
      id: 3,
      title: 'First Step',
      description: 'Complete your first aptitude test',
      icon: '📝',
      category: 'Tests',
      points: 50,
      xp: 50,
      requirement: 1,
      unlocked: false,
      unlockedAt: null,
      progress: 0,
      difficulty: 'Easy'
    },
    {
      id: 4,
      title: 'Test Warrior',
      description: 'Complete 5 mock tests',
      icon: '⚔️',
      category: 'Tests',
      points: 150,
      xp: 150,
      requirement: 5,
      unlocked: false,
      unlockedAt: null,
      progress: 0,
      difficulty: 'Medium'
    },
    {
      id: 5,
      title: 'Perfect Score',
      description: 'Score 100% in any mock test',
      icon: '💯',
      category: 'Tests',
      points: 300,
      xp: 300,
      requirement: 1,
      unlocked: false,
      unlockedAt: null,
      progress: 0,
      difficulty: 'Hard'
    },
    {
      id: 6,
      title: 'Consistent Performer',
      description: 'Score above 90% in 3 consecutive tests',
      icon: '🎯',
      category: 'Tests',
      points: 400,
      xp: 400,
      requirement: 3,
      unlocked: false,
      unlockedAt: null,
      progress: 0,
      difficulty: 'Very Hard'
    },
    
    // Exploration Category
    {
      id: 7,
      title: 'College Explorer',
      description: 'View 10 college profiles',
      icon: '🏫',
      category: 'Exploration',
      points: 75,
      xp: 75,
      requirement: 10,
      unlocked: false,
      unlockedAt: null,
      progress: 0,
      difficulty: 'Easy'
    },
    {
      id: 8,
      title: 'Deep Researcher',
      description: 'View 50 college profiles',
      icon: '🔍',
      category: 'Exploration',
      points: 200,
      xp: 200,
      requirement: 50,
      unlocked: false,
      unlockedAt: null,
      progress: 0,
      difficulty: 'Medium'
    },
    {
      id: 9,
      title: 'Career Pathfinder',
      description: 'Explore 5 different career paths',
      icon: '🗺️',
      category: 'Exploration',
      points: 100,
      xp: 100,
      requirement: 5,
      unlocked: false,
      unlockedAt: null,
      progress: 0,
      difficulty: 'Medium'
    },
    
    // Goals Category
    {
      id: 10,
      title: 'Goal Setter',
      description: 'Set your first career goal',
      icon: '🎯',
      category: 'Goals',
      points: 25,
      xp: 25,
      requirement: 1,
      unlocked: false,
      unlockedAt: null,
      progress: 0,
      difficulty: 'Easy'
    },
    {
      id: 11,
      title: 'Vision Planner',
      description: 'Create a complete career roadmap',
      icon: '📋',
      category: 'Goals',
      points: 150,
      xp: 150,
      requirement: 1,
      unlocked: false,
      unlockedAt: null,
      progress: 0,
      difficulty: 'Medium'
    },
    
    // Scholarships Category
    {
      id: 12,
      title: 'Scholarship Hunter',
      description: 'Apply for your first scholarship',
      icon: '💰',
      category: 'Scholarships',
      points: 100,
      xp: 100,
      requirement: 1,
      unlocked: false,
      unlockedAt: null,
      progress: 0,
      difficulty: 'Easy'
    },
    {
      id: 13,
      title: 'Financial Aid Expert',
      description: 'Apply for 5 scholarships',
      icon: '💎',
      category: 'Scholarships',
      points: 250,
      xp: 250,
      requirement: 5,
      unlocked: false,
      unlockedAt: null,
      progress: 0,
      difficulty: 'Hard'
    },
    
    // Applications Category
    {
      id: 14,
      title: 'Application Starter',
      description: 'Submit your first college application',
      icon: '✉️',
      category: 'Applications',
      points: 125,
      xp: 125,
      requirement: 1,
      unlocked: false,
      unlockedAt: null,
      progress: 0,
      difficulty: 'Easy'
    },
    {
      id: 15,
      title: 'Application Master',
      description: 'Submit 3 college applications',
      icon: '👑',
      category: 'Applications',
      points: 300,
      xp: 300,
      requirement: 3,
      unlocked: false,
      unlockedAt: null,
      progress: 0,
      difficulty: 'Hard'
    },
    
    // Engagement Category
    {
      id: 16,
      title: 'Event Enthusiast',
      description: 'Attend your first webinar',
      icon: '🎪',
      category: 'Engagement',
      points: 75,
      xp: 75,
      requirement: 1,
      unlocked: false,
      unlockedAt: null,
      progress: 0,
      difficulty: 'Easy'
    },
    {
      id: 17,
      title: 'Active Learner',
      description: 'Download 10 study materials',
      icon: '📚',
      category: 'Engagement',
      points: 100,
      xp: 100,
      requirement: 10,
      unlocked: false,
      unlockedAt: null,
      progress: 0,
      difficulty: 'Medium'
    },
    {
      id: 18,
      title: 'Community Contributor',
      description: 'Share feedback or review for 5 colleges',
      icon: '💬',
      category: 'Engagement',
      points: 150,
      xp: 150,
      requirement: 5,
      unlocked: false,
      unlockedAt: null,
      progress: 0,
      difficulty: 'Medium'
    },
    
    // Special Category
    {
      id: 19,
      title: 'Early Adopter',
      description: 'Join Future Forge in the first month',
      icon: '🌟',
      category: 'Special',
      points: 500,
      xp: 500,
      requirement: 1,
      unlocked: false,
      unlockedAt: null,
      progress: 0,
      difficulty: 'Legendary'
    },
    {
      id: 20,
      title: 'Platform Champion',
      description: 'Unlock 50% of all achievements',
      icon: '🏅',
      category: 'Special',
      points: 1000,
      xp: 1000,
      requirement: 10,
      unlocked: false,
      unlockedAt: null,
      progress: 0,
      difficulty: 'Legendary'
    }
  ];

  // Sample certificates data
  const sampleCertificates = [
    {
      id: 1,
      title: 'Aptitude Test Completion',
      issuer: 'Future Forge',
      issueDate: '2024-01-16',
      expiryDate: null,
      score: '85%',
      percentile: 'Top 15%',
      verified: true,
      credentialId: 'FF-AT-2024-001234',
      downloadUrl: '#',
      shareUrl: '#',
      verifyUrl: '#'
    }
  ];

  // Level system configuration
  const levels = [
    { level: 1, title: 'Beginner', minXP: 0, maxXP: 500, badge: '🌱' },
    { level: 2, title: 'Explorer', minXP: 500, maxXP: 1500, badge: '🔍' },
    { level: 3, title: 'Achiever', minXP: 1500, maxXP: 3000, badge: '⭐' },
    { level: 4, title: 'Expert', minXP: 3000, maxXP: 5000, badge: '🎯' },
    { level: 5, title: 'Master', minXP: 5000, maxXP: 8000, badge: '🏆' },
    { level: 6, title: 'Legend', minXP: 8000, maxXP: 12000, badge: '👑' },
    { level: 7, title: 'Champion', minXP: 12000, maxXP: 20000, badge: '💎' },
    { level: 8, title: 'Elite', minXP: 20000, maxXP: 999999, badge: '🌟' }
  ];

  // Load user data
  useEffect(() => {
    if (user) {
      loadUserAchievements();
      loadUserCertificates();
    } else {
      // Demo mode with sample data
      loadDemoData();
    }
  }, [user]);

  const loadUserAchievements = async () => {
    setLoading(true);
    try {
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData?.user?.id;

      if (!userId) return;

      // Fetch user achievements from database
      const { data, error } = await supabase
        .from('user_achievements')
        .select('*')
        .eq('user_id', userId);

      if (!error && data) {
        // Merge with achievement definitions
        const merged = allAchievements.map(achievement => {
          const userAchievement = data.find(ua => ua.achievement_id === achievement.id);
          return {
            ...achievement,
            unlocked: !!userAchievement,
            unlockedAt: userAchievement?.unlocked_at || null,
            progress: userAchievement?.progress || 0
          };
        });
        setUserAchievements(merged);
        calculateLevel(merged);
      }
    } catch (error) {
      console.error('Error loading achievements:', error);
      loadDemoData();
    } finally {
      setLoading(false);
    }
  };

  const loadUserCertificates = async () => {
    try {
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData?.user?.id;

      if (!userId) return;

      const { data, error } = await supabase
        .from('certificates')
        .select('*')
        .eq('user_id', userId)
        .order('issue_date', { ascending: false });

      if (!error && data) {
        setUserCertificates(data);
      }
    } catch (error) {
      console.error('Error loading certificates:', error);
    }
  };

  const loadDemoData = () => {
    // Demo mode: unlock some achievements for demonstration
    const demoAchievements = allAchievements.map((achievement, index) => ({
      ...achievement,
      unlocked: index < 3, // Unlock first 3 achievements for demo
      unlockedAt: index < 3 ? new Date().toISOString() : null,
      progress: index < 3 ? achievement.requirement : Math.floor(achievement.requirement * 0.3)
    }));
    setUserAchievements(demoAchievements);
    calculateLevel(demoAchievements);
    setUserCertificates(sampleCertificates);
    setLoading(false);
  };

  const calculateLevel = (achievements) => {
    const totalXP = achievements
      .filter(a => a.unlocked)
      .reduce((sum, a) => sum + a.xp, 0);
    
    setXp(totalXP);
    
    const currentLevel = levels.find(l => 
      totalXP >= l.minXP && totalXP < l.maxXP
    ) || levels[levels.length - 1];
    
    setLevel(currentLevel.level);
    setNextLevelXp(currentLevel.maxXP);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 border-green-300';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Hard': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'Very Hard': return 'bg-red-100 text-red-800 border-red-300';
      case 'Legendary': return 'bg-purple-100 text-purple-800 border-purple-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const categories = ['All', 'Profile', 'Tests', 'Exploration', 'Goals', 'Scholarships', 'Applications', 'Engagement', 'Special'];

  const filteredAchievements = selectedCategory === 'All'
    ? userAchievements
    : userAchievements.filter(a => a.category === selectedCategory);

  const stats = {
    total: userAchievements.length,
    unlocked: userAchievements.filter(a => a.unlocked).length,
    locked: userAchievements.filter(a => !a.unlocked).length,
    totalPoints: userAchievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.points, 0),
    completionRate: Math.round((userAchievements.filter(a => a.unlocked).length / userAchievements.length) * 100)
  };

  const currentLevelData = levels.find(l => l.level === level);

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">🏆 Achievements & Certificates</h1>
                  <p className="text-xl text-gray-600">Track your accomplishments, earn rewards, and showcase your excellence</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600 mb-1">Current Level</div>
                  <div className="flex items-center space-x-2">
                    <span className="text-4xl">{currentLevelData?.badge}</span>
                    <div>
                      <div className="text-2xl font-bold text-indigo-600">Level {level}</div>
                      <div className="text-sm text-gray-600">{currentLevelData?.title}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* XP Progress Bar */}
            <Card className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white mb-8">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <div className="text-sm opacity-90 mb-1">Experience Points</div>
                    <div className="text-3xl font-bold">{xp.toLocaleString()} / {nextLevelXp.toLocaleString()} XP</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm opacity-90 mb-1">Next Level</div>
                    <div className="text-2xl font-bold">Level {level + 1}</div>
                  </div>
                </div>
                <div className="relative">
                  <div className="w-full bg-white/20 rounded-full h-4 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-yellow-400 to-orange-500 h-4 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${Math.min((xp / nextLevelXp) * 100, 100)}%` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                    </div>
                  </div>
                  <div className="flex justify-between mt-2 text-xs opacity-90">
                    <span>{Math.round((xp / nextLevelXp) * 100)}% to Level {level + 1}</span>
                    <span>{nextLevelXp - xp} XP needed</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
              <Card className="bg-white text-center p-4 hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-2">📊</div>
                <div className="text-2xl font-bold text-indigo-600">{stats.total}</div>
                <div className="text-xs text-gray-600 mt-1">Total Achievements</div>
              </Card>
              
              <Card className="bg-white text-center p-4 hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-2">✅</div>
                <div className="text-2xl font-bold text-green-600">{stats.unlocked}</div>
                <div className="text-xs text-gray-600 mt-1">Unlocked</div>
              </Card>
              
              <Card className="bg-white text-center p-4 hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-2">🔒</div>
                <div className="text-2xl font-bold text-gray-600">{stats.locked}</div>
                <div className="text-xs text-gray-600 mt-1">Locked</div>
              </Card>
              
              <Card className="bg-white text-center p-4 hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-2">⭐</div>
                <div className="text-2xl font-bold text-purple-600">{stats.totalPoints}</div>
                <div className="text-xs text-gray-600 mt-1">Total Points</div>
              </Card>
              
              <Card className="bg-white text-center p-4 hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-2">📈</div>
                <div className="text-2xl font-bold text-orange-600">{stats.completionRate}%</div>
                <div className="text-xs text-gray-600 mt-1">Completion Rate</div>
              </Card>
            </div>

            {/* Tabs */}
            <div className="mb-6">
              <div className="border-b-2 border-gray-200">
                <nav className="-mb-px flex space-x-8 overflow-x-auto">
                  <button
                    onClick={() => setActiveTab('achievements')}
                    className={`py-4 px-4 border-b-2 font-medium text-sm whitespace-nowrap ${
                      activeTab === 'achievements'
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    🏅 Achievements ({stats.unlocked}/{stats.total})
                  </button>
                  <button
                    onClick={() => setActiveTab('certificates')}
                    className={`py-4 px-4 border-b-2 font-medium text-sm whitespace-nowrap ${
                      activeTab === 'certificates'
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    📜 Certificates ({userCertificates.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('leaderboard')}
                    className={`py-4 px-4 border-b-2 font-medium text-sm whitespace-nowrap ${
                      activeTab === 'leaderboard'
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    🏆 Leaderboard
                  </button>
                </nav>
              </div>
            </div>

            {/* Achievements Tab */}
            {activeTab === 'achievements' && (
              <>
                {/* Category Filter */}
                <Card className="bg-white mb-8">
                  <div className="flex flex-wrap gap-2">
                    {categories.map(category => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-full font-medium transition-all ${
                          selectedCategory === category
                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </Card>

                {/* Achievements Grid */}
                {loading ? (
                  <Card className="bg-white p-12 text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading your achievements...</p>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredAchievements.map((achievement) => (
                      <Card
                        key={achievement.id}
                        className={`bg-white p-6 transition-all duration-300 ${
                          achievement.unlocked 
                            ? 'hover:shadow-2xl hover:-translate-y-1 border-2 border-yellow-400 bg-gradient-to-br from-yellow-50 to-amber-50' 
                            : 'opacity-60 grayscale bg-gray-50 border-2 border-gray-200'
                        }`}
                      >
                        {/* Header */}
                        <div className="flex justify-between items-start mb-4">
                          <div className={`text-6xl transform transition-transform ${
                            achievement.unlocked ? 'hover:scale-110 hover:rotate-12' : ''
                          }`}>
                            {achievement.icon}
                          </div>
                          <div className="flex flex-col items-end space-y-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(achievement.difficulty)}`}>
                              {achievement.difficulty}
                            </span>
                            {achievement.unlocked ? (
                              <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full flex items-center">
                                ✓ Unlocked
                              </span>
                            ) : (
                              <span className="px-3 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">
                                🔒 Locked
                              </span>
                            )}
                          </div>
                        </div>
                        
                        {/* Content */}
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{achievement.title}</h3>
                        <p className="text-gray-600 mb-4 text-sm">{achievement.description}</p>
                        
                        {/* Progress Bar */}
                        {!achievement.unlocked && (
                          <div className="mb-4">
                            <div className="flex justify-between text-xs text-gray-600 mb-1">
                              <span>Progress</span>
                              <span>{achievement.progress} / {achievement.requirement}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2 rounded-full transition-all"
                                style={{ width: `${Math.min((achievement.progress / achievement.requirement) * 100, 100)}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                        
                        {/* Footer */}
                        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-500">{achievement.category}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-indigo-600">+{achievement.points} pts</span>
                            <span className="text-xs text-gray-500">|</span>
                            <span className="font-bold text-purple-600">+{achievement.xp} XP</span>
                          </div>
                        </div>
                        
                        {/* Unlocked Date */}
                        {achievement.unlocked && achievement.unlockedAt && (
                          <div className="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-500 text-center">
                            🎉 Unlocked on {new Date(achievement.unlockedAt).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                        )}
                      </Card>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* Certificates Tab */}
            {activeTab === 'certificates' && (
              <div className="space-y-6">
                {userCertificates.length === 0 ? (
                  <Card className="bg-white text-center p-12">
                    <div className="text-6xl mb-4">📜</div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">No Certificates Yet</h3>
                    <p className="text-gray-600 mb-6 max-w-md mx-auto">
                      Complete tests, achievements, and courses to earn verifiable certificates that you can share with others
                    </p>
                    <Button 
                      onClick={() => setActiveTab('achievements')}
                      variant="primary"
                    >
                      Start Earning Certificates
                    </Button>
                  </Card>
                ) : (
                  userCertificates.map((cert) => (
                    <Card key={cert.id} className="bg-white p-8 hover:shadow-xl transition-shadow">
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex items-start space-x-4">
                          <div className="text-5xl">📜</div>
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">{cert.title}</h3>
                            <p className="text-gray-600">Issued by <span className="font-semibold">{cert.issuer}</span></p>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                              <span>📅 Issued: {new Date(cert.issue_date).toLocaleDateString()}</span>
                              {cert.expiry_date && (
                                <span>⏰ Expires: {new Date(cert.expiry_date).toLocaleDateString()}</span>
                              )}
                            </div>
                          </div>
                        </div>
                        {cert.verified && (
                          <span className="px-4 py-2 bg-blue-100 text-blue-800 text-sm font-medium rounded-full flex items-center">
                            ✓ Verified
                          </span>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                        <div>
                          <div className="text-xs text-gray-500 mb-1">Score</div>
                          <div className="text-lg font-bold text-gray-900">{cert.score || 'N/A'}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 mb-1">Percentile</div>
                          <div className="text-lg font-bold text-gray-900">{percentile || 'N/A'}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 mb-1">Credential ID</div>
                          <div className="text-lg font-mono text-gray-900 text-sm">{cert.credential_id || cert.id}</div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-3">
                        <Button variant="primary" size="sm">📥 Download PDF</Button>
                        <Button variant="secondary" size="sm">🔗 Share Certificate</Button>
                        <Button variant="outline" size="sm">✓ Verify Authenticity</Button>
                        <Button variant="ghost" size="sm">📧 Send to Email</Button>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            )}

            {/* Leaderboard Tab */}
            {activeTab === 'leaderboard' && (
              <Card className="bg-white">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">🏆 Global Leaderboard</h2>
                  <p className="text-gray-600">Compete with students across the platform</p>
                </div>

                {/* Sample Leaderboard Data */}
                <div className="space-y-4">
                  {[
                    { rank: 1, name: 'Priya S.', level: 8, xp: 25400, achievements: 18, badge: '💎' },
                    { rank: 2, name: 'Rahul K.', level: 7, xp: 18900, achievements: 16, badge: '🌟' },
                    { rank: 3, name: 'Ananya M.', level: 7, xp: 17200, achievements: 15, badge: '🌟' },
                    { rank: 4, name: 'Arjun P.', level: 6, xp: 14500, achievements: 14, badge: '👑' },
                    { rank: 5, name: 'Sneha R.', level: 6, xp: 13800, achievements: 13, badge: '👑' },
                    { rank: 6, name: 'You', level: level, xp: xp, achievements: stats.unlocked, badge: currentLevelData?.badge, isCurrentUser: true }
                  ].map((player, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-4 rounded-lg ${
                        player.isCurrentUser
                          ? 'bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-300'
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`text-2xl font-bold w-12 text-center ${
                          player.rank === 1 ? 'text-yellow-600' :
                          player.rank === 2 ? 'text-gray-600' :
                          player.rank === 3 ? 'text-orange-600' :
                          'text-gray-500'
                        }`}>
                          #{player.rank}
                        </div>
                        <div className="text-3xl">{player.badge}</div>
                        <div>
                          <div className="font-semibold text-gray-900">{player.name}</div>
                          <div className="text-xs text-gray-500">Level {player.level} • {player.achievements} achievements</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-indigo-600">{player.xp.toLocaleString()} XP</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 text-center">
                  <Button variant="primary">View Full Leaderboard</Button>
                </div>
              </Card>
            )}

            {/* Tips Section */}
            <Card className="bg-gradient-to-r from-yellow-50 to-amber-50 mt-8 border-2 border-yellow-300 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">💡 How to Earn More Achievements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-gray-700"><strong>📝 Take Tests:</strong> Complete aptitude and mock tests to unlock test-related achievements</p>
                  <p className="text-gray-700"><strong>🏫 Explore Colleges:</strong> Browse college profiles and research different options</p>
                  <p className="text-gray-700"><strong>🎯 Set Goals:</strong> Create career goals and build your roadmap</p>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-700"><strong>💰 Find Scholarships:</strong> Search and apply for scholarships</p>
                  <p className="text-gray-700"><strong>📚 Use Resources:</strong> Download study materials and attend events</p>
                  <p className="text-gray-700"><strong>✉️ Apply to Colleges:</strong> Submit college applications through the platform</p>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Achievements;
