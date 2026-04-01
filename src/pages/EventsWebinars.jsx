import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import useAchievementTracker from '../hooks/useAchievementTracker';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import { supabase } from '../supabaseClient';

const EventsWebinars = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { trackAction } = useAchievementTracker(user);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [registrationStats, setRegistrationStats] = useState({ count: 0 });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [registrationData, setRegistrationData] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    year: '',
    branch: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userRegistrations, setUserRegistrations] = useState([]);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Load user's existing registrations
  useEffect(() => {
    if (user) {
      fetchUserRegistrations();
    }
  }, [user]);

  const fetchUserRegistrations = async () => {
    try {
      const { data, error } = await supabase
        .from('event_registrations')
        .select('event_id')
        .eq('user_id', user.id);
      
      if (!error && data) {
        setUserRegistrations(data.map(r => r.event_id));
      }
    } catch (error) {
      console.error('Error fetching registrations:', error);
    }
  };

  const upcomingEvents = [
    // MHT CET & CAP Events - EXAM TYPE (External Registration)
    {
      id: 1,
      title: 'MHT CET 2026 Centralised Admission Process (CAP)',
      date: '2026-06-15',
      time: '10:00 AM - 6:00 PM',
      type: 'Counselling',
      speaker: 'State CET Cell Officials',
      speakerTitle: 'DTE Maharashtra',
      duration: 'Online All Day',
      seats: 50000,
      registered: 35420,
      description: 'Centralised Admission Process for MHT CET qualified candidates for Engineering, Pharmacy, and Agriculture courses through online portal.',
      tags: ['MHT CET', 'CAP', 'Admission'],
      link: 'https://cetcell.mahacet.org/CAP', // Updated CAP portal link
      platform: 'Online',
      registrationType: 'internal', // internal = store in DB, external = redirect
      videoLink: 'https://youtu.be/7nVv14zoKV8' // MHT CET CAP Form Filling / Choice Filling Guide
    },
    {
      id: 2,
      title: 'MHT CET 2026 Examination',
      date: '2026-03-15',
      time: '9:00 AM - 12:00 PM',
      type: 'Examination',
      speaker: 'State CET Cell',
      speakerTitle: 'Conducting Authority',
      duration: '3 Hours',
      seats: 200000,
      registered: 185000,
      description: 'Maharashtra Health and Technical Common Entrance Test for Engineering, Pharmacy, and Agriculture courses in Computer Based Test mode.',
      tags: ['MHT CET', 'Exam', 'PCM'],
      link: 'https://cetcell.mahacet.org/', // Updated official link
      platform: 'Computer Based Test',
      registrationType: 'external', // External registration
      videoLink: '' // No video for exams
    },
    
    // Diploma Events
    {
      id: 3,
      title: 'Diploma CAP Round I Counselling',
      date: '2026-07-01',
      time: 'All Day',
      type: 'Counselling',
      speaker: 'DTE Officials',
      speakerTitle: 'DTE Maharashtra',
      duration: '15 Days',
      seats: 30000,
      registered: 22100,
      description: 'First round of Centralised Admission Process for Diploma courses across Maharashtra. Online choice filling and seat allocation.',
      tags: ['Diploma', 'CAP', 'Polytechnic'],
      link: 'https://dtemaharashtra.gov.in', // Updated DTE official link
      platform: 'Online Portal',
      registrationType: 'internal',
      videoLink: 'https://youtu.be/lp_dpEbpQ5U' // Diploma CAP Registration Guide
    },
    {
      id: 4,
      title: 'Diploma CET 2026',
      date: '2026-04-05',
      time: 'Multiple Slots',
      type: 'Examination',
      speaker: 'State CET Cell',
      speakerTitle: 'Conducting Authority',
      duration: '90 Minutes',
      seats: 50000,
      registered: 42000,
      description: 'Common Entrance Test for admission to First Year of Post SSC Diploma courses in Engineering, Technology, and other fields.',
      tags: ['Diploma', 'CET', 'Polytechnic'],
      link: 'https://dtemaharashtra.gov.in', // Updated DTE official link
      platform: 'Computer Based Test',
      registrationType: 'external',
      videoLink: '' // No video for exams
    },
    
    // MBA/MMS Events
    {
      id: 5,
      title: 'MAH MBA/MMS CET 2026',
      date: '2026-03-28',
      time: 'Multiple Slots',
      type: 'Examination',
      speaker: 'State CET Cell',
      speakerTitle: 'DTE Maharashtra',
      duration: '150 Minutes',
      seats: 25000,
      registered: 21500,
      description: 'Common Entrance Test for MBA/MMS programs in Maharashtra. Computer based test covering Reasoning, Quantitative Aptitude, and Verbal Ability.',
      tags: ['MBA', 'MMS', 'Management'],
      link: 'https://cetcell.mahacet.org/', // Updated CET Cell link
      platform: 'Computer Based Test',
      registrationType: 'external',
      videoLink: '' // No video for exams
    },
    {
      id: 6,
      title: 'PGDM Admission CAP 2026',
      date: '2026-08-01',
      time: '10:00 AM - 5:00 PM',
      type: 'Counselling',
      speaker: 'DTE Officials',
      speakerTitle: 'AICTE Approved Institutions',
      duration: '20 Days',
      seats: 15000,
      registered: 8900,
      description: 'Centralised admission process for PGDM courses in AICTE approved institutions across Maharashtra state.',
      tags: ['PGDM', 'MBA', 'CAP'],
      link: 'https://www.aicte-india.org', // Updated AICTE official link
      platform: 'Online Portal',
      registrationType: 'internal',
      videoLink: 'https://youtu.be/DY1noyxM7ng' // CET Cell Help Support Guidance
    },
    
    // Architecture Events
    {
      id: 7,
      title: 'B.Arch Admission Counselling 2026',
      date: '2026-07-10',
      time: '10:00 AM - 6:00 PM',
      type: 'Counselling',
      speaker: 'Council of Architecture',
      speakerTitle: 'DTE Maharashtra',
      duration: '15 Days',
      seats: 5000,
      registered: 3200,
      description: 'NATA/JEE Main qualified candidates counselling for B.Arch admissions in government and private architecture colleges.',
      tags: ['Architecture', 'NATA', 'B.Arch'],
      link: 'https://www.coa.gov.in', // Updated COA official link
      platform: 'Online Portal',
      registrationType: 'internal',
      videoLink: 'https://youtu.be/fpwNe8k5fkQ' // Engineering Admission CAP Updates
    },
    
    // Webinar & Workshop Events
    {
      id: 8,
      title: 'Girls Scholarship Awareness Webinar',
      date: '2026-03-10',
      time: '3:00 PM - 4:30 PM',
      type: 'Webinar',
      speaker: 'Dr. Sunetra Pawar',
      speakerTitle: 'Minister, Higher Education',
      duration: '90 Minutes',
      seats: 5000,
      registered: 3800,
      description: 'Awareness session about scholarship schemes available for girl students in technical education. Complete guidance on application process.',
      tags: ['Scholarship', 'Girls', 'Financial Aid'],
      link: 'https://mahadbt.maharashtra.gov.in/',
      platform: 'YouTube Live',
      registrationType: 'internal',
      videoLink: 'https://youtu.be/jSTDko8r8ic' // Full Form Filling Process Detailed
    },
    {
      id: 9,
      title: 'NEP 2020 Implementation Workshop',
      date: '2026-03-20',
      time: '10:00 AM - 4:00 PM',
      type: 'Workshop',
      speaker: 'Dr. Vinod Mohitkar',
      speakerTitle: 'Director, DTE Maharashtra',
      duration: '6 Hours',
      seats: 500,
      registered: 450,
      description: 'Workshop on implementing National Education Policy 2020 in technical institutions. Curriculum changes, assessment reforms, and multidisciplinary approach.',
      tags: ['NEP 2020', 'Policy', 'Curriculum'],
      link: 'https://www.education.gov.in', // Updated Ministry of Education link
      platform: 'Hybrid Mode',
      registrationType: 'internal',
      videoLink: 'https://youtu.be/zke1nkCrKoc' // Extra Useful Guidance Colleges Cutoffs Info
    },
    {
      id: 10,
      title: 'NAAC Accreditation Workshop',
      date: '2026-04-05',
      time: '10:00 AM - 1:00 PM',
      type: 'Workshop',
      speaker: 'NAAC Experts',
      speakerTitle: 'Accreditation Committee',
      duration: '3 Hours',
      seats: 300,
      registered: 275,
      description: 'Workshop on Role of Accreditation in Institutional Building from NAAC perspective. Documentation, SSR preparation, and best practices.',
      tags: ['NAAC', 'Accreditation', 'Quality'],
      link: 'https://www.naac.gov.in', // Updated NAAC official link
      platform: 'Offline + Online',
      registrationType: 'internal',
      videoLink: 'https://www.youtube.com/watch?v=NtjA1yO13k8' // NAAC guide
    },
    {
      id: 11,
      title: 'Industry-Academia Interaction Webinar',
      date: '2026-03-25',
      time: '2:00 PM - 3:30 PM',
      type: 'Webinar',
      speaker: 'Industry Leaders',
      speakerTitle: 'Top IT Companies',
      duration: '90 Minutes',
      seats: 2000,
      registered: 1650,
      description: 'Bridging the gap between industry requirements and academic curriculum. Skill development, internships, and placement opportunities.',
      tags: ['Industry', 'Skills', 'Placement'],
      link: '#',
      platform: 'Zoom',
      registrationType: 'internal',
      videoLink: 'https://www.youtube.com/watch?v=kJGfHpgzXTU' // Industry skills
    },
    
    // Placement & Career Events
    {
      id: 12,
      title: 'Campus Recruitment Drive - TCS',
      date: '2026-04-10',
      time: '9:00 AM - 6:00 PM',
      type: 'Placement',
      speaker: 'TCS HR Team',
      speakerTitle: 'Tata Consultancy Services',
      duration: '3 Days',
      seats: 10000,
      registered: 8500,
      description: 'TCS campus recruitment drive for final year engineering students across Maharashtra. Aptitude test, technical interview, and HR rounds.',
      tags: ['Placement', 'TCS', 'Recruitment'],
      link: 'https://www.tcs.com/careers', // Updated TCS careers link
      platform: 'Multiple Colleges',
      registrationType: 'external',
      videoLink: '' // No video for external recruitment
    },
    {
      id: 13,
      title: 'Virtual Job Fair 2026',
      date: '2026-04-15',
      time: '10:00 AM - 8:00 PM',
      type: 'Career Fair',
      speaker: 'Multiple Recruiters',
      speakerTitle: '50+ Companies',
      duration: '3 Days',
      seats: 15000,
      registered: 12300,
      description: 'Large-scale virtual job fair connecting students with top recruiters across India. IT, Core, Finance, and Consulting companies participating.',
      tags: ['Job Fair', 'Virtual', 'Placement'],
      link: 'https://www.ncs.gov.in', // Updated National Career Service link
      platform: 'Virtual Platform',
      registrationType: 'internal',
      videoLink: 'https://www.youtube.com/watch?v=tYfSMxAK_ro' // Job search tips
    },
    {
      id: 14,
      title: 'Startup Ideas Competition - DipEx 2026',
      date: '2026-05-01',
      time: '10:00 AM - 5:00 PM',
      type: 'Competition',
      speaker: 'Startup Mentors',
      speakerTitle: 'DTE Maharashtra',
      duration: 'Full Day',
      seats: 500,
      registered: 320,
      description: 'Annual diploma exhibition showcasing innovative projects and startup ideas by students. Prize money and incubation support for winners.',
      tags: ['Startup', 'Innovation', 'Competition'],
      link: '#',
      platform: 'Offline - Nagpur',
      registrationType: 'internal',
      videoLink: 'https://www.youtube.com/watch?v=ZXs8bVpqh4o' // Startup guide
    },
    
    // Scholarship Events
    {
      id: 15,
      title: 'Mahadbt Scholarship Application Workshop',
      date: '2026-03-18',
      time: '11:00 AM - 1:00 PM',
      type: 'Workshop',
      speaker: 'Social Welfare Dept',
      speakerTitle: 'Government of Maharashtra',
      duration: '2 Hours',
      seats: 3000,
      registered: 2400,
      description: 'Guidance on filling scholarship applications through MahaDBT portal. Document upload, verification, and submission process explained.',
      tags: ['Scholarship', 'Mahadbt', 'Application'],
      link: 'https://mahadbt.maharashtra.gov.in/',
      platform: 'Online Workshop',
      registrationType: 'internal',
      videoLink: 'https://www.youtube.com/watch?v=hFTqVp0u4HU' // Mahadbt tutorial
    },
    {
      id: 16,
      title: 'Foreign Scholarship Information Session',
      date: '2026-03-22',
      time: '4:00 PM - 5:30 PM',
      type: 'Webinar',
      speaker: 'International Consultants',
      speakerTitle: 'Education Abroad Experts',
      duration: '90 Minutes',
      seats: 1000,
      registered: 780,
      description: 'Information about foreign scholarships for higher education abroad for meritorious students. Fulbright, Chevening, DAAD, and other programs.',
      tags: ['Foreign', 'Scholarship', 'Higher Studies'],
      link: '#',
      platform: 'Google Meet',
      registrationType: 'internal',
      videoLink: 'https://www.youtube.com/watch?v=WZDRhqCMC_s' // Study abroad guide
    },
    {
      id: 17,
      title: 'Fee Concession Scheme Guidance',
      date: '2026-03-28',
      time: '2:00 PM - 3:30 PM',
      type: 'Webinar',
      speaker: 'DTE Officials',
      speakerTitle: 'Scholarship Cell',
      duration: '90 Minutes',
      seats: 4000,
      registered: 3100,
      description: 'Details about fee concession schemes for SC/ST/OBC/EWS category students. 100% fee waiver scheme for eligible candidates.',
      tags: ['Fee Waiver', 'Reservation', 'Financial Aid'],
      link: '#',
      platform: 'YouTube Live',
      registrationType: 'internal',
      videoLink: 'https://www.youtube.com/watch?v=Vl4Kj4NolQo' // Fee concession guide
    },
    
    // Training Programs
    {
      id: 18,
      title: 'UPSC Training Program Orientation',
      date: '2026-08-01',
      time: '10:00 AM - 12:00 PM',
      type: 'Training',
      speaker: 'YASHADA Faculty',
      speakerTitle: 'YASHADA, Pune',
      duration: 'Full Year',
      seats: 100,
      registered: 85,
      description: 'Orientation for CET selected candidates for UPSC Civil Services Training 2026-27. Comprehensive coaching and mentorship program.',
      tags: ['UPSC', 'IAS', 'Training'],
      link: 'https://www.yashada.org', // Updated YASHADA official link
      platform: 'Offline - Pune',
      registrationType: 'internal',
      videoLink: 'https://www.youtube.com/watch?v=yF4C5hFXhpI' // UPSC preparation
    },
    {
      id: 19,
      title: 'Soft Skills Development Workshop',
      date: '2026-04-08',
      time: '10:00 AM - 4:00 PM',
      type: 'Workshop',
      speaker: 'Corporate Trainers',
      speakerTitle: 'Skill Development Centre',
      duration: '6 Hours',
      seats: 200,
      registered: 180,
      description: 'Workshop on developing communication and soft skills for placement readiness. Group discussion, personal interview, and resume writing.',
      tags: ['Soft Skills', 'Communication', 'Placement'],
      link: '#',
      platform: 'Offline + Online',
      registrationType: 'internal',
      videoLink: 'https://www.youtube.com/watch?v=aBcdEfGhIjK' // Soft skills training
    },
    {
      id: 20,
      title: 'Entrepreneurship Development Program',
      date: '2026-04-12',
      time: '9:00 AM - 5:00 PM',
      type: 'Training',
      speaker: 'EDII Experts',
      speakerTitle: 'EDII Ahmedabad',
      duration: '3 Days',
      seats: 150,
      registered: 125,
      description: 'Intensive program on entrepreneurship for aspiring student entrepreneurs. Business plan development, funding, and legal aspects covered.',
      tags: ['Entrepreneurship', 'Startup', 'Business'],
      link: '#',
      platform: 'Offline - Ahmedabad',
      registrationType: 'internal',
      videoLink: 'https://www.youtube.com/watch?v=lMxWzYnZvKs' // Entrepreneurship guide
    },
    
    // Administrative Events
    {
      id: 21,
      title: 'New Institution Approval 2026-27',
      date: '2026-03-01',
      time: 'All Day',
      type: 'Administrative',
      speaker: 'DTE Approval Cell',
      speakerTitle: 'DTE Maharashtra',
      duration: 'Ongoing',
      seats: 1000,
      registered: 650,
      description: 'Process for starting new institutions, new courses, and increasing seat capacity for 2026-27 academic year through online portal.',
      tags: ['Approval', 'Institution', 'AICTE'],
      link: '#',
      platform: 'Online Portal',
      registrationType: 'internal',
      videoLink: 'https://www.youtube.com/watch?v=nOpEfGhIjKl' // AICTE approval guide
    },
    {
      id: 22,
      title: 'Online Admission Verification 2026-27',
      date: '2026-07-15',
      time: 'All Day',
      type: 'Administrative',
      speaker: 'DTE IT Cell',
      speakerTitle: 'DTE Maharashtra',
      duration: 'Ongoing',
      seats: 50000,
      registered: 38000,
      description: 'Online verification process for admissions to diploma courses under DTE. Document upload, fee payment, and admission confirmation.',
      tags: ['Verification', 'Admission', 'Online'],
      link: '#',
      platform: 'Online System',
      registrationType: 'internal',
      videoLink: 'https://www.youtube.com/watch?v=pQrStUvWxYz' // Admission process guide
    },
    
    // Special Events
    {
      id: 23,
      title: 'Viksit Maharashtra Survey Campaign',
      date: '2026-03-01',
      time: 'All Day',
      type: 'Survey',
      speaker: 'Govt of Maharashtra',
      speakerTitle: 'State Government',
      duration: 'Ongoing',
      seats: 1000000,
      registered: 650000,
      description: 'Citizen survey campaign for Viksit Maharashtra initiative. Participate in shaping the future development of Maharashtra state.',
      tags: ['Survey', 'Development', 'Maharashtra'],
      link: '#',
      platform: 'Field Work',
      registrationType: 'internal',
      videoLink: 'https://www.youtube.com/watch?v=AbCdEfGhIjK' // Maharashtra development
    },
    {
      id: 24,
      title: 'Meri Maati Mera Desh Ceremony',
      date: '2026-08-15',
      time: '8:00 AM - 12:00 PM',
      type: 'Ceremony',
      speaker: 'PMO India',
      speakerTitle: 'Government of India',
      duration: '4 Hours',
      seats: 500000,
      registered: 420000,
      description: 'Independence Day special - Panch Pran pledge ceremony honoring martyrs and soil tribute. Azadi Ka Amrit Mahotsav celebration.',
      tags: ['Independence Day', 'Patriotism', 'National'],
      link: '#',
      platform: 'Multiple Locations',
      registrationType: 'internal',
      videoLink: 'https://www.youtube.com/watch?v=LmnOpqrStUv' // Patriotic program
    }
  ];

  const pastEvents = [
    {
      id: 101,
      title: 'Understanding CUET Pattern',
      date: '2025-03-10',
      attendees: 450,
      recording: true,
      videoLink: 'https://youtu.be/cuet-pattern-guide' // CUET Pattern Guide Video
    },
    {
      id: 102,
      title: 'Scholarship Opportunities 2025',
      date: '2025-03-05',
      attendees: 380,
      recording: true,
      videoLink: 'https://youtu.be/scholarship-2025-guide' // Scholarship Guide Video
    },
    {
      id: 103,
      title: 'Mental Health During Exam Prep',
      date: '2025-02-28',
      attendees: 520,
      recording: true,
      videoLink: 'https://youtu.be/mental-health-exam-prep' // Mental Wellness Video
    }
  ];

  const handleRegister = (event) => {
    // Check registration type
    if (event.registrationType === 'external') {
      // External registration - redirect to official website
      if (event.link && event.link !== '#') {
        window.open(event.link, '_blank');
        // Track that user clicked to external link
        trackAction('EVENT_EXTERNAL_REDIRECT', { 
          eventId: event.id,
          eventTitle: event.title,
          eventType: event.type,
          externalLink: event.link
        });
      } else {
        alert('External registration link will be available soon!');
      }
      return;
    }
    
    // Internal registration - for counselling, workshops, webinars
    if (!user) {
      alert('Please login to register for this event');
      navigate('/login');
      return;
    }
    
    // Check if already registered
    if (userRegistrations.includes(event.id)) {
      // If already registered, show the video instead
      if (event.videoLink) {
        const watchVideo = window.confirm('You are already registered!\n\nWould you like to watch the AI guidance video for this event?');
        if (watchVideo) {
          window.open(event.videoLink, '_blank');
        }
      } else {
        alert('You are already registered for this event!');
      }
      return;
    }
    
    // Open registration modal for internal events
    setSelectedEvent(event);
    setRegistrationData({
      name: user?.user_metadata?.full_name || '',
      email: user?.email || '',
      phone: '',
      college: '',
      year: '',
      branch: ''
    });
    setIsModalOpen(true);
  };

  const handleSubmitRegistration = async (e) => {
    e.preventDefault();
    
    if (!selectedEvent || !user) return;
    
    setIsSubmitting(true);
    
    try {
      // Save registration to Supabase
      const { data, error } = await supabase
        .from('event_registrations')
        .insert([{
          event_id: selectedEvent.id,
          user_id: user.id,
          name: registrationData.name,
          email: registrationData.email,
          phone: registrationData.phone,
          college: registrationData.college,
          year: registrationData.year,
          branch: registrationData.branch,
          registered_at: new Date().toISOString()
        }]);
      
      if (error) throw error;
      
      // Track achievement
      await trackAction('EVENT_ATTENDED', { 
        eventId: selectedEvent.id,
        eventTitle: selectedEvent.title,
        eventType: selectedEvent.type
      });
      
      // Update stats
      setRegistrationStats(prev => ({ count: prev.count + 1 }));
      setUserRegistrations(prev => [...prev, selectedEvent.id]);
      
      // Close modal and show success
      setIsModalOpen(false);
      
      // Show success message with video option
      const hasVideo = selectedEvent.videoLink;
      const userWantsVideo = hasVideo && window.confirm(
        `🎉 Registration Successful!\n\n` +
        `Event: ${selectedEvent.title}\n` +
        `Date: ${new Date(selectedEvent.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}\n` +
        `Time: ${selectedEvent.time}\n\n` +
        `A confirmation email has been sent to ${registrationData.email}\n\n` +
        `🎬 Would you like to watch the AI guidance video for this event now?`
      );
      
      if (userWantsVideo && selectedEvent.videoLink) {
        window.open(selectedEvent.videoLink, '_blank');
      }
      
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    setRegistrationData({
      ...registrationData,
      [e.target.name]: e.target.value
    });
  };

  const handleWatchRecording = (event) => {
    if (event.videoLink) {
      setSelectedVideo(event);
      setIsVideoModalOpen(true);
      // Track action
      trackAction('PAST_RECORDING_WATCHED', {
        eventId: event.id,
        eventTitle: event.title,
        videoLink: event.videoLink
      });
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Webinar': return 'bg-blue-100 text-blue-800';
      case 'Workshop': return 'bg-green-100 text-green-800';
      case 'Bootcamp': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-3">📅 Events & Webinars</h1>
              <p className="text-xl text-gray-600">Join live sessions with industry experts</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="bg-white text-center p-6">
                <div className="text-3xl font-bold text-indigo-600">{upcomingEvents.length}</div>
                <div className="text-gray-600 mt-1">Upcoming Events</div>
              </Card>
              <Card className="bg-white text-center p-6">
                <div className="text-3xl font-bold text-teal-600">2,453</div>
                <div className="text-gray-600 mt-1">Total Registrations</div>
              </Card>
              <Card className="bg-white text-center p-6">
                <div className="text-3xl font-bold text-purple-600">{pastEvents.length}</div>
                <div className="text-gray-600 mt-1">Past Events</div>
              </Card>
              <Card className="bg-white text-center p-6">
                <div className="text-3xl font-bold text-orange-600">100%</div>
                <div className="text-gray-600 mt-1">Free Access</div>
              </Card>
            </div>

            {/* Tabs */}
            <div className="mb-6">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                  <button
                    onClick={() => setActiveTab('upcoming')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'upcoming'
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    🎯 Upcoming Events ({upcomingEvents.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('past')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'past'
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    📼 Past Recordings ({pastEvents.length})
                  </button>
                </nav>
              </div>
            </div>

            {/* Upcoming Events */}
            {activeTab === 'upcoming' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {upcomingEvents.map((event) => (
                  <Card key={event.id} className="bg-white hover:shadow-xl transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(event.type)}`}>
                        {event.type}
                      </span>
                      <div className="flex gap-2 items-center">
                        {event.registrationType === 'external' && (
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800" title="External Registration">
                            🔗 External
                          </span>
                        )}
                        <span className="text-sm text-gray-500">{event.duration}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                    <p className="text-gray-600 mb-4">{event.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-700">
                        <span className="w-24 font-medium">⏰ Time:</span>
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-700">
                        <span className="w-24 font-medium">🎤 Speaker:</span>
                        <div>
                          <div className="font-medium">{event.speaker}</div>
                          <div className="text-xs text-gray-500">{event.speakerTitle}</div>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-700">
                        <span className="w-24 font-medium">💺 Seats:</span>
                        <div className="flex-1">
                          <div className="flex justify-between text-xs mb-1">
                            <span>{event.registered} registered</span>
                            <span>{event.seats} total</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-indigo-600 h-2 rounded-full transition-all"
                              style={{ width: `${(event.registered / event.seats) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {event.tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    {/* For Counselling/Workshop/Webinar - Show AI Video Button */}
                    {event.registrationType === 'internal' && event.videoLink && (
                      <button
                        type="button"
                        onClick={() => {
                          console.log('Opening video:', event.videoLink);
                          window.open(event.videoLink, '_blank');
                        }}
                        className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg text-center transition-colors cursor-pointer mb-3"
                      >
                        🎬 Watch AI Guidance Video
                      </button>
                    )}
                    
                    {/* For Examination - Only Register Now (redirects to external site) */}
                    {event.registrationType === 'external' && event.link && event.link !== '#' && (
                      <button
                        type="button"
                        onClick={() => {
                          console.log('Opening website:', event.link);
                          window.open(event.link, '_blank');
                        }}
                        className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg text-center transition-colors cursor-pointer"
                      >
                        🔗 Register on Official Website
                      </button>
                    )}
                    
                    {event.registrationType === 'external' && (!event.link || event.link === '#') && (
                      <Button
                        variant="primary"
                        className="w-full opacity-50 cursor-not-allowed"
                        disabled
                      >
                        🔗 Registration Opens Soon
                      </Button>
                    )}
                  </Card>
                ))}
              </div>
            )}

            {/* Past Events */}
            {activeTab === 'past' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastEvents.map((event) => (
                  <Card key={event.id} className="bg-white hover:shadow-lg transition-shadow">
                    <div className="text-center p-4">
                      <div className="text-4xl mb-3">📼</div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{event.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        Held on {new Date(event.date).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-gray-500 mb-4">{event.attendees} attendees</p>
                      <Button
                        variant="primary"
                        size="sm"
                        className="w-full"
                        onClick={() => handleWatchRecording(event)}
                      >
                        Watch Recording
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* CTA */}
            <Card className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white mt-8 p-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-3">🎓 Want to Host a Session?</h2>
                <p className="text-indigo-100 mb-4">
                  Share your expertise with thousands of students. Become a guest speaker!
                </p>
                <Button variant="secondary" size="sm">Apply as Speaker</Button>
              </div>
            </Card>
          </div>
        </main>
      </div>

      {/* Registration Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Register for Event`}
      >
        <form onSubmit={handleSubmitRegistration} className="space-y-4">
          {selectedEvent && (
            <div className="bg-indigo-50 p-4 rounded-lg mb-4">
              <h3 className="font-semibold text-gray-900 mb-2">{selectedEvent.title}</h3>
              <div className="text-sm text-gray-600">
                <p>📅 {new Date(selectedEvent.date).toLocaleDateString('en-IN', { 
                  day: 'numeric', 
                  month: 'long', 
                  year: 'numeric' 
                })}</p>
                <p>⏰ {selectedEvent.time}</p>
                <p>💻 {selectedEvent.platform}</p>
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={registrationData.name}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={registrationData.email}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              value={registrationData.phone}
              onChange={handleInputChange}
              required
              pattern="[0-9]{10}"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="10-digit mobile number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              College/Institute Name *
            </label>
            <input
              type="text"
              name="college"
              value={registrationData.college}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Your college or institute name"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Academic Year
              </label>
              <select
                name="year"
                value={registrationData.year}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="">Select Year</option>
                <option value="FE">First Year (FE)</option>
                <option value="SE">Second Year (SE)</option>
                <option value="TE">Third Year (TE)</option>
                <option value="BE">Final Year (BE)</option>
                <option value="Diploma">Diploma</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Branch/Stream
              </label>
              <input
                type="text"
                name="branch"
                value={registrationData.branch}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="e.g., Computer Science"
              />
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-4">
            <p className="text-sm text-yellow-800">
              ⚠️ By registering, you agree to receive event updates and joining instructions via email.
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsModalOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="flex-1"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Registering...' : 'Confirm Registration'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Video Player Modal for Past Recordings */}
      <Modal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        title={selectedVideo ? `📼 ${selectedVideo.title}` : 'Past Recording'}
        size="large"
      >
        {selectedVideo && (
          <div className="space-y-4">
            {/* Video Information */}
            <div className="bg-indigo-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">{selectedVideo.title}</h3>
              <div className="text-sm text-gray-600">
                <p>📅 Held on: {new Date(selectedVideo.date).toLocaleDateString('en-IN', { 
                  day: 'numeric', 
                  month: 'long', 
                  year: 'numeric' 
                })}</p>
                <p>👥 {selectedVideo.attendees} attendees watched this session</p>
              </div>
            </div>

            {/* YouTube Video Player - Embedded */}
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src={`https://www.youtube.com/embed/${extractYouTubeID(selectedVideo.videoLink)}`}
                title={selectedVideo.title}
                className="w-full h-96 rounded-lg shadow-lg"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Video Description */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">About This Recording</h4>
              <p className="text-sm text-gray-700">
                This is a recorded session from the past event. You can watch it anytime to learn at your own pace.
                Pause, rewind, and rewatch as needed!
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                variant="secondary"
                onClick={() => setIsVideoModalOpen(false)}
                className="flex-1"
              >
                Close
              </Button>
              <a
                href={selectedVideo.videoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg text-center transition-colors"
              >
                🎬 Watch on YouTube
              </a>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

// Helper function to extract YouTube video ID from URL
const extractYouTubeID = (url) => {
  if (!url) return '';
  
  // Handle youtu.be short URLs
  if (url.includes('youtu.be')) {
    return url.split('youtu.be/')[1]?.split('?')[0] || '';
  }
  
  // Handle youtube.com/watch URLs
  const match = url.match(/(?:v=|\/)([a-zA-Z0-9_-]{11})(?:\?|&|$)/);
  return match ? match[1] : '';
};

export default EventsWebinars;
