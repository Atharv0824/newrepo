const supabase = require('../supabaseClient');
const { students, colleges } = require('../data/stores');

// @desc      Get student profile
// @route     GET /api/student
// @access    Private
exports.getStudentProfile = async (req, res, next) => {
  try {
    const student = students.get(req.user.id);
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student profile not found'
      });
    }

    // Get saved colleges details
    const savedColleges = student.savedColleges.map(collegeId => {
      return colleges.get(collegeId) || { id: collegeId, name: 'Unknown College' };
    });

    // Get applied colleges details
    const appliedColleges = student.appliedColleges.map(app => {
      const college = colleges.get(app.college) || { id: app.college, name: 'Unknown College' };
      return {
        ...college,
        status: app.status,
        applicationDate: app.applicationDate
      };
    });

    const formattedStudent = {
      ...student,
      savedColleges,
      appliedColleges
    };

    res.status(200).json({
      success: true,
      data: formattedStudent
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// @desc      Create student profile
// @route     POST /api/student
// @access    Private
exports.createStudentProfile = async (req, res, next) => {
  try {
    const { academicStream, preferredRegion, budgetPreference, careerGoals } = req.body;

    // Check if student already exists
    if (students.has(req.user.id)) {
      return res.status(400).json({
        success: false,
        message: 'Student profile already exists'
      });
    }

    const newStudent = {
      id: req.user.id,
      user: req.user.id,
      academicStream,
      preferredRegion,
      budgetPreference,
      careerGoals,
      profilePicture: req.body.profilePicture || '',
      savedColleges: [],
      appliedColleges: [],
      recommendationHistory: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    students.set(req.user.id, newStudent);

    res.status(201).json({
      success: true,
      data: newStudent
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// @desc      Update student profile
// @route     PUT /api/student
// @access    Private
exports.updateStudentProfile = async (req, res, next) => {
  try {
    const student = students.get(req.user.id);
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student profile not found'
      });
    }

    // Update fields
    const fieldsToUpdate = ['academicStream', 'preferredRegion', 'budgetPreference', 'careerGoals', 'profilePicture'];
    fieldsToUpdate.forEach(field => {
      if (req.body[field] !== undefined) {
        student[field] = req.body[field];
      }
    });

    student.updatedAt = new Date();

    res.status(200).json({
      success: true,
      data: student
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// @desc      Get saved colleges
// @route     GET /api/student/saved
// @access    Private
exports.getSavedColleges = async (req, res, next) => {
  try {
    const student = students.get(req.user.id);
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student profile not found'
      });
    }

    const savedColleges = student.savedColleges.map(collegeId => {
      return colleges.get(collegeId) || { id: collegeId, name: 'Unknown College' };
    });

    res.status(200).json({
      success: true,
      data: savedColleges
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// @desc      Save college to profile
// @route     POST /api/student/saved
// @access    Private
exports.saveCollege = async (req, res, next) => {
  try {
    const { collegeId } = req.body;
    const student = students.get(req.user.id);
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student profile not found'
      });
    }

    // Check if college exists
    if (!colleges.has(collegeId)) {
      return res.status(404).json({
        success: false,
        message: 'College not found'
      });
    }

    // Check if already saved
    if (student.savedColleges.includes(collegeId)) {
      return res.status(400).json({
        success: false,
        message: 'College already saved'
      });
    }

    student.savedColleges.push(collegeId);
    student.updatedAt = new Date();

    res.status(200).json({
      success: true,
      message: 'College saved successfully'
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// @desc      Remove saved college
// @route     DELETE /api/student/saved/:collegeId
// @access    Private
exports.removeSavedCollege = async (req, res, next) => {
  try {
    const { collegeId } = req.params;
    const student = students.get(req.user.id);
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student profile not found'
      });
    }

    const index = student.savedColleges.indexOf(collegeId);
    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: 'College not found in saved list'
      });
    }

    student.savedColleges.splice(index, 1);
    student.updatedAt = new Date();

    res.status(200).json({
      success: true,
      message: 'College removed successfully'
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// @desc      Get applied colleges
// @route     GET /api/student/applied
// @access    Private
exports.getAppliedColleges = async (req, res, next) => {
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

    // Get student ID first
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

    // Get applied colleges
    const { data: appliedColleges, error: collegesError } = await supabase
      .from('student_applied_colleges')
      .select('colleges(*)')
      .eq('student_id', student.id);

    if (collegesError) {
      return res.status(400).json({
        success: false,
        message: collegesError.message
      });
    }

    res.status(200).json({
      success: true,
      data: appliedColleges.map(ac => ac.colleges)
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// @desc      Apply to a college
// @route     POST /api/student/applied
// @access    Private
exports.applyToCollege = async (req, res, next) => {
  try {
    const { collegeId } = req.body;
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

    // Get student ID
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

    // Check if already applied
    const { data: existingApply, error: checkError } = await supabase
      .from('student_applied_colleges')
      .select('id')
      .eq('student_id', student.id)
      .eq('college_id', collegeId)
      .single();

    if (existingApply) {
      return res.status(400).json({
        success: false,
        message: 'Already applied to this college'
      });
    }

    // Apply to the college
    const { data: appliedCollege, error: applyError } = await supabase
      .from('student_applied_colleges')
      .insert({
        student_id: student.id,
        college_id: collegeId
      });

    if (applyError) {
      return res.status(400).json({
        success: false,
        message: applyError.message
      });
    }

    res.status(200).json({
      success: true,
      message: 'Successfully applied to college'
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// @desc      Get recommendation history
// @route     GET /api/student/recommendations
// @access    Private
exports.getRecommendationHistory = async (req, res, next) => {
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

    // Get student ID first
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
    const { data: recommendations, error: recError } = await supabase
      .from('student_recommendation_history')
      .select(`
        *,
        college:colleges(name, acronym, type, location_city, location_state, location_country, fees, placement, ranking)
      `)
      .eq('student_id', student.id)
      .order('created_at', { ascending: false });

    if (recError) {
      return res.status(400).json({
        success: false,
        message: recError.message
      });
    }

    res.status(200).json({
      success: true,
      data: recommendations
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};