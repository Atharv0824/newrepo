import React, { useState, useEffect } from 'react';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import CollegeCard from '../components/sections/CollegeCard';
import CollegeDetailsModal from '../components/sections/CollegeDetailsModal';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useData } from '../context/DataContext';
import { useNotification } from '../context/NotificationContext';

// Indian States and Districts
const indianStates = {
  'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad'],
  'Delhi': ['Central Delhi', 'South Delhi', 'North Delhi', 'East Delhi', 'West Delhi'],
  'Karnataka': ['Bangalore', 'Mysore', 'Mangalore', 'Hubli', 'Belgaum'],
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Trichy', 'Vellore', 'Salem'],
  'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Gandhinagar'],
  'Telangana': ['Hyderabad', 'Warangal', 'Karimnagar', 'Nizamabad'],
  'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Tirupati', 'Nellore'],
  'Kerala': ['Thiruvananthapuram', 'Ernakulam', 'Kozhikode', 'Thrissur', 'Kollam'],
  'West Bengal': ['Kolkata', 'Howrah', 'Darjeeling', 'Durgapur', 'Asansol'],
  'Rajasthan': ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Ajmer', 'Bikaner'],
  'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Varanasi', 'Agra', 'Noida', 'Meerut'],
  'Madhya Pradesh': ['Bhopal', 'Indore', 'Gwalior', 'Jabalpur', 'Ujjain'],
  'Punjab': ['Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Chandigarh'],
  'Haryana': ['Gurugram', 'Faridabad', 'Panipat', 'Ambala', 'Karnal'],
  'Goa': ['North Goa', 'South Goa'],
  'Odisha': ['Bhubaneswar', 'Cuttack', 'Rourkela', 'Puri'],
  'Assam': ['Guwahati', 'Silchar', 'Dibrugarh'],
  'Bihar': ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur'],
  'Jharkhand': ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro'],
  'Uttarakhand': ['Dehradun', 'Haridwar', 'Nainital', 'Roorkee']
};

// All courses list
const courseList = [
  'Computer Science', 'Electronics', 'Mechanical', 'Civil', 'Electrical',
  'Information Technology', 'Artificial Intelligence', 'Data Science',
  'Biotechnology', 'Chemical Engineering', 'MBA', 'Finance', 'Marketing',
  'Arts', 'Science', 'Commerce', 'Law', 'Medicine', 'Architecture'
];

// Mock college data - comprehensive list with states and districts
export const mockColleges = [
    // MAHARASHTRA
    {
      id: 1,
      name: 'IIT Bombay',
      state: 'Maharashtra',
      district: 'Mumbai',
      courses: ['Computer Science', 'Electrical Engineering', 'Mechanical Engineering'],
      fees: '₹2.5 Lakhs/year',
      rating: 4.8,
      admissionRequirements: 'JEE Advanced, 75% in 12th boards',
      image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80',
      established: '1958',
      type: 'Public',
      accreditation: 'NBA, NAAC A++',
      campusArea: '550 acres',
      totalStudents: '10,000+',
      facultyCount: '650+',
      batchesPassed: [
        { year: '2026', totalPassed: 1250, highestPackage: '₹2.1 Cr', avgPackage: '₹22 LPA', placementRate: '98%' },
        { year: '2025', totalPassed: 1180, highestPackage: '₹1.8 Cr', avgPackage: '₹20 LPA', placementRate: '97%' },
        { year: '2024', totalPassed: 1150, highestPackage: '₹1.5 Cr', avgPackage: '₹18 LPA', placementRate: '96%' }
      ],
      meritList: {
        general: { opening: '580', closing: '650' },
        obc: { opening: '520', closing: '580' },
        sc: { opening: '450', closing: '520' },
        st: { opening: '400', closing: '450' }
      },
      brightStars: [
        { name: 'Rahul Dravid', batch: '2020', achievement: 'Google Software Engineer, Mountain View', package: '₹45 LPA' },
        { name: 'Priya Sharma', batch: '2021', achievement: 'Microsoft Program Manager', package: '₹38 LPA' },
        { name: 'Arjun Patel', batch: '2019', achievement: 'Founder, Tech Startup (Acquired)', package: '₹2.5 Cr' }
      ],
      facilities: ['Central Library', 'Hostels', 'Sports Complex', 'Research Labs', 'Incubation Center', 'Hospital']
    },
    {
      id: 2,
      name: 'Veermata Jijabai Technological Institute (VJTI)',
      state: 'Maharashtra',
      district: 'Mumbai',
      courses: ['Computer Engineering', 'Electronics', 'Mechanical', 'Civil'],
      fees: '₹80,000/year',
      rating: 4.5,
      admissionRequirements: 'MHT-CET, 70% in 12th boards',
      image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80',
      established: '1887',
      type: 'Public',
      accreditation: 'NBA, NAAC A+',
      campusArea: '14 acres',
      totalStudents: '3,500+',
      facultyCount: '250+',
      batchesPassed: [
        { year: '2026', totalPassed: 650, highestPackage: '₹45 LPA', avgPackage: '₹8 LPA', placementRate: '92%' },
        { year: '2025', totalPassed: 620, highestPackage: '₹42 LPA', avgPackage: '₹7.5 LPA', placementRate: '90%' }
      ],
      meritList: {
        general: { opening: '2500', closing: '3200' },
        obc: { opening: '2200', closing: '2500' },
        sc: { opening: '1800', closing: '2200' },
        st: { opening: '1500', closing: '1800' }
      },
      brightStars: [
        { name: 'Amit Shah', batch: '2018', achievement: 'Senior Developer at Amazon', package: '₹28 LPA' },
        { name: 'Sneha Patil', batch: '2019', achievement: 'Data Scientist at Flipkart', package: '₹22 LPA' }
      ],
      facilities: ['Central Library', 'Hostels', 'Sports Complex', 'Computer Labs']
    },
    {
      id: 3,
      name: 'K.J. Somaiya College of Engineering',
      state: 'Maharashtra',
      district: 'Mumbai',
      courses: ['Computer Science', 'IT', 'Electronics', 'Mechanical'],
      fees: '₹1.2 Lakhs/year',
      rating: 4.3,
      admissionRequirements: 'MHT-CET, 65% in 12th boards'
    },
    {
      id: 4,
      name: 'MIT Pune',
      state: 'Maharashtra',
      district: 'Pune',
      courses: ['Computer Engineering', 'Electronics', 'Mechanical'],
      fees: '₹1.8 Lakhs/year',
      rating: 4.5,
      admissionRequirements: 'MHT-CET, 65% in 12th boards'
    },
    {
      id: 5,
      name: 'College of Engineering Pune (COEP)',
      state: 'Maharashtra',
      district: 'Pune',
      courses: ['Civil', 'Mechanical', 'Electrical', 'Computer Science'],
      fees: '₹90,000/year',
      rating: 4.6,
      admissionRequirements: 'MHT-CET, 75% in 12th boards'
    },
    {
      id: 6,
      name: 'VNIT Nagpur',
      state: 'Maharashtra',
      district: 'Nagpur',
      courses: ['Computer Science', 'Mining Engineering', 'Civil', 'Mechanical'],
      fees: '₹1.5 Lakhs/year',
      rating: 4.4,
      admissionRequirements: 'JEE Main, 70% in 12th boards'
    },
    // DELHI
    {
      id: 7,
      name: 'Delhi University',
      state: 'Delhi',
      district: 'Central Delhi',
      courses: ['Arts', 'Science', 'Commerce', 'Law'],
      fees: '₹50,000/year',
      rating: 4.3,
      admissionRequirements: 'CUET, 60% in 12th boards'
    },
    {
      id: 8,
      name: 'IIT Delhi',
      state: 'Delhi',
      district: 'South Delhi',
      courses: ['Computer Science', 'Electrical', 'Mechanical', 'Civil'],
      fees: '₹2.2 Lakhs/year',
      rating: 4.8,
      admissionRequirements: 'JEE Advanced, 75% in 12th boards'
    },
    {
      id: 9,
      name: 'Netaji Subhas University of Technology',
      state: 'Delhi',
      district: 'West Delhi',
      courses: ['Computer Science', 'IT', 'Electronics', 'Mechanical'],
      fees: '₹1.8 Lakhs/year',
      rating: 4.5,
      admissionRequirements: 'JEE Main, 70% in 12th boards'
    },
    // KARNATAKA
    {
      id: 10,
      name: 'Indian Institute of Science (IISc)',
      state: 'Karnataka',
      district: 'Bangalore',
      courses: ['Computer Science', 'Electrical', 'Mechanical', 'Aerospace'],
      fees: '₹2 Lakhs/year',
      rating: 4.9,
      admissionRequirements: 'GATE/JEE Advanced, 80% in 12th boards'
    },
    {
      id: 11,
      name: 'RV College of Engineering',
      state: 'Karnataka',
      district: 'Bangalore',
      courses: ['Computer Science', 'IT', 'Electronics', 'Mechanical'],
      fees: '₹1.5 Lakhs/year',
      rating: 4.5,
      admissionRequirements: 'KCET, 70% in 12th boards'
    },
    {
      id: 12,
      name: 'BMS College of Engineering',
      state: 'Karnataka',
      district: 'Bangalore',
      courses: ['Computer Science', 'IT', 'Electronics', 'Telecommunications'],
      fees: '₹1.3 Lakhs/year',
      rating: 4.4,
      admissionRequirements: 'KCET, 65% in 12th boards'
    },
    {
      id: 13,
      name: 'PES University',
      state: 'Karnataka',
      district: 'Bangalore',
      courses: ['Computer Science', 'IT', 'ECE', 'Mechanical'],
      fees: '₹2 Lakhs/year',
      rating: 4.5,
      admissionRequirements: 'KCET/PESSAT, 70% in 12th boards'
    },
    {
      id: 14,
      name: 'NIT Surathkal',
      state: 'Karnataka',
      district: 'Mangalore',
      courses: ['Computer Science', 'Mechanical', 'Civil', 'Chemical'],
      fees: '₹1.4 Lakhs/year',
      rating: 4.4,
      admissionRequirements: 'JEE Main, 70% in 12th boards'
    },
    // TAMIL NADU
    {
      id: 15,
      name: 'IIT Madras',
      state: 'Tamil Nadu',
      district: 'Chennai',
      courses: ['Computer Science', 'Electrical', 'Mechanical', 'Civil'],
      fees: '₹2.3 Lakhs/year',
      rating: 4.8,
      admissionRequirements: 'JEE Advanced, 75% in 12th boards'
    },
    {
      id: 16,
      name: 'Anna University',
      state: 'Tamil Nadu',
      district: 'Chennai',
      courses: ['Engineering', 'Technology', 'Architecture'],
      fees: '₹85,000/year',
      rating: 4.4,
      admissionRequirements: 'TANCET, 70% in 12th boards'
    },
    {
      id: 17,
      name: 'VIT Vellore',
      state: 'Tamil Nadu',
      district: 'Vellore',
      courses: ['Computer Science', 'Biotechnology', 'Electronics'],
      fees: '₹7.5 Lakhs/year',
      rating: 4.2,
      admissionRequirements: 'VITEEE, 60% in 12th boards'
    },
    {
      id: 18,
      name: 'NIT Trichy',
      state: 'Tamil Nadu',
      district: 'Trichy',
      courses: ['Engineering', 'Technology', 'Architecture'],
      fees: '₹1.2 Lakhs/year',
      rating: 4.4,
      admissionRequirements: 'JEE Main, 75% in 12th boards'
    },
    {
      id: 19,
      name: 'PSG Tech',
      state: 'Tamil Nadu',
      district: 'Coimbatore',
      courses: ['Computer Science', 'Mechanical', 'Civil', 'EEE'],
      fees: '₹1 Lakh/year',
      rating: 4.3,
      admissionRequirements: 'TNEA, 70% in 12th boards'
    },
    // GUJARAT
    {
      id: 20,
      name: 'IIM Ahmedabad',
      state: 'Gujarat',
      district: 'Ahmedabad',
      courses: ['MBA', 'Executive MBA'],
      fees: '₹15 Lakhs/total',
      rating: 4.9,
      admissionRequirements: 'CAT, GD-PI'
    },
    {
      id: 21,
      name: 'NIT Surat',
      state: 'Gujarat',
      district: 'Surat',
      courses: ['Computer Science', 'Chemical Engineering', 'Mechanical', 'Civil'],
      fees: '₹1.3 Lakhs/year',
      rating: 4.3,
      admissionRequirements: 'JEE Main, 70% in 12th boards'
    },
    {
      id: 22,
      name: 'DA-IICT Gandhinagar',
      state: 'Gujarat',
      district: 'Gandhinagar',
      courses: ['ICT', 'Computer Science', 'IT'],
      fees: '₹2.5 Lakhs/year',
      rating: 4.5,
      admissionRequirements: 'JEE Main, 70% in 12th boards'
    },
    {
      id: 23,
      name: 'MSU Baroda',
      state: 'Gujarat',
      district: 'Vadodara',
      courses: ['Engineering', 'Arts', 'Science', 'Commerce'],
      fees: '₹40,000/year',
      rating: 4.2,
      admissionRequirements: 'GUJCET, 60% in 12th boards'
    },
    // TELANGANA
    {
      id: 24,
      name: 'IIIT Hyderabad',
      state: 'Telangana',
      district: 'Hyderabad',
      courses: ['Computer Science', 'ECE', 'Data Science'],
      fees: '₹3 Lakhs/year',
      rating: 4.7,
      admissionRequirements: 'JEE Main/UGEEE, 75% in 12th boards'
    },
    {
      id: 25,
      name: 'Osmania University',
      state: 'Telangana',
      district: 'Hyderabad',
      courses: ['Engineering', 'Arts', 'Science', 'Commerce', 'Law'],
      fees: '₹40,000/year',
      rating: 4.1,
      admissionRequirements: 'TS EAMCET, 60% in 12th boards'
    },
    // ANDHRA PRADESH
    {
      id: 26,
      name: 'NIT Andhra Pradesh',
      state: 'Andhra Pradesh',
      district: 'Visakhapatnam',
      courses: ['Computer Science', 'Mechanical', 'Civil', 'Chemical'],
      fees: '₹1.4 Lakhs/year',
      rating: 4.3,
      admissionRequirements: 'JEE Main, 70% in 12th boards'
    },
    {
      id: 27,
      name: 'Andhra University',
      state: 'Andhra Pradesh',
      district: 'Visakhapatnam',
      courses: ['Engineering', 'Arts', 'Science', 'Commerce'],
      fees: '₹50,000/year',
      rating: 4.2,
      admissionRequirements: 'AP EAMCET, 65% in 12th boards'
    },
    // KERALA
    {
      id: 28,
      name: 'NIT Calicut',
      state: 'Kerala',
      district: 'Kozhikode',
      courses: ['Computer Science', 'Mechanical', 'Civil', 'Chemical'],
      fees: '₹1.4 Lakhs/year',
      rating: 4.4,
      admissionRequirements: 'JEE Main, 70% in 12th boards'
    },
    {
      id: 29,
      name: 'College of Engineering Trivandrum',
      state: 'Kerala',
      district: 'Thiruvananthapuram',
      courses: ['Computer Science', 'Electronics', 'Mechanical', 'Civil'],
      fees: '₹50,000/year',
      rating: 4.3,
      admissionRequirements: 'KEAM, 70% in 12th boards'
    },
    // WEST BENGAL
    {
      id: 30,
      name: 'IIT Kharagpur',
      state: 'West Bengal',
      district: 'Kolkata',
      courses: ['Computer Science', 'Electrical', 'Mechanical', 'Civil'],
      fees: '₹2.5 Lakhs/year',
      rating: 4.8,
      admissionRequirements: 'JEE Advanced, 75% in 12th boards'
    },
    {
      id: 31,
      name: 'Jadavpur University',
      state: 'West Bengal',
      district: 'Kolkata',
      courses: ['Engineering', 'Arts', 'Science', 'Pharmacy'],
      fees: '₹30,000/year',
      rating: 4.5,
      admissionRequirements: 'WBJEE, 70% in 12th boards'
    },
    // RAJASTHAN
    {
      id: 32,
      name: 'Malaviya National Institute of Technology',
      state: 'Rajasthan',
      district: 'Jaipur',
      courses: ['Computer Science', 'Electronics', 'Mechanical', 'Civil'],
      fees: '₹1.5 Lakhs/year',
      rating: 4.3,
      admissionRequirements: 'JEE Main, 70% in 12th boards'
    },
    {
      id: 33,
      name: 'BITS Pilani',
      state: 'Rajasthan',
      district: 'Pilani',
      courses: ['Computer Science', 'Electronics', 'Mechanical', 'Chemical'],
      fees: '₹4.5 Lakhs/year',
      rating: 4.7,
      admissionRequirements: 'BITSAT, 75% in 12th boards'
    },
    // UTTAR PRADESH
    {
      id: 34,
      name: 'IIT Kanpur',
      state: 'Uttar Pradesh',
      district: 'Kanpur',
      courses: ['Computer Science', 'Electrical', 'Mechanical', 'Civil'],
      fees: '₹2.4 Lakhs/year',
      rating: 4.8,
      admissionRequirements: 'JEE Advanced, 75% in 12th boards'
    },
    {
      id: 35,
      name: 'IIT BHU Varanasi',
      state: 'Uttar Pradesh',
      district: 'Varanasi',
      courses: ['Computer Science', 'Electrical', 'Mechanical', 'Civil'],
      fees: '₹2.2 Lakhs/year',
      rating: 4.6,
      admissionRequirements: 'JEE Advanced, 75% in 12th boards'
    },
    {
      id: 36,
      name: 'Amity University Noida',
      state: 'Uttar Pradesh',
      district: 'Noida',
      courses: ['Computer Science', 'IT', 'Management', 'Law'],
      fees: '₹2.5 Lakhs/year',
      rating: 4.2,
      admissionRequirements: '12th Boards, AMITY JEE'
    },
    // MADHYA PRADESH
    {
      id: 37,
      name: 'IIT Indore',
      state: 'Madhya Pradesh',
      district: 'Indore',
      courses: ['Computer Science', 'Electrical', 'Mechanical'],
      fees: '₹2.3 Lakhs/year',
      rating: 4.6,
      admissionRequirements: 'JEE Advanced, 75% in 12th boards'
    },
    {
      id: 38,
      name: 'MANIT Bhopal',
      state: 'Madhya Pradesh',
      district: 'Bhopal',
      courses: ['Computer Science', 'Electronics', 'Mechanical', 'Civil'],
      fees: '₹1.5 Lakhs/year',
      rating: 4.3,
      admissionRequirements: 'JEE Main, 70% in 12th boards'
    },
    // PUNJAB
    {
      id: 39,
      name: 'Thapar Institute of Engineering and Technology',
      state: 'Punjab',
      district: 'Patiala',
      courses: ['Computer Science', 'Electronics', 'Mechanical', 'Civil'],
      fees: '₹3.5 Lakhs/year',
      rating: 4.4,
      admissionRequirements: 'JEE Main, 65% in 12th boards'
    },
    {
      id: 40,
      name: 'Lovely Professional University',
      state: 'Punjab',
      district: 'Jalandhar',
      courses: ['Computer Science', 'Management', 'Agriculture', 'Design'],
      fees: '₹1.8 Lakhs/year',
      rating: 4.1,
      admissionRequirements: 'LPUNEST, 60% in 12th boards'
    },
    // HARYANA
    {
      id: 41,
      name: 'NIT Kurukshetra',
      state: 'Haryana',
      district: 'Kurukshetra',
      courses: ['Computer Science', 'Mechanical', 'Electronics', 'Civil'],
      fees: '₹1.6 Lakhs/year',
      rating: 4.4,
      admissionRequirements: 'JEE Main, 70% in 12th boards'
    },
    // GOA
    {
      id: 42,
      name: 'Goa College of Engineering',
      state: 'Goa',
      district: 'North Goa',
      courses: ['Computer Science', 'Electronics', 'Mechanical', 'Civil'],
      fees: '₹60,000/year',
      rating: 4.2,
      admissionRequirements: 'GCET, 65% in 12th boards'
    },
    // ODISHA
    {
      id: 43,
      name: 'NIT Rourkela',
      state: 'Odisha',
      district: 'Rourkela',
      courses: ['Computer Science', 'Mechanical', 'Civil', 'Chemical'],
      fees: '₹1.5 Lakhs/year',
      rating: 4.4,
      admissionRequirements: 'JEE Main, 70% in 12th boards'
    },
    // UTTARAKHAND
    {
      id: 44,
      name: 'IIT Roorkee',
      state: 'Uttarakhand',
      district: 'Dehradun',
      courses: ['Civil Engineering', 'Computer Science', 'Mechanical', 'Electrical'],
      fees: '₹2.4 Lakhs/year',
      rating: 4.7,
      admissionRequirements: 'JEE Advanced, 75% in 12th boards'
    }
  ];

const Recommendations = () => {
  const [colleges, setColleges] = useState([]);
  const [filteredColleges, setFilteredColleges] = useState([]);
  const [filters, setFilters] = useState({
    state: '',
    district: '',
    minRating: 0,
    maxFees: '',
    course: ''
  });
  const [sortBy, setSortBy] = useState('rating');
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Get data and notification functions
  const { saveCollege, removeSavedCollege, addToProfileHistory, savedColleges } = useData();
  const { notifyCollegeSaved, notifyCollegeRemoved } = useNotification();
  
  useEffect(() => {
    setColleges(mockColleges);
    setFilteredColleges(mockColleges);
  }, []);
  
  // Filter colleges based on state, district, and other criteria
  useEffect(() => {
    let result = [...colleges];
    
    // Filter by state
    if (filters.state) {
      result = result.filter(college => college.state === filters.state);
    }
    
    // Filter by district
    if (filters.district) {
      result = result.filter(college => college.district === filters.district);
    }
    
    // Filter by minimum rating
    if (filters.minRating > 0) {
      result = result.filter(college => college.rating >= filters.minRating);
    }
    
    // Filter by max fees
    if (filters.maxFees) {
      const maxFeeValue = parseInt(filters.maxFees.replace(/[^\d]/g, ''));
      result = result.filter(college => {
        const collegeFee = parseInt(college.fees.replace(/[^\d]/g, ''));
        return collegeFee <= maxFeeValue;
      });
    }
    
    // Filter by course
    if (filters.course) {
      result = result.filter(college => 
        college.courses.some(course => 
          course.toLowerCase().includes(filters.course.toLowerCase())
        )
      );
    }
    
    // Apply sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'fees-low':
          return parseInt(a.fees.replace(/[^\d]/g, '')) - parseInt(b.fees.replace(/[^\d]/g, ''));
        case 'fees-high':
          return parseInt(b.fees.replace(/[^\d]/g, '')) - parseInt(a.fees.replace(/[^\d]/g, ''));
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
    
    setFilteredColleges(result);
  }, [filters, sortBy, colleges]);
  
  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };
  
  const clearFilters = () => {
    setFilters({
      state: '',
      district: '',
      minRating: 0,
      maxFees: '',
      course: ''
    });
    setSortBy('rating');
  };
  
  const handleSaveCollege = (collegeId, isSaved) => {
    if (isSaved) {
      // Find the college details
      const college = colleges.find(c => c.id === collegeId);
      if (college) {
        // Save to DataContext (which saves to localStorage)
        const result = saveCollege(college);
        
        if (result.success) {
          // Add to profile history for recent activity
          addToProfileHistory({
            type: 'college_saved',
            description: `Saved ${college.name} to your list`,
            timestamp: new Date().toISOString(),
            collegeId: college.id,
            collegeName: college.name
          });
          
          console.log(`✅ College saved: ${college.name}`);
        } else {
          console.error('Failed to save college:', result.error);
        }
      }
    } else {
      // Remove the college
      const college = colleges.find(c => c.id === collegeId);
      if (college) {
        removeSavedCollege(collegeId);
        
        // Add to profile history
        addToProfileHistory({
          type: 'college_removed',
          description: `Removed ${college.name} from your list`,
          timestamp: new Date().toISOString(),
          collegeId: college.id,
          collegeName: college.name
        });
        
        console.log(`✅ College removed: ${college.name}`);
      }
    }
  };
  
  const handleViewDetails = (college) => {
    setSelectedCollege(college);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedCollege(null), 300);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">College Recommendations</h1>
              <p className="text-gray-600">
                Based on your academic profile and preferences
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Filters sidebar */}
              <div className="lg:col-span-1">
                <Card header={<h3 className="text-lg font-semibold text-gray-900">Filters</h3>}>
                  <div className="space-y-6">
                    {/* State filter */}
                    <div>
                      <label className="form-label">State</label>
                      <select
                        value={filters.state}
                        onChange={(e) => {
                          setFilters({...filters, state: e.target.value, district: ''});
                        }}
                        className="input-field"
                      >
                        <option value="">All States</option>
                        {Object.keys(indianStates).map(state => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </select>
                    </div>
                    
                    {/* District filter */}
                    <div>
                      <label className="form-label">District</label>
                      <select
                        value={filters.district}
                        onChange={(e) => handleFilterChange('district', e.target.value)}
                        disabled={!filters.state}
                        className="input-field"
                      >
                        <option value="">All Districts</option>
                        {filters.state && indianStates[filters.state].map(district => (
                          <option key={district} value={district}>{district}</option>
                        ))}
                      </select>
                    </div>
                    
                    {/* Rating filter */}
                    <div>
                      <label className="form-label">Minimum Rating</label>
                      <select
                        value={filters.minRating}
                        onChange={(e) => handleFilterChange('minRating', parseFloat(e.target.value))}
                        className="input-field"
                      >
                        <option value={0}>Any rating</option>
                        <option value={3}>3+ stars</option>
                        <option value={4}>4+ stars</option>
                        <option value={4.5}>4.5+ stars</option>
                      </select>
                    </div>
                    
                    {/* Fees filter */}
                    <div>
                      <label className="form-label">Maximum Fees</label>
                      <select
                        value={filters.maxFees}
                        onChange={(e) => handleFilterChange('maxFees', e.target.value)}
                        className="input-field"
                      >
                        <option value="">Any amount</option>
                        <option value="₹1 Lakh">₹1 Lakh/year</option>
                        <option value="₹2 Lakhs">₹2 Lakhs/year</option>
                        <option value="₹5 Lakhs">₹5 Lakhs/year</option>
                        <option value="₹10 Lakhs">₹10 Lakhs/year</option>
                      </select>
                    </div>
                    
                    {/* Course filter */}
                    <div>
                      <label className="form-label">Course Interest</label>
                      <input
                        type="text"
                        value={filters.course}
                        onChange={(e) => handleFilterChange('course', e.target.value)}
                        placeholder="e.g., Computer Science"
                        className="input-field"
                      />
                    </div>
                    
                    {/* Sort options */}
                    <div>
                      <label className="form-label">Sort By</label>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="input-field"
                      >
                        <option value="rating">Highest Rating</option>
                        <option value="fees-low">Lowest Fees</option>
                        <option value="fees-high">Highest Fees</option>
                        <option value="name">Name (A-Z)</option>
                      </select>
                    </div>
                    
                    {/* Clear filters button */}
                    <Button
                      variant="outline"
                      onClick={clearFilters}
                      className="w-full"
                    >
                      Clear All Filters
                    </Button>
                  </div>
                </Card>
              </div>
              
              {/* College listings */}
              <div className="lg:col-span-3">
                <div className="mb-6">
                  <p className="text-gray-600">
                    Showing {filteredColleges.length} of {colleges.length} colleges
                  </p>
                </div>
                
                {filteredColleges.length === 0 ? (
                  <Card className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                      <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33M12 3c2.755 0 5.255.945 7.08 2.512A8.001 8.001 0 0112 20c-2.755 0-5.255-.945-7.08-2.512A7.96 7.96 0 013 12c0-2.21.895-4.21 2.512-5.708C7.08 4.945 9.58 4 12 4z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No colleges found</h3>
                    <p className="text-gray-600 mb-4">Try adjusting your filters</p>
                    <Button onClick={clearFilters}>Clear Filters</Button>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredColleges.map(college => (
                      <CollegeCard
                        key={college.id}
                        college={college}
                        onSave={handleSaveCollege}
                        onViewDetails={handleViewDetails}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
      
      {/* College Details Modal */}
      {selectedCollege && (
        <CollegeDetailsModal
          college={selectedCollege}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Recommendations;
