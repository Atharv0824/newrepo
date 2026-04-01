import React, { useState, useEffect } from 'react';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Modal from '../components/ui/Modal';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

const ScholarshipFinder = () => {
  const [scholarships, setScholarships] = useState([]);
  const [filteredScholarships, setFilteredScholarships] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    income: '',
    marks: '',
    stream: '',
    region: ''
  });
  const [userProfile, setUserProfile] = useState(null);
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Get notification functions
  const { notifyScholarshipApplied } = useNotification();

  // Mock scholarship data - 2026 Updated
  const mockScholarships = [
    {
      id: 1,
      name: 'National Scholarship Scheme',
      provider: 'Government of India',
      amount: '₹50,000 - ₹1,00,000',
      category: 'sc',
      incomeLimit: '2.5 Lakhs',
      marksRequirement: '60%',
      stream: 'all',
      region: 'all',
      deadline: '2026-03-31',
      description: 'Merit-cum-means scholarship for SC/ST/OBC students pursuing higher education',
      eligibility: ['SC/ST/OBC category', 'Family income below 2.5 lakhs', 'Minimum 60% marks'],
      benefits: ['Tuition fee waiver', 'Monthly stipend', 'Book allowance'],
      applyLink: 'https://scholarships.gov.in/',
      detailedDescription: 'The National Scholarship Scheme is a prestigious merit-cum-means scholarship program aimed at supporting students from economically weaker sections. This scholarship covers tuition fees and provides a maintenance allowance throughout the course duration.',
      renewalPolicy: 'Renewable annually based on academic performance',
      reservationPolicy: 'As per Government of India norms',
      contactEmail: 'support@scholarships.gov.in',
      contactPhone: '011-23389000'
    },
    {
      id: 2,
      name: 'Post Matric Scholarship',
      provider: 'State Government',
      amount: '₹15,000 - ₹40,000',
      category: 'obc',
      incomeLimit: '1.5 Lakhs',
      marksRequirement: '50%',
      stream: 'all',
      region: 'maharashtra',
      deadline: '2026-02-28',
      description: 'Scholarship for OBC students studying in post-matric courses',
      eligibility: ['OBC category', 'Family income below 1.5 lakhs', 'Pursuing graduation'],
      benefits: ['Tuition fees', 'Maintenance allowance', 'Study materials'],
      applyLink: 'https://mahadbtmahait.gov.in/',
      detailedDescription: 'Post Matric Scholarship supports OBC students in their pursuit of higher education after Class 10. The scheme covers various expenses including tuition fees, examination fees, and maintenance allowance.',
      renewalPolicy: 'Subject to promotion to next class',
      reservationPolicy: 'OBC candidates only',
      contactEmail: 'obc.scholarship@maharashtra.gov.in',
      contactPhone: '022-22024796'
    },
    {
      id: 3,
      name: 'Merit Scholarship Program',
      provider: 'Private Trust',
      amount: '₹25,000 - ₹75,000',
      category: 'general',
      incomeLimit: '5 Lakhs',
      marksRequirement: '75%',
      stream: 'science',
      region: 'all',
      deadline: '2026-04-15',
      description: 'Merit-based scholarship for students excelling in Science stream',
      eligibility: ['75% marks in 12th', 'Science stream', 'No income bar'],
      benefits: ['Full tuition fees', 'Research grant', 'Internship opportunity'],
      applyLink: 'https://www.vidyadaan.org/',
      detailedDescription: 'This prestigious merit scholarship recognizes and rewards academic excellence in Science stream. Recipients receive comprehensive financial support along with research opportunities and industry exposure.',
      renewalPolicy: 'Maintain 70% marks in all years',
      reservationPolicy: 'Open to all categories',
      contactEmail: 'info@vidyadaan.org',
      contactPhone: '1800-123-4567'
    },
    {
      id: 4,
      name: 'Girl Child Education Fund',
      provider: 'NGO Organization',
      amount: '₹30,000 - ₹60,000',
      category: 'female',
      incomeLimit: '3 Lakhs',
      marksRequirement: '65%',
      stream: 'all',
      region: 'all',
      deadline: '2026-03-15',
      description: 'Special scholarship program to encourage girl education',
      eligibility: ['Female students', 'Family income below 3 lakhs', '65% marks minimum'],
      benefits: ['Complete fee coverage', 'Monthly allowance', 'Mentorship program'],
      applyLink: 'https://www.betibachaobetipadhao.gov.in/',
      detailedDescription: 'Dedicated to empowering girls through education, this scholarship provides comprehensive support including tuition fees, books, and mentorship. The program aims to reduce gender disparity in higher education.',
      renewalPolicy: 'Annual renewal based on attendance and performance',
      reservationPolicy: 'Female candidates only',
      contactEmail: 'support@bbbpscheme.gov.in',
      contactPhone: '1800-180-1553'
    },
    {
      id: 5,
      name: 'Disabled Students Scholarship',
      provider: 'Government of India',
      amount: '₹40,000 - ₹80,000',
      category: 'pwd',
      incomeLimit: 'Not applicable',
      marksRequirement: '40%',
      stream: 'all',
      region: 'all',
      deadline: '2026-05-31',
      description: 'Scholarship for students with disabilities pursuing higher education',
      eligibility: ['40% disability certificate', 'Any educational stream', 'No income limit'],
      benefits: ['Educational expenses', 'Assistive devices', 'Transport allowance'],
      applyLink: 'https://swaraspthy.gov.in/',
      detailedDescription: 'This inclusive scholarship ensures equal educational opportunities for students with disabilities. It covers not only tuition but also assistive technologies, accessible learning materials, and support services.',
      renewalPolicy: 'Continuation of disability certificate required',
      reservationPolicy: 'PWD candidates with 40%+ disability',
      contactEmail: 'disabilityaffairs@gov.in',
      contactPhone: '011-24367177'
    },
    {
      id: 6,
      name: 'Minority Scholarship Scheme',
      provider: 'Ministry of Minority Affairs',
      amount: '₹20,000 - ₹50,000',
      category: 'minority',
      incomeLimit: '2 Lakhs',
      marksRequirement: '55%',
      stream: 'all',
      region: 'all',
      deadline: '2026-02-28',
      description: 'Scholarship for students from minority communities',
      eligibility: ['Minority community', 'Family income below 2 lakhs', '55% marks minimum'],
      benefits: ['Tuition fees', 'Hostel charges', 'Book grants'],
      applyLink: 'https://momascholarship.gov.in/',
      detailedDescription: 'Pre-Matric and Post-Matric scholarships for students belonging to Muslim, Sikh, Christian, Buddhist, Jain, and Zoroastrian (Parsi) communities to promote educational advancement.',
      renewalPolicy: 'Pass previous year exams',
      reservationPolicy: 'Six notified minority communities',
      contactEmail: 'helpdesk-momascholarship@gov.in',
      contactPhone: '0120-6619800'
    },
    {
      id: 7,
      name: 'Central Sector Scheme of Scholarships',
      provider: 'Ministry of Education',
      amount: '₹10,000 - ₹50,000',
      category: 'general',
      incomeLimit: '8 Lakhs',
      marksRequirement: '80%',
      stream: 'all',
      region: 'all',
      deadline: '2026-06-30',
      description: 'Top 80 percentile students in Class 12 board exams',
      eligibility: ['Top 80 percentile in 12th', 'Family income below 8 lakhs', 'Regular full-time courses'],
      benefits: ['Annual scholarship', 'Contingency allowance', 'Computer/laptop once during course'],
      applyLink: 'https://csss.delhigovt.nic.in/',
      detailedDescription: 'One of the most prestigious central government scholarships recognizing academic excellence at the national level. Supports meritorious students from economically weaker backgrounds.',
      renewalPolicy: 'Promotion to next class required',
      reservationPolicy: '50% reservation for girls',
      contactEmail: 'csss.education@gov.in',
      contactPhone: '011-23388990'
    },
    {
      id: 8,
      name: 'AICTE Pragati Scholarship',
      provider: 'AICTE',
      amount: '₹50,000 per year',
      category: 'female',
      incomeLimit: '8 Lakhs',
      marksRequirement: 'Passed 12th',
      stream: 'engineering',
      region: 'all',
      deadline: '2026-03-20',
      description: 'Scholarship for girls pursuing technical education',
      eligibility: ['Female candidates', 'Admitted in AICTE approved institution', 'Family income below 8 lakhs'],
      benefits: ['Tuition fees', 'Books and equipment allowance', 'Incidental charges'],
      applyLink: 'https://scholarship.aicte-india.org/',
      detailedDescription: 'Exclusively for girls pursuing diploma or degree programs in AICTE-approved technical institutions. Aims to promote women participation in technical education.',
      renewalPolicy: 'Maximum 4 years for degree, 3 years for diploma',
      reservationPolicy: 'Girls only, 200 slots per institute',
      contactEmail: 'pragati@aicte.gov.in',
      contactPhone: '011-23232410'
    },
    {
      id: 9,
      name: 'AICTE Saksham Scholarship',
      provider: 'AICTE',
      amount: '₹50,000 per year',
      category: 'pwd',
      incomeLimit: '8 Lakhs',
      marksRequirement: '45%',
      stream: 'engineering',
      region: 'all',
      deadline: '2026-03-20',
      description: 'Scholarship for differently-abled students in technical education',
      eligibility: ['40%+ disability', 'Admitted in AICTE approved institution', 'Family income below 8 lakhs'],
      benefits: ['Tuition fees', 'Books allowance', 'Equipment charges'],
      applyLink: 'https://scholarship.aicte-india.org/',
      detailedDescription: 'Supports specially-abled students pursuing technical education. Provides comprehensive financial assistance ensuring barrier-free education.',
      renewalPolicy: 'Maximum 4 years subject to progress',
      reservationPolicy: 'Differently-abled candidates only',
      contactEmail: 'saksham@aicte.gov.in',
      contactPhone: '011-23232410'
    },
    {
      id: 10,
      name: 'UGC Scholarship for Single Girl Child',
      provider: 'UGC',
      amount: '₹18,000 per month',
      category: 'female',
      incomeLimit: 'No limit',
      marksRequirement: '55%',
      stream: 'all',
      region: 'all',
      deadline: '2026-07-15',
      description: 'PG scholarship for single girl child',
      eligibility: ['Only girl child in family', 'Enrolled in PG program', 'Minimum 55% in graduation'],
      benefits: ['Monthly fellowship', 'Contingency grant', 'HRA if applicable'],
      applyLink: 'https://ugcnet.nta.nic.in/',
      detailedDescription: 'Encourages families to educate their single girl child by providing financial support during post-graduation. Promotes gender equality in higher education.',
      renewalPolicy: 'For maximum 2 years',
      reservationPolicy: 'Single girl child only',
      contactEmail: 'pg.scholarship@ugc.ac.in',
      contactPhone: '011-24116000'
    },
    {
      id: 11,
      name: 'INSPIRE Scholarship',
      provider: 'DST, Government of India',
      amount: '₹80,000 per year',
      category: 'general',
      incomeLimit: 'No limit',
      marksRequirement: 'Top 1% in 12th',
      stream: 'science',
      region: 'all',
      deadline: '2026-08-31',
      description: 'Scholarship for basic and natural sciences',
      eligibility: ['Top 1% in 12th board', 'Pursuing B.Sc/M.Sc in basic sciences', 'Indian nationality'],
      benefits: ['Annual scholarship', 'Summer research camp', 'Mentorship'],
      applyLink: 'https://online-inspire.gov.in/',
      detailedDescription: 'Prestigious scholarship by Department of Science & Technology to attract talented students to basic sciences. Includes research opportunities and summer programs.',
      renewalPolicy: 'Based on academic performance',
      reservationPolicy: 'Open merit',
      contactEmail: 'inspire-dst@gov.in',
      contactPhone: '011-26562133'
    },
    {
      id: 12,
      name: 'Dr. Ambedkar Post Matric Scholarship',
      provider: 'Ministry of Social Justice',
      amount: '₹55,000 - ₹1,20,000',
      category: 'sc',
      incomeLimit: '2.5 Lakhs',
      marksRequirement: 'Pass marks',
      stream: 'all',
      region: 'all',
      deadline: '2026-03-31',
      description: 'Comprehensive scholarship for SC students',
      eligibility: ['SC category', 'Family income below 2.5 lakhs', 'Pursuing graduation/post-graduation'],
      benefits: ['Tuition fees', 'Maintenance allowance', 'Thesis typing charges', 'Book bank facility'],
      applyLink: 'https://scholarships.gov.in/',
      detailedDescription: 'Named after Dr. B.R. Ambedkar, this scholarship empowers SC students through comprehensive financial assistance covering all educational expenses.',
      renewalPolicy: 'Annual renewal mandatory',
      reservationPolicy: 'SC candidates only',
      contactEmail: 'socialjustice@gov.in',
      contactPhone: '011-23381576'
    },
    {
      id: 13,
      name: 'Rajasthan Scholarship',
      provider: 'Government of Rajasthan',
      amount: '₹25,000 - ₹75,000',
      category: 'obc',
      incomeLimit: '2.5 Lakhs',
      marksRequirement: '50%',
      stream: 'all',
      region: 'rajasthan',
      deadline: '2026-04-30',
      description: 'State scholarship for OBC SBC MBC students',
      eligibility: ['OBC/SBC/MBC category', 'Rajasthan domicile', 'Family income below 2.5 lakhs'],
      benefits: ['Tuition fees', 'Exam fees', 'Development allowance'],
      applyLink: 'https://ssp.rajasthan.gov.in/',
      detailedDescription: 'Rajasthan state government initiative supporting OBC, SBC, and MBC students in their educational pursuits within the state.',
      renewalPolicy: 'Pass previous year',
      reservationPolicy: 'OBC/SBC/MBC Rajasthan domicile',
      contactEmail: 'helpdesk.raj@rajasthan.gov.in',
      contactPhone: '0141-2227220'
    },
    {
      id: 14,
      name: 'Tamil Nadu Scholarship',
      provider: 'Government of Tamil Nadu',
      amount: '₹20,000 - ₹60,000',
      category: 'sc',
      incomeLimit: '2.5 Lakhs',
      marksRequirement: 'Pass marks',
      stream: 'all',
      region: 'tamilnadu',
      deadline: '2026-05-15',
      description: 'TN state scholarship for SC/ST students',
      eligibility: ['SC/ST category', 'Tamil Nadu domicile', 'Family income criteria'],
      benefits: ['Tuition fees', 'Special allowance', 'Book charges'],
      applyLink: 'https://scholarships.tn.gov.in/',
      detailedDescription: 'Tamil Nadu government scholarship scheme for SC/ST students promoting higher education accessibility in the state.',
      renewalPolicy: 'Course continuation certificate',
      reservationPolicy: 'SC/ST Tamil Nadu domicile',
      contactEmail: 'tnscholarship@tn.gov.in',
      contactPhone: '044-25671234'
    },
    {
      id: 15,
      name: 'Karnataka Scholarship',
      provider: 'Government of Karnataka',
      amount: '₹15,000 - ₹50,000',
      category: 'minority',
      incomeLimit: '2 Lakhs',
      marksRequirement: '50%',
      stream: 'all',
      region: 'karnataka',
      deadline: '2026-04-20',
      description: 'Karnataka minority scholarship scheme',
      eligibility: ['Minority community', 'Karnataka domicile', 'Income below 2 lakhs'],
      benefits: ['Tuition fees', 'Maintenance allowance', 'Books and stationery'],
      applyLink: 'https://sspkarnataka.gov.in/',
      detailedDescription: 'Karnataka state scholarship supporting minority community students in accessing quality higher education.',
      renewalPolicy: 'Annual renewal required',
      reservationPolicy: 'Minority Karnataka residents',
      contactEmail: 'karnataka.scholarship@gov.in',
      contactPhone: '080-22345678'
    },
    {
      id: 16,
      name: 'West Bengal Scholarship',
      provider: 'Government of West Bengal',
      amount: '₹18,000 - ₹55,000',
      category: 'general',
      incomeLimit: '1.5 Lakhs',
      marksRequirement: '60%',
      stream: 'all',
      region: 'westbengal',
      deadline: '2026-03-10',
      description: 'WB merit-cum-means scholarship',
      eligibility: ['West Bengal domicile', 'Family income below 1.5 lakhs', '60% marks minimum'],
      benefits: ['Tuition fees', 'Book allowance', 'Maintenance charges'],
      applyLink: 'https://scholarships.wbeducation.gov.in/',
      detailedDescription: 'West Bengal government scholarship combining merit and means criteria to support deserving students.',
      renewalPolicy: 'Maintain academic performance',
      reservationPolicy: 'WB domicile holders',
      contactEmail: 'wbscholarship@wbeducation.gov.in',
      contactPhone: '033-22481234'
    },
    {
      id: 17,
      name: 'Uttar Pradesh Scholarship',
      provider: 'Government of Uttar Pradesh',
      amount: '₹20,000 - ₹65,000',
      category: 'obc',
      incomeLimit: '2.5 Lakhs',
      marksRequirement: 'Pass marks',
      stream: 'all',
      region: 'up',
      deadline: '2026-04-10',
      description: 'UP pre and post matric scholarship',
      eligibility: ['UP domicile', 'SC/ST/OBC/General category', 'Income criteria met'],
      benefits: ['Tuition fees', 'Exam fees', 'Books and uniform'],
      applyLink: 'https://scholarship.up.gov.in/',
      detailedDescription: 'Uttar Pradesh state scholarship program supporting students from various categories in their educational journey.',
      renewalPolicy: 'Annual verification required',
      reservationPolicy: 'UP domicile mandatory',
      contactEmail: 'upscholarship@up.gov.in',
      contactPhone: '0522-2234567'
    },
    {
      id: 18,
      name: 'Delhi Scholarship',
      provider: 'Government of NCT Delhi',
      amount: '₹25,000 - ₹70,000',
      category: 'sc',
      incomeLimit: '2.5 Lakhs',
      marksRequirement: '55%',
      stream: 'all',
      region: 'delhi',
      deadline: '2026-05-20',
      description: 'Delhi government scholarship for SC students',
      eligibility: ['SC category', 'Delhi domicile', 'Family income below 2.5 lakhs'],
      benefits: ['Tuition fees', 'Books allowance', 'Travel allowance'],
      applyLink: 'https://edudel.nic.in/',
      detailedDescription: 'NCT Delhi scholarship scheme empowering SC students through financial assistance for higher education.',
      renewalPolicy: 'Promotion certificate needed',
      reservationPolicy: 'SC Delhi residents',
      contactEmail: 'delhischolarship@nic.in',
      contactPhone: '011-23891234'
    },
    {
      id: 19,
      name: 'LIC HFL Vidyadhan Scholarship',
      provider: 'LIC Housing Finance Ltd',
      amount: '₹60,000 per year',
      category: 'general',
      incomeLimit: '2.5 Lakhs',
      marksRequirement: '60%',
      stream: 'all',
      region: 'all',
      deadline: '2026-06-15',
      description: 'Corporate CSR scholarship for higher education',
      eligibility: ['Class 12 pass with 60%', 'Family income below 2.5 lakhs', 'Pursuing graduation'],
      benefits: ['Annual financial aid', 'Mentorship', 'Career guidance'],
      applyLink: 'https://www.lichousing.com/',
      detailedDescription: 'Corporate social responsibility initiative by LIC Housing Finance supporting meritorious students from economically weaker sections.',
      renewalPolicy: 'Based on annual performance',
      reservationPolicy: 'Pan India, merit-based',
      contactEmail: 'vidyadhan@lichfl.com',
      contactPhone: '1800-22-1314'
    },
    {
      id: 20,
      name: 'ONGC Scholarship',
      provider: 'ONGC Ltd',
      amount: '₹48,000 per year',
      category: 'general',
      incomeLimit: '4.5 Lakhs',
      marksRequirement: '60%',
      stream: 'engineering',
      region: 'all',
      deadline: '2026-07-31',
      description: 'ONGC scholarship for engineering/medical students',
      eligibility: ['First year engineering/MBBS', '60% in 12th', 'Family income below 4.5 lakhs'],
      benefits: ['Monthly stipend', 'Book grant', 'Laptop allowance'],
      applyLink: 'https://www.ongcindia.com/',
      detailedDescription: 'ONGC flagship scholarship program supporting bright students pursuing professional courses in engineering and medicine.',
      renewalPolicy: 'Maximum 4 years, performance-based',
      reservationPolicy: 'All India, competitive selection',
      contactEmail: 'scholarship@ongc.co.in',
      contactPhone: '011-26711000'
    },
    {
      id: 21,
      name: 'Reliance Foundation Scholarship',
      provider: 'Reliance Foundation',
      amount: '₹1,00,000 per year',
      category: 'female',
      incomeLimit: 'No limit',
      marksRequirement: '75%',
      stream: 'engineering',
      region: 'all',
      deadline: '2026-08-15',
      description: 'Empowering girls in STEM fields',
      eligibility: ['Female engineering students', '75% marks', '2nd year onwards'],
      benefits: ['Scholarship amount', 'Leadership development', 'Industry exposure'],
      applyLink: 'https://www.ril.com/reliance-foundation',
      detailedDescription: 'Premier scholarship for women in STEM, combining financial support with leadership development and mentorship opportunities.',
      renewalPolicy: 'Annual renewal for up to 4 years',
      reservationPolicy: 'Women in Engineering only',
      contactEmail: 'rfoundation@ril.com',
      contactPhone: '1800-266-0040'
    },
    {
      id: 22,
      name: 'Tata Scholarship',
      provider: 'Tata Trusts',
      amount: '₹50,000 - ₹1,00,000',
      category: 'general',
      incomeLimit: '3 Lakhs',
      marksRequirement: '70%',
      stream: 'all',
      region: 'all',
      deadline: '2026-06-30',
      description: 'Tata Trusts scholarship for underprivileged students',
      eligibility: ['Financial need', 'Academic merit', 'Full-time undergraduate program'],
      benefits: ['Tuition support', 'Living expenses', 'Laptop provided'],
      applyLink: 'https://www.tatatrusts.org/',
      detailedDescription: 'Tata Trusts commitment to education equity, supporting talented students who face financial constraints in completing their education.',
      renewalPolicy: 'Subject to satisfactory progress',
      reservationPolicy: 'Economically disadvantaged',
      contactEmail: 'scholarships@tatatrusts.org',
      contactPhone: '022-23661000'
    }
  ];

  const categories = [
    { id: '', name: 'All Categories' },
    { id: 'sc', name: 'SC/ST' },
    { id: 'obc', name: 'OBC' },
    { id: 'general', name: 'General' },
    { id: 'female', name: 'Female Students' },
    { id: 'pwd', name: 'PWD/Disabled' },
    { id: 'minority', name: 'Minority Communities' }
  ];

  const streams = [
    { id: '', name: 'All Streams' },
    { id: 'science', name: 'Science' },
    { id: 'commerce', name: 'Commerce' },
    { id: 'arts', name: 'Arts/Humanities' },
    { id: 'engineering', name: 'Engineering' },
    { id: 'medical', name: 'Medical' },
    { id: 'law', name: 'Law' }
  ];

  const regions = [
    { id: '', name: 'All Regions' },
    { id: 'maharashtra', name: 'Maharashtra' },
    { id: 'delhi', name: 'Delhi' },
    { id: 'tamilnadu', name: 'Tamil Nadu' },
    { id: 'karnataka', name: 'Karnataka' },
    { id: 'westbengal', name: 'West Bengal' },
    { id: 'up', name: 'Uttar Pradesh' },
    { id: 'rajasthan', name: 'Rajasthan' }
  ];

  useEffect(() => {
    setScholarships(mockScholarships);
    setFilteredScholarships(mockScholarships);
    
    // Load user profile
    const profile = localStorage.getItem('userProfile');
    if (profile) {
      setUserProfile(JSON.parse(profile));
    }
  }, []);

  useEffect(() => {
    filterScholarships();
  }, [filters, scholarships]);

  const filterScholarships = () => {
    let result = [...scholarships];
    
    if (filters.category) {
      result = result.filter(s => s.category === filters.category);
    }
    
    if (filters.stream) {
      result = result.filter(s => s.stream === filters.stream || s.stream === 'all');
    }
    
    if (filters.region) {
      result = result.filter(s => s.region === filters.region || s.region === 'all');
    }
    
    setFilteredScholarships(result);
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      income: '',
      marks: '',
      stream: '',
      region: ''
    });
  };

  const isEligible = (scholarship) => {
    if (!userProfile) return true;
    
    // Check category
    if (scholarship.category !== 'all' && userProfile.category !== scholarship.category) {
      return false;
    }
    
    // Check marks
    if (userProfile.marksPercentage && scholarship.marksRequirement) {
      const userMarks = parseFloat(userProfile.marksPercentage.replace('%', ''));
      const requiredMarks = parseFloat(scholarship.marksRequirement.replace('%', ''));
      if (userMarks < requiredMarks) return false;
    }
    
    return true;
  };

  const getDaysUntil = (dateString) => {
    const today = new Date();
    const targetDate = new Date(dateString);
    const diffTime = targetDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Closed';
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    return `${diffDays} days left`;
  };

  const handleApplyNow = (scholarship) => {
    window.open(scholarship.applyLink, '_blank');
    // Send notification
    notifyScholarshipApplied(scholarship.name);
  };

  const handleViewDetails = (scholarship) => {
    setSelectedScholarship(scholarship);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-3">Scholarship Finder</h1>
              <p className="text-xl text-gray-600">
                Discover scholarships based on your category, income, marks, and location
              </p>
            </div>

            {/* User Profile Summary */}
            {userProfile && (
              <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Profile Summary</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Stream:</span>
                    <p className="font-medium">{userProfile.academicStream || 'Not specified'}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Marks:</span>
                    <p className="font-medium">{userProfile.marksPercentage || 'Not specified'}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Category:</span>
                    <p className="font-medium">{userProfile.category || 'General'}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Region:</span>
                    <p className="font-medium">{userProfile.preferredRegion || 'All India'}</p>
                  </div>
                </div>
              </Card>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Filters Sidebar */}
              <div className="lg:col-span-1">
                <Card className="bg-white">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter Scholarships</h3>
                  
                  <div className="space-y-5">
                    <div>
                      <label className="form-label">Category</label>
                      <select
                        value={filters.category}
                        onChange={(e) => handleFilterChange('category', e.target.value)}
                        className="input-field"
                      >
                        {categories.map(cat => (
                          <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="form-label">Educational Stream</label>
                      <select
                        value={filters.stream}
                        onChange={(e) => handleFilterChange('stream', e.target.value)}
                        className="input-field"
                      >
                        {streams.map(stream => (
                          <option key={stream.id} value={stream.id}>{stream.name}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="form-label">Region</label>
                      <select
                        value={filters.region}
                        onChange={(e) => handleFilterChange('region', e.target.value)}
                        className="input-field"
                      >
                        {regions.map(region => (
                          <option key={region.id} value={region.id}>{region.name}</option>
                        ))}
                      </select>
                    </div>
                    
                    <Input
                      label="Minimum Marks (%)"
                      type="number"
                      value={filters.marks}
                      onChange={(e) => handleFilterChange('marks', e.target.value)}
                      placeholder="e.g., 60"
                    />
                    
                    <Input
                      label="Family Income (Lakhs)"
                      type="number"
                      value={filters.income}
                      onChange={(e) => handleFilterChange('income', e.target.value)}
                      placeholder="e.g., 2.5"
                    />
                    
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

              {/* Scholarship Listings */}
              <div className="lg:col-span-3">
                <div className="mb-6 flex justify-between items-center">
                  <p className="text-gray-600">
                    Showing {filteredScholarships.length} of {scholarships.length} scholarships
                  </p>
                  <div className="text-sm text-gray-500">
                    {filteredScholarships.filter(isEligible).length} eligible for you
                  </div>
                </div>

                {filteredScholarships.length === 0 ? (
                  <Card className="text-center py-12 bg-white">
                    <div className="text-5xl mb-4">💰</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No Scholarships Found</h3>
                    <p className="text-gray-600 mb-4">Try adjusting your filters or check back later</p>
                    <Button onClick={clearFilters}>Clear Filters</Button>
                  </Card>
                ) : (
                  <div className="space-y-6">
                    {filteredScholarships.map(scholarship => {
                      const eligible = isEligible(scholarship);
                      const daysLeft = getDaysUntil(scholarship.deadline);
                      
                      return (
                        <Card 
                          key={scholarship.id} 
                          className="bg-white"
                        >
                          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex flex-wrap items-center gap-2 mb-3">
                                <h3 className="text-xl font-bold text-gray-900">{scholarship.name}</h3>
                                {eligible ? (
                                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                                    ✅ Eligible
                                  </span>
                                ) : (
                                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                                    ⚠️ Check Eligibility
                                  </span>
                                )}
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  daysLeft === 'Closed' ? 'bg-red-100 text-red-800' :
                  daysLeft === 'Today' ? 'bg-orange-100 text-orange-800' :
                  daysLeft === 'Tomorrow' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {daysLeft}
                </span>
              </div>
              
              <p className="text-gray-600 mb-4">{scholarship.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
                <div>
                  <span className="text-gray-600">Amount:</span>
                  <p className="font-semibold text-indigo-600">{scholarship.amount}</p>
                </div>
                <div>
                  <span className="text-gray-600">Provider:</span>
                  <p className="font-medium">{scholarship.provider}</p>
                </div>
                <div>
                  <span className="text-gray-600">Deadline:</span>
                  <p className="font-medium">{new Date(scholarship.deadline).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Eligibility Criteria:</h4>
                  <ul className="space-y-1">
                    {scholarship.eligibility.map((criteria, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span className="text-gray-700">{criteria}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Benefits:</h4>
                  <ul className="space-y-1">
                    {scholarship.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-indigo-500 mr-2">•</span>
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                variant="primary"
                onClick={() => handleApplyNow(scholarship)}
                disabled={daysLeft === 'Closed'}
                className="flex-1"
              >
                {daysLeft === 'Closed' ? 'Deadline Passed' : '🚀 Apply Now'}
              </Button>
              <Button
                variant="outline"
                onClick={() => handleViewDetails(scholarship)}
                className="flex-1"
              >
                📖 View Details
              </Button>
            </div>
          </div>
        </Card>
      );
    })}
                  </div>
                )}

                {/* Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                  <Card className="text-center bg-white">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {filteredScholarships.filter(isEligible).length}
                    </div>
                    <div className="text-gray-600">Eligible Scholarships</div>
                  </Card>
                  <Card className="text-center bg-white">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      ₹{filteredScholarships.reduce((sum, s) => {
                        try {
                          // Handle different amount formats
                          const amountStr = s.amount.toString();
                          let maxAmount = 0;
                          
                          if (amountStr.includes('-')) {
                            // Range format: "₹50,000 - ₹1,00,000"
                            maxAmount = parseFloat(amountStr.split('-')[1].replace(/[^0-9]/g, ''));
                          } else {
                            // Single value: "₹50,000 per year" or "₹18,000 per month"
                            maxAmount = parseFloat(amountStr.replace(/[^0-9]/g, ''));
                          }
                          return sum + (maxAmount || 0);
                        } catch (error) {
                          console.error('Error parsing amount:', s.amount, error);
                          return sum;
                        }
                      }, 0) * 1000}K+
                    </div>
                    <div className="text-gray-600">Potential Funding</div>
                  </Card>
                  <Card className="text-center bg-white">
                    <div className="text-3xl font-bold text-purple-600 mb-2">
                      {filteredScholarships.filter(s => getDaysUntil(s.deadline) !== 'Closed').length}
                    </div>
                    <div className="text-gray-600">Active Applications</div>
                  </Card>
                </div>
              </div>
            </div>

            {/* Scholarship Details Modal */}
            {selectedScholarship && (
              <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={selectedScholarship.name}
                size="lg"
              >
                <div className="space-y-6">
                  {/* Header Section */}
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {selectedScholarship.name}
                    </h3>
                    <p className="text-gray-600">Provided by {selectedScholarship.provider}</p>
                  </div>

                  {/* Key Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 rounded-xl">
                      <h4 className="font-semibold text-blue-900 mb-2">💰 Scholarship Amount</h4>
                      <p className="text-2xl font-bold text-blue-600">{selectedScholarship.amount}</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-xl">
                      <h4 className="font-semibold text-green-900 mb-2">📅 Deadline</h4>
                      <p className="text-lg font-bold text-green-600">
                        {new Date(selectedScholarship.deadline).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-green-700 mt-1">{getDaysUntil(selectedScholarship.deadline)}</p>
                    </div>
                  </div>

                  {/* Detailed Description */}
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-3">📖 About This Scholarship</h4>
                    <p className="text-gray-700 leading-relaxed">
                      {selectedScholarship.detailedDescription}
                    </p>
                  </div>

                  {/* Eligibility Criteria */}
                  <div className="p-4 bg-yellow-50 rounded-xl">
                    <h4 className="font-semibold text-yellow-900 mb-3">✅ Eligibility Criteria</h4>
                    <ul className="space-y-2">
                      {selectedScholarship.eligibility.map((criteria, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-green-500 mr-2 font-bold">✓</span>
                          <span className="text-gray-700">{criteria}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Benefits */}
                  <div className="p-4 bg-purple-50 rounded-xl">
                    <h4 className="font-semibold text-purple-900 mb-3">🎁 Benefits & Coverage</h4>
                    <ul className="space-y-2">
                      {selectedScholarship.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-purple-500 mr-2 font-bold">•</span>
                          <span className="text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Additional Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-pink-50 rounded-xl">
                      <h4 className="font-semibold text-pink-900 mb-2">🔄 Renewal Policy</h4>
                      <p className="text-gray-700">{selectedScholarship.renewalPolicy}</p>
                    </div>
                    <div className="p-4 bg-indigo-50 rounded-xl">
                      <h4 className="font-semibold text-indigo-900 mb-2">📋 Reservation Policy</h4>
                      <p className="text-gray-700">{selectedScholarship.reservationPolicy}</p>
                    </div>
                  </div>

                  {/* Income & Marks Requirements */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-orange-50 rounded-xl">
                      <h4 className="font-semibold text-orange-900 mb-2">💼 Income Limit</h4>
                      <p className="text-gray-700">{selectedScholarship.incomeLimit}</p>
                    </div>
                    <div className="p-4 bg-teal-50 rounded-xl">
                      <h4 className="font-semibold text-teal-900 mb-2">📊 Minimum Marks</h4>
                      <p className="text-gray-700">{selectedScholarship.marksRequirement}</p>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-3">📞 Contact Information</h4>
                    <div className="space-y-2">
                      <p className="text-gray-700">
                        <strong>Email:</strong> {selectedScholarship.contactEmail}
                      </p>
                      <p className="text-gray-700">
                        <strong>Phone:</strong> {selectedScholarship.contactPhone}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                    <Button
                      variant="primary"
                      onClick={() => handleApplyNow(selectedScholarship)}
                      className="flex-1"
                      disabled={getDaysUntil(selectedScholarship.deadline) === 'Closed'}
                    >
                      🚀 Apply Now (Opens Official Website)
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1"
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </Modal>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ScholarshipFinder;