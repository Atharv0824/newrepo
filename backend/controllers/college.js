const supabase = require('../supabaseClient');

// @desc      Get all colleges
// @route     GET /api/college
// @access    Public
exports.getAllColleges = async (req, res, next) => {
  try {
    const { data: colleges, error } = await supabase
      .from('colleges')
      .select('*')
      .eq('is_active', true)
      .order('ranking_nirf', { ascending: true })
      .limit(50);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    res.status(200).json({
      success: true,
      count: colleges.length,
      data: colleges
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// @desc      Get single college
// @route     GET /api/college/:id
// @access    Public
exports.getCollegeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const { data: college, error } = await supabase
      .from('colleges')
      .select('*')
      .eq('id', id)
      .eq('is_active', true)
      .single();

    if (error || !college) {
      return res.status(404).json({
        success: false,
        message: 'College not found'
      });
    }

    res.status(200).json({
      success: true,
      data: college
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// @desc      Create college
// @route     POST /api/college
// @access    Private/Admin
exports.createCollege = async (req, res, next) => {
  try {
    // Check if user is admin (you may need to implement this check differently)
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

    // Get user role from profiles table
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (!profile || profile.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Convert field names to snake_case to match Supabase schema
    const collegeData = {
      name: req.body.name,
      acronym: req.body.acronym,
      type: req.body.type,
      location_city: req.body.location?.city,
      location_state: req.body.location?.state,
      location_country: req.body.location?.country,
      location_coordinates_lat: req.body.location?.coordinates?.lat,
      location_coordinates_lng: req.body.location?.coordinates?.lng,
      established: req.body.established,
      size: req.body.size,
      campus_life_rating: req.body.campusLifeRating,
      courses: req.body.courses,
      fees: req.body.fees,
      placement: req.body.placement,
      ranking: req.body.ranking,
      admission: req.body.admission,
      facilities: req.body.facilities,
      hostel_capacity: req.body.hostelCapacity,
      website: req.body.website,
      contact: req.body.contact,
      images: req.body.images,
      description: req.body.description,
      accreditation: req.body.accreditation,
      affiliated_by: req.body.affiliatedBy,
      is_active: req.body.isActive,
      verified: req.body.verified
    };

    const { data: college, error } = await supabase
      .from('colleges')
      .insert(collegeData)
      .select()
      .single();

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    res.status(201).json({
      success: true,
      data: college
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// @desc      Update college
// @route     PUT /api/college/:id
// @access    Private/Admin
exports.updateCollege = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Check if user is admin
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

    // Get user role from profiles table
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (!profile || profile.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Convert field names to snake_case to match Supabase schema
    const updateData = {};
    if (req.body.name) updateData.name = req.body.name;
    if (req.body.acronym) updateData.acronym = req.body.acronym;
    if (req.body.type) updateData.type = req.body.type;
    if (req.body.location?.city) updateData.location_city = req.body.location.city;
    if (req.body.location?.state) updateData.location_state = req.body.location.state;
    if (req.body.location?.country) updateData.location_country = req.body.location.country;
    if (req.body.location?.coordinates?.lat) updateData.location_coordinates_lat = req.body.location.coordinates.lat;
    if (req.body.location?.coordinates?.lng) updateData.location_coordinates_lng = req.body.location.coordinates.lng;
    if (req.body.established) updateData.established = req.body.established;
    if (req.body.size) updateData.size = req.body.size;
    if (req.body.campusLifeRating !== undefined) updateData.campus_life_rating = req.body.campusLifeRating;
    if (req.body.courses) updateData.courses = req.body.courses;
    if (req.body.fees) updateData.fees = req.body.fees;
    if (req.body.placement) updateData.placement = req.body.placement;
    if (req.body.ranking) updateData.ranking = req.body.ranking;
    if (req.body.admission) updateData.admission = req.body.admission;
    if (req.body.facilities) updateData.facilities = req.body.facilities;
    if (req.body.hostelCapacity) updateData.hostel_capacity = req.body.hostelCapacity;
    if (req.body.website) updateData.website = req.body.website;
    if (req.body.contact) updateData.contact = req.body.contact;
    if (req.body.images) updateData.images = req.body.images;
    if (req.body.description) updateData.description = req.body.description;
    if (req.body.accreditation) updateData.accreditation = req.body.accreditation;
    if (req.body.affiliatedBy) updateData.affiliated_by = req.body.affiliatedBy;
    if (req.body.isActive !== undefined) updateData.is_active = req.body.isActive;
    if (req.body.verified !== undefined) updateData.verified = req.body.verified;

    const { data: college, error } = await supabase
      .from('colleges')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    res.status(200).json({
      success: true,
      data: college
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// @desc      Delete college
// @route     DELETE /api/college/:id
// @access    Private/Admin
exports.deleteCollege = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Check if user is admin
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

    // Get user role from profiles table
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (!profile || profile.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    const { data: college, error } = await supabase
      .from('colleges')
      .delete()
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    res.status(200).json({
      success: true,
      message: 'College deleted'
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// @desc      Search colleges with filters
// @route     GET /api/college
// @access    Public
exports.searchColleges = async (req, res, next) => {
  try {
    // Extract query parameters
    const {
      type,
      location,
      city,
      state,
      minFees,
      maxFees,
      minRanking,
      maxRanking,
      minPlacementRate,
      academicStream,
      marks,
      search
    } = req.query;

    // Build query
    let query = supabase.from('colleges').select('*').eq('is_active', true);

    if (type) {
      query = query.ilike('type', `%${type}%`);
    }

    if (location) {
      query = query.ilike('location_city', `%${location}%`);
    }

    if (city) {
      query = query.ilike('location_city', `%${city}%`);
    }

    if (state) {
      query = query.ilike('location_state', `%${state}%`);
    }

    if (minFees) {
      query = query.gte('fees->>totalAnnual', parseInt(minFees));
    }

    if (maxFees) {
      query = query.lte('fees->>totalAnnual', parseInt(maxFees));
    }

    if (minRanking) {
      query = query.gte('ranking->>NIRF', parseInt(minRanking));
    }

    if (maxRanking) {
      query = query.lte('ranking->>NIRF', parseInt(maxRanking));
    }

    if (minPlacementRate) {
      query = query.gte('placement->>placementRate', parseInt(minPlacementRate));
    }

    if (search) {
      query = query.or(`name.ilike.%${search}%,acronym.ilike.%${search}%`);
    }

    // Execute query
    const { data: colleges, error } = await query;

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    // Filter based on marks if provided
    let filteredColleges = colleges;
    if (marks && academicStream) {
      const numericMarks = parseFloat(marks);
      filteredColleges = colleges.filter(college => {
        // If college has admission cutoff, check against marks
        if (college.admission && college.admission.cutoff !== undefined) {
          return college.admission.cutoff <= numericMarks;
        }
        return true; // If no cutoff specified, include the college
      });
    }

    res.status(200).json({
      success: true,
      count: filteredColleges.length,
      data: filteredColleges
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};