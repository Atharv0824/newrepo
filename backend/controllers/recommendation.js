const supabase = require('../supabaseClient');

// @desc      Get personalized college recommendations
// @route     GET /api/recommendation
// @access    Private
exports.getRecommendations = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token'
      });
    }

    // Get student profile
    const { data: student, error: studentError } = await supabase
      .from('students')
      .select(`
        *,
        user:profiles(name, email)
      `)
      .eq('user_id', user.id)
      .single();

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student profile not found'
      });
    }

    // Build query based on student preferences
    let query = supabase.from('colleges').select('*').eq('is_active', true);

    // Filter by academic stream
    if (student.academic_stream) {
      query = query.ilike('type', `%${student.academic_stream}%`);
    }

    // Filter by preferred region
    if (student.preferred_region && student.preferred_region.toLowerCase() !== 'any') {
      query = query.ilike('location_state', `%${student.preferred_region}%`);
    }

    // Filter by budget preference if available
    if (student.budget_preference) {
      query = query.lte('fees->>totalAnnual', student.budget_preference);
    }

    // Find colleges based on criteria
    const { data: colleges, error: collegesError } = await query;

    if (collegesError) {
      return res.status(400).json({
        success: false,
        message: collegesError.message
      });
    }

    // Further filter based on marks
    let filteredColleges = colleges;
    if (student.marks > 0) {
      filteredColleges = colleges.filter(college => {
        // If college has admission cutoff, check against student marks
        if (college.admission && typeof college.admission.cutoff === 'number') {
          return college.admission.cutoff <= student.marks;
        }
        return true; // If no cutoff specified, include the college
      });
    }

    // Sort by relevance (ranking and match with student marks)
    const sortedColleges = filteredColleges.sort((a, b) => {
      // Prefer higher-ranked colleges
      const rankA = a.ranking?.NIRF || Infinity;
      const rankB = b.ranking?.NIRF || Infinity;

      // Prefer colleges that are closer match to student marks
      const matchA = a.admission?.cutoff !== undefined ? Math.abs(student.marks - a.admission.cutoff) : Infinity;
      const matchB = b.admission?.cutoff !== undefined ? Math.abs(student.marks - b.admission.cutoff) : Infinity;

      // Sort by ranking first, then by marks match
      if (rankA !== rankB) {
        return rankA - rankB;
      }
      return matchA - matchB;
    });

    // Limit to top 10 recommendations
    const recommendations = sortedColleges.slice(0, 10);

    // Update student's recommendation history
    for (const college of recommendations) {
      const recommendationHistory = {
        student_id: student.id,
        college_id: college.id,
        reason: getRecommendationReason(student, college),
        matched_criteria: getMatchedCriteria(student, college),
        overall_match_score: calculateMatchScore(student, college),
        recommendation_reason: 'Auto-generated recommendation based on profile match',
        created_at: new Date()
      };

      // Insert recommendation history
      await supabase
        .from('student_recommendation_history')
        .insert(recommendationHistory);
    }

    res.status(200).json({
      success: true,
      count: recommendations.length,
      data: recommendations,
      studentPreferences: {
        academicStream: student.academic_stream,
        marks: student.marks,
        preferredRegion: student.preferred_region,
        budgetPreference: student.budget_preference
      }
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// @desc      Get recommendations for a specific college
// @route     GET /api/recommendation/college/:collegeId
// @access    Private
exports.getCollegeRecommendations = async (req, res, next) => {
  try {
    const { collegeId } = req.params;

    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token'
      });
    }

    // Get the specific college
    const { data: targetCollege, error: collegeError } = await supabase
      .from('colleges')
      .select('*')
      .eq('id', collegeId)
      .single();

    if (!targetCollege) {
      return res.status(404).json({
        success: false,
        message: 'College not found'
      });
    }

    // Get student profile
    const { data: student, error: studentError } = await supabase
      .from('students')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student profile not found'
      });
    }

    // Find similar colleges based on type, location, and ranking
    const { data: similarColleges, error: similarError } = await supabase
      .from('colleges')
      .select('*')
      .neq('id', collegeId) // Exclude the current college
      .ilike('type', targetCollege.type)
      .ilike('location_state', targetCollege.location_state)
      .eq('is_active', true)
      .order('ranking->>NIRF', { ascending: true })
      .limit(5);

    if (similarError) {
      return res.status(400).json({
        success: false,
        message: similarError.message
      });
    }

    res.status(200).json({
      success: true,
      data: {
        college: targetCollege,
        similarColleges
      }
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// @desc      Save a recommendation
// @route     POST /api/recommendation/save
// @access    Private
exports.saveRecommendation = async (req, res, next) => {
  try {
    const { collegeId, reason } = req.body;

    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token'
      });
    }

    // Check if college exists
    const { data: college, error: collegeError } = await supabase
      .from('colleges')
      .select('id')
      .eq('id', collegeId)
      .single();

    if (!college) {
      return res.status(404).json({
        success: false,
        message: 'College not found'
      });
    }

    // Get student
    const { data: student, error: studentError } = await supabase
      .from('students')
      .select('id')
      .eq('user_id', user.id)
      .single();

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student profile not found'
      });
    }

    // Add to saved colleges if not already saved
    const { data: existingSave, error: existingError } = await supabase
      .from('student_saved_colleges')
      .select('id')
      .eq('student_id', student.id)
      .eq('college_id', collegeId)
      .single();

    if (!existingSave) {
      await supabase
        .from('student_saved_colleges')
        .insert({
          student_id: student.id,
          college_id: collegeId
        });
    }

    // Add to recommendation history
    const recommendationHistory = {
      student_id: student.id,
      college_id: collegeId,
      reason: reason || 'Manually saved recommendation',
      created_at: new Date()
    };

    await supabase
      .from('student_recommendation_history')
      .insert(recommendationHistory);

    res.status(200).json({
      success: true,
      message: 'Recommendation saved successfully'
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// @desc      Get saved recommendations
// @route     GET /api/recommendation/saved
// @access    Private
exports.getSavedRecommendations = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token'
      });
    }

    // Get student
    const { data: student, error: studentError } = await supabase
      .from('students')
      .select('id')
      .eq('user_id', user.id)
      .single();

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student profile not found'
      });
    }

    // Get recommendation history
    const { data: recommendationHistory, error: historyError } = await supabase
      .from('student_recommendation_history')
      .select(`
        *,
        college:colleges(name, acronym, type, location_city, location_state, location_country, fees, placement, ranking)
      `)
      .eq('student_id', student.id)
      .order('created_at', { ascending: false });

    if (historyError) {
      return res.status(400).json({
        success: false,
        message: historyError.message
      });
    }

    res.status(200).json({
      success: true,
      count: recommendationHistory.length,
      data: recommendationHistory
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// Helper function to generate recommendation reasons
function getRecommendationReason(student, college) {
  const reasons = [];

  // Check academic stream match
  if (college.type && student.academic_stream && 
      college.type.toLowerCase().includes(student.academic_stream.toLowerCase())) {
    reasons.push('Matches your academic stream');
  }

  // Check region match
  if (student.preferred_region && 
      college.location_state && 
      college.location_state.toLowerCase().includes(student.preferred_region.toLowerCase())) {
    reasons.push('Located in your preferred region');
  }

  // Check marks match
  if (college.admission?.cutoff !== undefined) {
    const difference = student.marks - college.admission.cutoff;
    if (difference >= 0) {
      if (difference <= 2) {
        reasons.push('Perfect match for your marks');
      } else if (difference <= 5) {
        reasons.push('Good match for your marks');
      } else {
        reasons.push('Safe option for your marks');
      }
    } else {
      reasons.push('Challenging but achievable for your marks');
    }
  }

  // Check ranking
  if (college.ranking?.NIRF && college.ranking.NIRF <= 10) {
    reasons.push('Highly ranked institution');
  } else if (college.ranking?.NIRF && college.ranking.NIRF <= 50) {
    reasons.push('Well ranked institution');
  }

  // Check placement
  if (college.placement?.average_package && college.placement.average_package >= 1000000) {
    reasons.push('Strong placement record');
  }

  if (reasons.length === 0) {
    reasons.push('Recommended based on your profile');
  }

  return reasons.join(', ');
}

// Helper function to calculate match score
function calculateMatchScore(student, college) {
  let score = 0;
  
  // Stream match (up to 25 points)
  if (college.type && student.academic_stream && 
      college.type.toLowerCase().includes(student.academic_stream.toLowerCase())) {
    score += 25;
  }
  
  // Location match (up to 20 points)
  if (student.preferred_region && 
      college.location_state && 
      college.location_state.toLowerCase().includes(student.preferred_region.toLowerCase())) {
    score += 20;
  }
  
  // Marks match (up to 30 points)
  if (college.admission?.cutoff !== undefined) {
    const difference = Math.abs(student.marks - college.admission.cutoff);
    score += Math.max(0, 30 - difference * 2); // Higher score for closer match
  }
  
  // Ranking (up to 15 points)
  if (college.ranking?.NIRF) {
    score += Math.max(0, 15 - college.ranking.NIRF * 0.1);
  }
  
  // Placement (up to 10 points)
  if (college.placement?.average_package) {
    score += Math.min(10, college.placement.average_package / 100000);
  }
  
  return Math.min(100, score); // Cap at 100
}

// Helper function to get matched criteria
function getMatchedCriteria(student, college) {
  const criteria = [];
  
  if (college.type && student.academic_stream && 
      college.type.toLowerCase().includes(student.academic_stream.toLowerCase())) {
    criteria.push({ criteria: 'Academic Stream Match', score: 90 });
  }
  
  if (student.preferred_region && 
      college.location_state && 
      college.location_state.toLowerCase().includes(student.preferred_region.toLowerCase())) {
    criteria.push({ criteria: 'Location Match', score: 85 });
  }
  
  if (college.admission?.cutoff !== undefined) {
    const difference = Math.abs(student.marks - college.admission.cutoff);
    const matchScore = Math.max(0, 100 - difference * 2);
    criteria.push({ criteria: 'Marks Match', score: matchScore });
  }
  
  if (college.ranking?.NIRF) {
    const rankScore = Math.max(0, 100 - college.ranking.NIRF);
    criteria.push({ criteria: 'Ranking Match', score: rankScore });
  }
  
  return criteria;
}