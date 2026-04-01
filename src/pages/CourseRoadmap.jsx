import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const CourseRoadmap = () => {
  const navigate = useNavigate();
  const [selectedCareer, setSelectedCareer] = useState('');
  const [roadmap, setRoadmap] = useState(null);

  const careerOptions = [
    // ENGINEERING & TECHNOLOGY
    'Computer Science Engineering',
    'Mechanical Engineering',
    'Electrical Engineering',
    'Civil Engineering',
    'Electronics & Communication',
    'Chemical Engineering',
    'Biotechnology',
    'Biomedical Engineering',
    'Aerospace Engineering',
    'Automobile Engineering',
    
    // SCIENCE & RESEARCH
    'Data Scientist',
    'Artificial Intelligence Engineer',
    'Machine Learning Engineer',
    'Environmental Scientist',
    'Physics Researcher',
    'Chemistry Researcher',
    'Mathematics Professor',
    'Clinical Psychologist',
    
    // MEDICAL & HEALTHCARE
    'MBBS Doctor',
    'Dentist (BDS)',
    'Pharmacist',
    'Nurse',
    'Physiotherapist',
    'Nutritionist/Dietitian',
    
    // MANAGEMENT & COMMERCE
    'Software Engineer',
    'Financial Analyst',
    'Chartered Accountant',
    'MBA Professional',
    'Digital Marketer',
    'Business Analyst',
    'Investment Banker',
    
    // DESIGN & CREATIVE
    'UX/UI Designer',
    'Graphic Designer',
    'Fashion Designer',
    'Interior Designer',
    'Animator',
    'Video Editor',
    
    // LAW & CIVIL SERVICES
    'Lawyer',
    'Judge',
    'Civil Services (IAS/IPS)',
    'Legal Advisor',
    
    // EDUCATION & WRITING
    'Professor/Lecturer',
    'Content Writer',
    'Journalist',
    'Technical Writer'
  ];

  const careerRoadmaps = {
    // ==================== ENGINEERING ROADMAPS ====================
    
    'Computer Science Engineering': {
      title: 'Computer Science Engineering Roadmap',
      duration: '4 years (B.Tech)',
      overview: 'Master programming, algorithms, data structures, and software development to become a versatile computer engineer.',
      steps: [
        {
          phase: 'Year 1 - Programming Foundation',
          timeline: 'Semesters 1-2',
          items: [
            { type: 'course', title: 'Programming in C/C++', duration: '6 months', platform: 'University + NPTEL' },
            { type: 'course', title: 'Data Structures', duration: '4 months', platform: 'GeeksforGeeks' },
            { type: 'course', title: 'Object-Oriented Programming', duration: '3 months', platform: 'Coursera' },
            { type: 'skill', title: 'Basic Web Development (HTML/CSS/JS)', duration: '2 months' }
          ]
        },
        {
          phase: 'Year 2 - Core CS Concepts',
          timeline: 'Semesters 3-4',
          items: [
            { type: 'course', title: 'Algorithms Design & Analysis', duration: '4 months', platform: 'MIT OCW' },
            { type: 'course', title: 'Database Management Systems', duration: '3 months', platform: 'NPTEL' },
            { type: 'course', title: 'Computer Networks', duration: '3 months', platform: 'NPTEL' },
            { type: 'course', title: 'Operating Systems', duration: '3 months', platform: 'NPTEL' },
            { type: 'project', title: 'Build 2-3 Mini Projects', duration: '6 months' }
          ]
        },
        {
          phase: 'Year 3 - Advanced Topics & Specialization',
          timeline: 'Semesters 5-6',
          items: [
            { type: 'course', title: 'Machine Learning Basics', duration: '3 months', platform: 'Andrew Ng Coursera' },
            { type: 'course', title: 'Choose Specialization (AI/ML/Web/Mobile)', duration: '6 months', platform: 'Udemy/Coursera' },
            { type: 'certification', title: 'Cloud Certification (AWS/Azure)', duration: '2 months', platform: 'AWS Training' },
            { type: 'internship', title: 'Summer Internship at Tech Company', duration: '2-3 months' }
          ]
        },
        {
          phase: 'Year 4 - Professional Preparation',
          timeline: 'Semesters 7-8',
          items: [
            { type: 'project', title: 'Major Final Year Project', duration: '8 months' },
            { type: 'skill', title: 'Competitive Programming (LeetCode/HackerRank)', duration: '6 months' },
            { type: 'job', title: 'Campus Placements Preparation', duration: '4 months' },
            { type: 'portfolio', title: 'GitHub Portfolio with 10+ Projects', duration: 'Ongoing' }
          ]
        }
      ],
      salary: '₹3-12 Lakhs (Entry) → ₹15-40 Lakhs (Experienced)',
      demand: 'Very High - 18% annual growth'
    },

    'Mechanical Engineering': {
      title: 'Mechanical Engineering Roadmap',
      duration: '4 years (B.Tech)',
      overview: 'Design, analyze, and manufacture mechanical systems from automobiles to robotics.',
      steps: [
        {
          phase: 'Year 1 - Basic Sciences & Drawing',
          timeline: 'Semesters 1-2',
          items: [
            { type: 'course', title: 'Engineering Mechanics', duration: '4 months', platform: 'NPTEL' },
            { type: 'course', title: 'Engineering Graphics & CAD', duration: '3 months', platform: 'SolidWorks' },
            { type: 'skill', title: 'AutoCAD/SolidWorks Certification', duration: '2 months' }
          ]
        },
        {
          phase: 'Year 2 - Core Mechanical Subjects',
          timeline: 'Semesters 3-4',
          items: [
            { type: 'course', title: 'Thermodynamics', duration: '4 months', platform: 'NPTEL' },
            { type: 'course', title: 'Fluid Mechanics', duration: '3 months', platform: 'NPTEL' },
            { type: 'course', title: 'Strength of Materials', duration: '3 months', platform: 'NPTEL' },
            { type: 'course', title: 'Manufacturing Processes', duration: '3 months', platform: 'NPTEL' }
          ]
        },
        {
          phase: 'Year 3 - Advanced Applications',
          timeline: 'Semesters 5-6',
          items: [
            { type: 'course', title: 'Heat Transfer', duration: '3 months', platform: 'NPTEL' },
            { type: 'course', title: 'Machine Design', duration: '4 months', platform: 'NPTEL' },
            { type: 'course', title: 'Mechatronics & Robotics', duration: '3 months', platform: 'Coursera' },
            { type: 'internship', title: 'Industrial Training (Automobile/Manufacturing)', duration: '2 months' }
          ]
        },
        {
          phase: 'Year 4 - Specialization & Career',
          timeline: 'Semesters 7-8',
          items: [
            { type: 'project', title: 'Final Year Project (Innovation Focus)', duration: '8 months' },
            { type: 'certification', title: 'Six Sigma/GD&T Certification', duration: '2 months' },
            { type: 'skill', title: 'ANSYS/CATIA Advanced Training', duration: '3 months' },
            { type: 'job', title: 'Core Company Placements', duration: '4 months' }
          ]
        }
      ],
      salary: '₹2.5-8 Lakhs (Entry) → ₹10-25 Lakhs (Experienced)',
      demand: 'High - 10% annual growth'
    },

    'Electrical Engineering': {
      title: 'Electrical Engineering Roadmap',
      duration: '4 years (B.Tech)',
      overview: 'Work with power systems, electronics, control systems, and electrical machinery.',
      steps: [
        {
          phase: 'Year 1 - Fundamentals',
          timeline: 'Semesters 1-2',
          items: [
            { type: 'course', title: 'Basic Electrical Engineering', duration: '4 months', platform: 'NPTEL' },
            { type: 'course', title: 'Programming for Engineers', duration: '3 months', platform: 'C/Python' }
          ]
        },
        {
          phase: 'Year 2 - Core Electrical',
          timeline: 'Semesters 3-4',
          items: [
            { type: 'course', title: 'Network Analysis', duration: '4 months', platform: 'NPTEL' },
            { type: 'course', title: 'Analog & Digital Electronics', duration: '4 months', platform: 'NPTEL' },
            { type: 'course', title: 'Electrical Machines-I', duration: '4 months', platform: 'NPTEL' }
          ]
        },
        {
          phase: 'Year 3 - Power & Control',
          timeline: 'Semesters 5-6',
          items: [
            { type: 'course', title: 'Power Systems Analysis', duration: '4 months', platform: 'NPTEL' },
            { type: 'course', title: 'Control Systems', duration: '3 months', platform: 'NPTEL' },
            { type: 'course', title: 'Power Electronics', duration: '3 months', platform: 'NPTEL' },
            { type: 'internship', title: 'Power Plant/Substation Training', duration: '2 months' }
          ]
        },
        {
          phase: 'Year 4 - Advanced & Career',
          timeline: 'Semesters 7-8',
          items: [
            { type: 'project', title: 'Smart Grid/Renewable Energy Project', duration: '8 months' },
            { type: 'certification', title: 'PLC/SCADA Certification', duration: '2 months' },
            { type: 'job', title: 'PSU/Private Sector Jobs', duration: '4 months' }
          ]
        }
      ],
      salary: '₹3-10 Lakhs (Entry) → ₹12-30 Lakhs (Experienced)',
      demand: 'High - 12% annual growth'
    },

    'Civil Engineering': {
      title: 'Civil Engineering Roadmap',
      duration: '4 years (B.Tech)',
      overview: 'Design and construct infrastructure including buildings, bridges, roads, and water systems.',
      steps: [
        {
          phase: 'Year 1 - Basic Engineering',
          timeline: 'Semesters 1-2',
          items: [
            { type: 'course', title: 'Engineering Mechanics', duration: '4 months', platform: 'NPTEL' },
            { type: 'course', title: 'Surveying & Levelling', duration: '3 months', platform: 'NPTEL' }
          ]
        },
        {
          phase: 'Year 2 - Core Civil',
          timeline: 'Semesters 3-4',
          items: [
            { type: 'course', title: 'Structural Analysis', duration: '4 months', platform: 'NPTEL' },
            { type: 'course', title: 'Concrete Technology', duration: '3 months', platform: 'NPTEL' },
            { type: 'course', title: 'Soil Mechanics', duration: '3 months', platform: 'NPTEL' },
            { type: 'skill', title: 'AutoCAD for Civil Engineering', duration: '2 months' }
          ]
        },
        {
          phase: 'Year 3 - Advanced Design',
          timeline: 'Semesters 5-6',
          items: [
            { type: 'course', title: 'Steel Structure Design', duration: '4 months', platform: 'NPTEL' },
            { type: 'course', title: 'Foundation Engineering', duration: '3 months', platform: 'NPTEL' },
            { type: 'course', title: 'Transportation Engineering', duration: '3 months', platform: 'NPTEL' },
            { type: 'internship', title: 'Construction Site Training', duration: '2 months' }
          ]
        },
        {
          phase: 'Year 4 - Professional Practice',
          timeline: 'Semesters 7-8',
          items: [
            { type: 'project', title: 'Building/Bridge Design Project', duration: '8 months' },
            { type: 'skill', title: 'STAAD Pro/ETABS Software', duration: '3 months' },
            { type: 'certification', title: 'Green Building Certification', duration: '2 months' },
            { type: 'job', title: 'Construction Companies/Government Jobs', duration: '4 months' }
          ]
        }
      ],
      salary: '₹2.5-7 Lakhs (Entry) → ₹10-20 Lakhs (Experienced)',
      demand: 'Moderate - 8% annual growth'
    },

    'Electronics & Communication': {
      title: 'Electronics & Communication Engineering Roadmap',
      duration: '4 years (B.Tech)',
      overview: 'Design electronic circuits, communication systems, and embedded devices.',
      steps: [
        {
          phase: 'Year 1 - Fundamentals',
          timeline: 'Semesters 1-2',
          items: [
            { type: 'course', title: 'Basic Electronics', duration: '4 months', platform: 'NPTEL' },
            { type: 'course', title: 'Programming in C', duration: '3 months', platform: 'NPTEL' }
          ]
        },
        {
          phase: 'Year 2 - Core ECE',
          timeline: 'Semesters 3-4',
          items: [
            { type: 'course', title: 'Analog Electronics', duration: '4 months', platform: 'NPTEL' },
            { type: 'course', title: 'Digital Electronics', duration: '3 months', platform: 'NPTEL' },
            { type: 'course', title: 'Signals & Systems', duration: '4 months', platform: 'NPTEL' }
          ]
        },
        {
          phase: 'Year 3 - Communication & Embedded',
          timeline: 'Semesters 5-6',
          items: [
            { type: 'course', title: 'Communication Systems', duration: '4 months', platform: 'NPTEL' },
            { type: 'course', title: 'Microprocessors & Microcontrollers', duration: '3 months', platform: 'NPTEL' },
            { type: 'course', title: 'VLSI Design', duration: '3 months', platform: 'NPTEL' },
            { type: 'internship', title: 'Electronics Industry Internship', duration: '2 months' }
          ]
        },
        {
          phase: 'Year 4 - Advanced & Career',
          timeline: 'Semesters 7-8',
          items: [
            { type: 'project', title: 'IoT/Embedded Systems Project', duration: '8 months' },
            { type: 'certification', title: 'MATLAB/VHDL Certification', duration: '2 months' },
            { type: 'job', title: 'Core Electronics/Semiconductor Companies', duration: '4 months' }
          ]
        }
      ],
      salary: '₹3-9 Lakhs (Entry) → ₹12-28 Lakhs (Experienced)',
      demand: 'High - 11% annual growth'
    },

    'Chemical Engineering': {
      title: 'Chemical Engineering Roadmap',
      duration: '4 years (B.Tech)',
      overview: 'Design and operate chemical plants, develop new materials, and optimize chemical processes.',
      steps: [
        {
          phase: 'Year 1 - Basic Sciences',
          timeline: 'Semesters 1-2',
          items: [
            { type: 'course', title: 'Chemistry for Engineers', duration: '4 months', platform: 'NPTEL' },
            { type: 'course', title: 'Engineering Mechanics', duration: '3 months', platform: 'NPTEL' }
          ]
        },
        {
          phase: 'Year 2 - Core Chemical',
          timeline: 'Semesters 3-4',
          items: [
            { type: 'course', title: 'Fluid Mechanics', duration: '4 months', platform: 'NPTEL' },
            { type: 'course', title: 'Thermodynamics', duration: '4 months', platform: 'NPTEL' },
            { type: 'course', title: 'Heat Transfer', duration: '3 months', platform: 'NPTEL' }
          ]
        },
        {
          phase: 'Year 3 - Process Engineering',
          timeline: 'Semesters 5-6',
          items: [
            { type: 'course', title: 'Chemical Reaction Engineering', duration: '4 months', platform: 'NPTEL' },
            { type: 'course', title: 'Mass Transfer', duration: '4 months', platform: 'NPTEL' },
            { type: 'course', title: 'Process Control', duration: '3 months', platform: 'NPTEL' },
            { type: 'internship', title: 'Chemical Plant Training', duration: '2 months' }
          ]
        },
        {
          phase: 'Year 4 - Advanced & Career',
          timeline: 'Semesters 7-8',
          items: [
            { type: 'project', title: 'Process Design Project', duration: '8 months' },
            { type: 'skill', title: 'Aspen Plus/HYSYS', duration: '3 months' },
            { type: 'job', title: 'Core Chemical/Petrochemical Companies', duration: '4 months' }
          ]
        }
      ],
      salary: '₹3-8 Lakhs (Entry) → ₹12-25 Lakhs (Experienced)',
      demand: 'High - 9% annual growth'
    },

    'Biotechnology': {
      title: 'Biotechnology Career Roadmap',
      duration: '3-4 years (B.Sc/M.Sc)',
      overview: 'Apply biological systems to develop products and technologies for healthcare, agriculture, and industry.',
      steps: [
        {
          phase: 'Foundation (Year 1-2)',
          timeline: 'First 2 Years',
          items: [
            { type: 'course', title: 'Cell Biology & Genetics', duration: '6 months', platform: 'University' },
            { type: 'course', title: 'Biochemistry', duration: '4 months', platform: 'NPTEL' },
            { type: 'course', title: 'Microbiology', duration: '4 months', platform: 'NPTEL' }
          ]
        },
        {
          phase: 'Core Biotech (Year 2-3)',
          timeline: 'Years 2-3',
          items: [
            { type: 'course', title: 'Molecular Biology', duration: '4 months', platform: 'Coursera' },
            { type: 'course', title: 'Genetic Engineering', duration: '4 months', platform: 'NPTEL' },
            { type: 'course', title: 'Bioprocess Engineering', duration: '3 months', platform: 'NPTEL' },
            { type: 'skill', title: 'Lab Techniques & Instrumentation', duration: '6 months' }
          ]
        },
        {
          phase: 'Specialization & Internship',
          timeline: 'Final Year',
          items: [
            { type: 'internship', title: 'Pharma/Biotech Company Internship', duration: '3-6 months' },
            { type: 'project', title: 'Research Project', duration: '6 months' },
            { type: 'course', title: 'Bioinformatics', duration: '3 months', platform: 'Coursera' }
          ]
        },
        {
          phase: 'Career Launch',
          timeline: 'After Graduation',
          items: [
            { type: 'job', title: 'Research Assistant/QC Analyst', duration: 'Job Search' },
            { type: 'exam', title: 'GATE/BET for Higher Studies', duration: 'Optional' }
          ]
        }
      ],
      salary: '₹2.5-6 Lakhs (Entry) → ₹10-20 Lakhs (Experienced)',
      demand: 'High - 13% annual growth'
    },

    'Biomedical Engineering': {
      title: 'Biomedical Engineering Roadmap',
      duration: '4 years (B.Tech)',
      overview: 'Design medical devices, prosthetics, and healthcare technologies at the intersection of engineering and medicine.',
      steps: [
        {
          phase: 'Year 1 - Foundation',
          timeline: 'Semesters 1-2',
          items: [
            { type: 'course', title: 'Human Anatomy & Physiology', duration: '4 months', platform: 'NPTEL' },
            { type: 'course', title: 'Basic Electrical Engineering', duration: '3 months', platform: 'NPTEL' }
          ]
        },
        {
          phase: 'Year 2 - Core Biomedical',
          timeline: 'Semesters 3-4',
          items: [
            { type: 'course', title: 'Biomechanics', duration: '4 months', platform: 'NPTEL' },
            { type: 'course', title: 'Biomaterials', duration: '3 months', platform: 'NPTEL' },
            { type: 'course', title: 'Medical Instrumentation', duration: '4 months', platform: 'NPTEL' }
          ]
        },
        {
          phase: 'Year 3 - Advanced Applications',
          timeline: 'Semesters 5-6',
          items: [
            { type: 'course', title: 'Medical Imaging Systems', duration: '4 months', platform: 'NPTEL' },
            { type: 'course', title: 'Prosthetics & Orthotics', duration: '3 months', platform: 'NPTEL' },
            { type: 'internship', title: 'Hospital/Medical Device Company', duration: '2 months' }
          ]
        },
        {
          phase: 'Year 4 - Professional',
          timeline: 'Semesters 7-8',
          items: [
            { type: 'project', title: 'Medical Device Design Project', duration: '8 months' },
            { type: 'certification', title: 'Clinical Engineering Certification', duration: '2 months' },
            { type: 'job', title: 'Healthcare/Medical Device Industry', duration: '4 months' }
          ]
        }
      ],
      salary: '₹3-8 Lakhs (Entry) → ₹12-25 Lakhs (Experienced)',
      demand: 'Very High - 15% annual growth'
    },

    'Aerospace Engineering': {
      title: 'Aerospace Engineering Roadmap',
      duration: '4 years (B.Tech)',
      overview: 'Design aircraft, spacecraft, satellites, and missiles with focus on aerodynamics and propulsion.',
      steps: [
        {
          phase: 'Year 1 - Basic Engineering',
          timeline: 'Semesters 1-2',
          items: [
            { type: 'course', title: 'Engineering Mechanics', duration: '4 months', platform: 'NPTEL' },
            { type: 'course', title: 'Engineering Graphics', duration: '3 months', platform: 'NPTEL' }
          ]
        },
        {
          phase: 'Year 2 - Core Aerospace',
          timeline: 'Semesters 3-4',
          items: [
            { type: 'course', title: 'Aerodynamics', duration: '4 months', platform: 'NPTEL' },
            { type: 'course', title: 'Flight Mechanics', duration: '3 months', platform: 'NPTEL' },
            { type: 'course', title: 'Propulsion', duration: '4 months', platform: 'NPTEL' }
          ]
        },
        {
          phase: 'Year 3 - Advanced Design',
          timeline: 'Semesters 5-6',
          items: [
            { type: 'course', title: 'Aircraft Structures', duration: '4 months', platform: 'NPTEL' },
            { type: 'course', title: 'Control Systems', duration: '3 months', platform: 'NPTEL' },
            { type: 'internship', title: 'DRDO/ISRO/Airline Internship', duration: '2 months' }
          ]
        },
        {
          phase: 'Year 4 - Career Preparation',
          timeline: 'Semesters 7-8',
          items: [
            { type: 'project', title: 'Aircraft/Spacecraft Design Project', duration: '8 months' },
            { type: 'skill', title: 'CATIA/ANSYS Software', duration: '3 months' },
            { type: 'job', title: 'Aerospace/Defense Companies', duration: '4 months' }
          ]
        }
      ],
      salary: '₹4-10 Lakhs (Entry) → ₹15-35 Lakhs (Experienced)',
      demand: 'High - 10% annual growth'
    },

    'Automobile Engineering': {
      title: 'Automobile Engineering Roadmap',
      duration: '4 years (B.Tech)',
      overview: 'Design, develop, and manufacture automobiles including electric and autonomous vehicles.',
      steps: [
        {
          phase: 'Year 1 - Fundamentals',
          timeline: 'Semesters 1-2',
          items: [
            { type: 'course', title: 'Engineering Mechanics', duration: '4 months', platform: 'NPTEL' },
            { type: 'course', title: 'Basic Mechanical Engineering', duration: '3 months', platform: 'NPTEL' }
          ]
        },
        {
          phase: 'Year 2 - Core Auto',
          timeline: 'Semesters 3-4',
          items: [
            { type: 'course', title: 'IC Engines', duration: '4 months', platform: 'NPTEL' },
            { type: 'course', title: 'Automotive Chassis', duration: '3 months', platform: 'NPTEL' },
            { type: 'course', title: 'Vehicle Dynamics', duration: '3 months', platform: 'NPTEL' }
          ]
        },
        {
          phase: 'Year 3 - Advanced Systems',
          timeline: 'Semesters 5-6',
          items: [
            { type: 'course', title: 'Electric Vehicles', duration: '3 months', platform: 'NPTEL' },
            { type: 'course', title: 'Automotive Electronics', duration: '3 months', platform: 'NPTEL' },
            { type: 'internship', title: 'Auto Manufacturing Plant', duration: '2 months' }
          ]
        },
        {
          phase: 'Year 4 - Professional',
          timeline: 'Semesters 7-8',
          items: [
            { type: 'project', title: 'Vehicle Design/Modification Project', duration: '8 months' },
            { type: 'skill', title: 'CAD/CAM Software', duration: '3 months' },
            { type: 'job', title: 'Auto OEMs/Ancillary Companies', duration: '4 months' }
          ]
        }
      ],
      salary: '₹3-8 Lakhs (Entry) → ₹12-28 Lakhs (Experienced)',
      demand: 'High - 11% annual growth'
    },

    // ==================== DATA SCIENCE & AI ROADMAPS ====================
    
    'Data Scientist': {
      title: 'Data Scientist Career Roadmap',
      duration: '3-4 years',
      overview: 'Learn to extract insights from data using statistical methods, machine learning, and programming skills.',
      steps: [
        {
          phase: 'Foundation (6-12 months)',
          timeline: 'Months 1-12',
          items: [
            { type: 'course', title: 'Mathematics for Data Science', duration: '3 months', platform: 'Coursera' },
            { type: 'course', title: 'Python Programming', duration: '2 months', platform: 'edX' },
            { type: 'course', title: 'Statistics & Probability', duration: '3 months', platform: 'Khan Academy' },
            { type: 'skill', title: 'Excel and Data Analysis', duration: '1 month' }
          ]
        },
        {
          phase: 'Core Skills (12-18 months)',
          timeline: 'Months 13-30',
          items: [
            { type: 'course', title: 'Machine Learning', duration: '4 months', platform: 'Andrew Ng (Coursera)' },
            { type: 'course', title: 'Data Visualization (Tableau/Power BI)', duration: '2 months', platform: 'Udemy' },
            { type: 'course', title: 'SQL for Data Analysis', duration: '2 months', platform: 'DataCamp' },
            { type: 'skill', title: 'R Programming', duration: '3 months' },
            { type: 'project', title: 'Build 3-5 Data Science Projects', duration: '5 months' }
          ]
        },
        {
          phase: 'Advanced Specialization (6-12 months)',
          timeline: 'Months 31-42',
          items: [
            { type: 'course', title: 'Deep Learning Specialization', duration: '4 months', platform: 'DeepLearning.AI' },
            { type: 'course', title: 'Big Data Technologies (Hadoop/Spark)', duration: '3 months', platform: 'Udacity' },
            { type: 'certification', title: 'Google Data Analytics Professional Certificate', duration: '3 months', platform: 'Coursera' },
            { type: 'skill', title: 'Cloud Platforms (AWS/GCP)', duration: '2 months' }
          ]
        },
        {
          phase: 'Professional Development (3-6 months)',
          timeline: 'Months 43-48',
          items: [
            { type: 'internship', title: 'Data Science Internship', duration: '3-6 months' },
            { type: 'portfolio', title: 'Create Professional Portfolio', duration: '2 months' },
            { type: 'networking', title: 'Attend Data Science Meetups', duration: 'Ongoing' },
            { type: 'job', title: 'Apply for Entry-Level Positions', duration: '2-3 months' }
          ]
        }
      ],
      salary: '₹4-12 Lakhs (Entry) → ₹15-30 Lakhs (Experienced)',
      demand: 'Very High - 20% annual growth'
    },

    'Artificial Intelligence Engineer': {
      title: 'AI Engineer Roadmap',
      duration: '3-4 years',
      overview: 'Build intelligent systems using machine learning, deep learning, and neural networks.',
      steps: [
        {
          phase: 'Foundation (6-12 months)',
          timeline: 'Months 1-12',
          items: [
            { type: 'course', title: 'Linear Algebra & Calculus', duration: '4 months', platform: 'Khan Academy/MIT OCW' },
            { type: 'course', title: 'Python Programming Mastery', duration: '3 months', platform: 'Coursera' },
            { type: 'course', title: 'Probability & Statistics', duration: '3 months', platform: 'NPTEL' }
          ]
        },
        {
          phase: 'ML Foundation (12-18 months)',
          timeline: 'Months 13-30',
          items: [
            { type: 'course', title: 'Machine Learning A-Z', duration: '5 months', platform: 'Andrew Ng Coursera' },
            { type: 'course', title: 'Neural Networks Basics', duration: '3 months', platform: 'DeepLearning.AI' },
            { type: 'project', title: 'Build ML Models (Regression/Classification)', duration: '4 months' }
          ]
        },
        {
          phase: 'Deep Learning (12-18 months)',
          timeline: 'Months 31-48',
          items: [
            { type: 'course', title: 'Deep Learning Specialization', duration: '6 months', platform: 'Andrew Ng' },
            { type: 'course', title: 'NLP or Computer Vision', duration: '4 months', platform: 'Coursera/Udacity' },
            { type: 'skill', title: 'TensorFlow/PyTorch Framework', duration: '3 months' },
            { type: 'project', title: 'AI Projects (Chatbot/Image Recognition)', duration: '5 months' }
          ]
        },
        {
          phase: 'Professional (6-12 months)',
          timeline: 'Months 49-60',
          items: [
            { type: 'certification', title: 'TensorFlow Developer Certificate', duration: '3 months', platform: 'Google' },
            { type: 'internship', title: 'AI/ML Internship', duration: '4-6 months' },
            { type: 'portfolio', title: 'GitHub with AI Projects', duration: 'Ongoing' },
            { type: 'job', title: 'AI Engineer Positions', duration: '3 months' }
          ]
        }
      ],
      salary: '₹5-15 Lakhs (Entry) → ₹20-50 Lakhs (Experienced)',
      demand: 'Extremely High - 25% annual growth'
    },

    'Machine Learning Engineer': {
      title: 'Machine Learning Engineer Roadmap',
      duration: '3-4 years',
      overview: 'Deploy ML models to production and build scalable machine learning systems.',
      steps: [
        {
          phase: 'Programming & Math (6-12 months)',
          timeline: 'Months 1-12',
          items: [
            { type: 'course', title: 'Python for Data Science', duration: '3 months', platform: 'DataCamp' },
            { type: 'course', title: 'Linear Algebra', duration: '3 months', platform: '3Blue1Brown' },
            { type: 'course', title: 'Calculus & Optimization', duration: '3 months', platform: 'NPTEL' }
          ]
        },
        {
          phase: 'ML Algorithms (12-18 months)',
          timeline: 'Months 13-30',
          items: [
            { type: 'course', title: 'Supervised Learning Algorithms', duration: '4 months', platform: 'Coursera' },
            { type: 'course', title: 'Unsupervised Learning', duration: '3 months', platform: 'Udacity' },
            { type: 'skill', title: 'Scikit-learn Library Mastery', duration: '2 months' },
            { type: 'project', title: 'End-to-End ML Projects', duration: '5 months' }
          ]
        },
        {
          phase: 'MLOps & Deployment (12-18 months)',
          timeline: 'Months 31-48',
          items: [
            { type: 'course', title: 'ML Model Deployment', duration: '3 months', platform: 'Udemy' },
            { type: 'course', title: 'Docker & Kubernetes for ML', duration: '3 months', platform: 'A Cloud Guru' },
            { type: 'skill', title: 'AWS SageMaker/Azure ML', duration: '3 months' },
            { type: 'certification', title: 'AWS Machine Learning Specialty', duration: '3 months' }
          ]
        },
        {
          phase: 'Production Experience (6-12 months)',
          timeline: 'Months 49-60',
          items: [
            { type: 'internship', title: 'ML Engineering Internship', duration: '4-6 months' },
            { type: 'project', title: 'Deploy Production ML System', duration: '4 months' },
            { type: 'job', title: 'MLE Job Applications', duration: '3 months' }
          ]
        }
      ],
      salary: '₹5-18 Lakhs (Entry) → ₹25-60 Lakhs (Experienced)',
      demand: 'Extremely High - 28% annual growth'
    },

    'Environmental Scientist': {
      title: 'Environmental Scientist Career Roadmap',
      duration: '4-6 years',
      overview: 'Study environmental problems and develop solutions to protect ecosystems and human health.',
      steps: [
        {
          phase: 'Foundation (Year 1-3)',
          timeline: 'First 3 Years',
          items: [
            { type: 'degree', title: "Bachelor's in Environmental Science", duration: '3 years', platform: 'University' },
            { type: 'course', title: 'Ecology & Ecosystems', duration: '6 months', platform: 'University' },
            { type: 'course', title: 'Environmental Chemistry', duration: '6 months', platform: 'NPTEL' }
          ]
        },
        {
          phase: 'Advanced Studies (Year 4-5)',
          timeline: 'Years 4-5',
          items: [
            { type: 'degree', title: "Master's in Environmental Science", duration: '2 years', platform: 'University' },
            { type: 'course', title: 'Climate Change Science', duration: '6 months', platform: 'Coursera' },
            { type: 'skill', title: 'GIS & Remote Sensing', duration: '6 months' },
            { type: 'research', title: 'Thesis/Research Project', duration: '1 year' }
          ]
        },
        {
          phase: 'Specialization & Experience',
          timeline: 'Years 6+',
          items: [
            { type: 'specialization', title: 'Focus Area (Water/Air/Soil/Wildlife)', duration: '1-2 years' },
            { type: 'internship', title: 'Environmental Consultancy/Government Agency', duration: '6 months' },
            { type: 'certification', title: 'Professional Scientist Certification', duration: 'Optional' }
          ]
        },
        {
          phase: 'Career Development',
          timeline: 'Years 7+',
          items: [
            { type: 'job', title: 'Environmental Scientist/Consultant', duration: 'Job Search' },
            { type: 'phd', title: 'PhD for Research Roles (Optional)', duration: '4-5 years' }
          ]
        }
      ],
      salary: '₹3-7 Lakhs (Entry) → ₹10-25 Lakhs (Experienced)',
      demand: 'High - 11% annual growth'
    },

    'Physics Researcher': {
      title: 'Physics Researcher Roadmap',
      duration: '8-12 years',
      overview: 'Conduct research to understand fundamental laws of nature through experiments and theoretical models.',
      steps: [
        {
          phase: 'Undergraduate Education (3-4 years)',
          timeline: 'Years 1-4',
          items: [
            { type: 'degree', title: "B.Sc/B.Tech in Physics", duration: '3-4 years', platform: 'University/IIT' },
            { type: 'course', title: 'Classical Mechanics', duration: '1 year', platform: 'University' },
            { type: 'course', title: 'Quantum Mechanics', duration: '1 year', platform: 'University' },
            { type: 'course', title: 'Mathematical Physics', duration: '1 year', platform: 'NPTEL' }
          ]
        },
        {
          phase: 'Postgraduate Studies (2-3 years)',
          timeline: 'Years 5-7',
          items: [
            { type: 'degree', title: "M.Sc in Physics", duration: '2 years', platform: 'University/IISER' },
            { type: 'specialization', title: 'Choose Field (Particle/Condensed Matter/Astro)', duration: '2 years' },
            { type: 'exam', title: 'GATE/NET/JEST Preparation', duration: 'During M.Sc' }
          ]
        },
        {
          phase: 'Doctoral Research (5-7 years)',
          timeline: 'Years 8-14',
          items: [
            { type: 'degree', title: 'PhD in Physics', duration: '5-7 years', platform: 'University/Research Institute' },
            { type: 'research', title: 'Original Research & Publications', duration: 'Ongoing' },
            { type: 'conference', title: 'Present at International Conferences', duration: '2-3 per year' }
          ]
        },
        {
          phase: 'Postdoctoral & Career',
          timeline: 'Years 15+',
          items: [
            { type: 'position', title: 'Postdoctoral Researcher', duration: '2-4 years' },
            { type: 'job', title: 'Scientist/Professor Position', duration: 'Permanent Role' }
          ]
        }
      ],
      salary: '₹4-8 Lakhs (PhD Student) → ₹10-20 Lakhs (Postdoc) → ₹15-40 Lakhs+ (Scientist/Professor)',
      demand: 'Moderate - Competitive field'
    },

    'Chemistry Researcher': {
      title: 'Chemistry Researcher Roadmap',
      duration: '8-12 years',
      overview: 'Discover new compounds, reactions, and materials through laboratory research and analysis.',
      steps: [
        {
          phase: 'Undergraduate (3-4 years)',
          timeline: 'Years 1-4',
          items: [
            { type: 'degree', title: "B.Sc/B.Tech in Chemistry", duration: '3-4 years', platform: 'University/IIT' },
            { type: 'course', title: 'Organic Chemistry', duration: '1 year', platform: 'University' },
            { type: 'course', title: 'Inorganic Chemistry', duration: '1 year', platform: 'University' },
            { type: 'course', title: 'Physical Chemistry', duration: '1 year', platform: 'University' }
          ]
        },
        {
          phase: 'Postgraduate (2-3 years)',
          timeline: 'Years 5-7',
          items: [
            { type: 'degree', title: "M.Sc in Chemistry", duration: '2 years', platform: 'University/IISER' },
            { type: 'specialization', title: 'Choose Specialization (Organic/Inorganic/Physical/Materials)', duration: '2 years' },
            { type: 'skill', title: 'Advanced Lab Techniques', duration: '1 year' },
            { type: 'exam', title: 'GATE/CSIR NET Preparation', duration: 'During M.Sc' }
          ]
        },
        {
          phase: 'Doctoral Research (5-7 years)',
          timeline: 'Years 8-14',
          items: [
            { type: 'degree', title: 'PhD in Chemistry', duration: '5-7 years', platform: 'University/Research Lab' },
            { type: 'research', title: 'Synthesis/Analysis Research', duration: 'Ongoing' },
            { type: 'publication', title: 'Publish in Peer-Reviewed Journals', duration: '2-4 papers' }
          ]
        },
        {
          phase: 'Professional Career',
          timeline: 'Years 15+',
          items: [
            { type: 'position', title: 'Postdoctoral Fellow/Industry Scientist', duration: '2-4 years' },
            { type: 'job', title: 'Senior Scientist/R&D Manager', duration: 'Industry/Academia' }
          ]
        }
      ],
      salary: '₹4-8 Lakhs (PhD Student) → ₹10-22 Lakhs (Postdoc) → ₹15-35 Lakhs+ (Senior Scientist)',
      demand: 'Moderate - 9% annual growth'
    },

    'Mathematics Professor': {
      title: 'Mathematics Professor Roadmap',
      duration: '8-12 years',
      overview: 'Teach mathematics at college/university level and conduct mathematical research.',
      steps: [
        {
          phase: 'Undergraduate Studies (3-4 years)',
          timeline: 'Years 1-4',
          items: [
            { type: 'degree', title: "B.Sc/B.Math in Mathematics", duration: '3-4 years', platform: 'University/ISI/CMI' },
            { type: 'course', title: 'Real Analysis', duration: '1 year', platform: 'University' },
            { type: 'course', title: 'Abstract Algebra', duration: '1 year', platform: 'University' },
            { type: 'course', title: 'Topology', duration: '1 year', platform: 'NPTEL' }
          ]
        },
        {
          phase: 'Postgraduate Studies (2-3 years)',
          timeline: 'Years 5-7',
          items: [
            { type: 'degree', title: "M.Sc/M.Math in Mathematics", duration: '2 years', platform: 'University/ISI/TIFR' },
            { type: 'specialization', title: 'Focus Area (Pure/Applied/Statistics)', duration: '2 years' },
            { type: 'exam', title: 'GATE/NET/JAM Preparation', duration: 'During M.Sc' }
          ]
        },
        {
          phase: 'Doctoral Studies (5-7 years)',
          timeline: 'Years 8-14',
          items: [
            { type: 'degree', title: 'PhD in Mathematics', duration: '5-7 years', platform: 'University/Research Institute' },
            { type: 'research', title: 'Original Mathematical Research', duration: 'Ongoing' },
            { type: 'teaching', title: 'Teaching Assistant Experience', duration: '2-3 years' }
          ]
        },
        {
          phase: 'Academic Career',
          timeline: 'Years 15+',
          items: [
            { type: 'position', title: 'Assistant Professor', duration: '5-7 years' },
            { type: 'promotion', title: 'Associate Professor → Full Professor', duration: '10-15 years' },
            { type: 'research', title: 'Publications & Grants', duration: 'Ongoing' }
          ]
        }
      ],
      salary: '₹50,000-80,000 (Asst Prof) → ₹1-2 Lakhs (Professor)',
      demand: 'Moderate - Stable academic positions'
    },

    'Clinical Psychologist': {
      title: 'Clinical Psychologist Roadmap',
      duration: '7-10 years',
      overview: 'Diagnose and treat mental, emotional, and behavioral disorders through therapy and counseling.',
      steps: [
        {
          phase: 'Undergraduate Education (3 years)',
          timeline: 'Years 1-3',
          items: [
            { type: 'degree', title: "Bachelor's in Psychology", duration: '3 years', platform: 'University' },
            { type: 'course', title: 'Introduction to Psychology', duration: '6 months', platform: 'Coursera/Yale' },
            { type: 'course', title: 'Developmental Psychology', duration: '6 months', platform: 'University' }
          ]
        },
        {
          phase: 'Postgraduate Studies (2-3 years)',
          timeline: 'Years 4-6',
          items: [
            { type: 'degree', title: "Master's in Psychology/Counseling", duration: '2 years', platform: 'University' },
            { type: 'course', title: 'Psychopathology', duration: '1 year', platform: 'University' },
            { type: 'course', title: 'Psychotherapy Techniques', duration: '1 year', platform: 'University' },
            { type: 'internship', title: 'Clinical Internship', duration: '1 year' }
          ]
        },
        {
          phase: 'Doctoral Degree (4-6 years)',
          timeline: 'Years 7-12',
          items: [
            { type: 'degree', title: 'PsyD/PhD in Clinical Psychology', duration: '4-6 years', platform: 'University' },
            { type: 'training', title: 'Supervised Clinical Practice', duration: '2 years' },
            { type: 'dissertation', title: 'Doctoral Research', duration: '1-2 years' }
          ]
        },
        {
          phase: 'Licensure & Practice',
          timeline: 'Years 13+',
          items: [
            { type: 'exam', title: 'Licensing Examination', duration: 'Preparation + Exam' },
            { type: 'license', title: 'Licensed Clinical Psychologist', duration: 'State Board' },
            { type: 'job', title: 'Private Practice/Hospital/Clinic', duration: 'Career Start' }
          ]
        }
      ],
      salary: '₹4-8 Lakhs (Entry) → ₹12-30 Lakhs (Experienced)',
      demand: 'High - 14% annual growth'
    },

    // ==================== MANAGEMENT & COMMERCE ROADMAPS ====================
    
    'Software Engineer': {
      title: 'Software Engineer Career Roadmap',
      duration: '2-3 years',
      overview: 'Develop expertise in programming, software development, and system design to build innovative applications.',
      steps: [
        {
          phase: 'Programming Foundation (6-8 months)',
          timeline: 'Months 1-8',
          items: [
            { type: 'course', title: 'Computer Science Fundamentals', duration: '3 months', platform: 'CS50 (Harvard)' },
            { type: 'course', title: 'Data Structures & Algorithms', duration: '3 months', platform: 'GeeksforGeeks' },
            { type: 'skill', title: 'Choose 2 Languages (Python/Java/JavaScript)', duration: '2 months' }
          ]
        },
        {
          phase: 'Web Development (8-12 months)',
          timeline: 'Months 9-20',
          items: [
            { type: 'course', title: 'Frontend Development (HTML/CSS/JS)', duration: '3 months', platform: 'freeCodeCamp' },
            { type: 'course', title: 'Backend Development (Node.js/Express)', duration: '3 months', platform: 'Udemy' },
            { type: 'course', title: 'Database Management (SQL/MongoDB)', duration: '2 months', platform: 'MongoDB University' },
            { type: 'project', title: 'Build 5-7 Web Applications', duration: '4 months' }
          ]
        },
        {
          phase: 'Advanced Skills (6-12 months)',
          timeline: 'Months 21-32',
          items: [
            { type: 'course', title: 'System Design', duration: '3 months', platform: 'Grokking System Design' },
            { type: 'course', title: 'DevOps & Cloud (Docker/AWS)', duration: '3 months', platform: 'AWS Training' },
            { type: 'certification', title: 'AWS Certified Developer', duration: '2 months', platform: 'Amazon' },
            { type: 'skill', title: 'Version Control (Git)', duration: '1 month' }
          ]
        },
        {
          phase: 'Professional Development (4-8 months)',
          timeline: 'Months 33-40',
          items: [
            { type: 'internship', title: 'Software Development Internship', duration: '4-6 months' },
            { type: 'portfolio', title: 'GitHub Portfolio with 10+ Projects', duration: '2 months' },
            { type: 'networking', title: 'Tech Conferences & Hackathons', duration: 'Ongoing' },
            { type: 'job', title: 'Apply for Software Engineer Roles', duration: '2-3 months' }
          ]
        }
      ],
      salary: '₹3-8 Lakhs (Entry) → ₹10-25 Lakhs (Experienced)',
      demand: 'High - 15% annual growth'
    },

    'Financial Analyst': {
      title: 'Financial Analyst Roadmap',
      duration: '2-3 years',
      overview: 'Analyze financial data, market trends, and investment opportunities to guide business decisions.',
      steps: [
        {
          phase: 'Finance Fundamentals (6-12 months)',
          timeline: 'Months 1-12',
          items: [
            { type: 'course', title: 'Financial Accounting', duration: '3 months', platform: 'Coursera' },
            { type: 'course', title: 'Economics (Micro & Macro)', duration: '3 months', platform: 'Khan Academy' },
            { type: 'skill', title: 'Excel for Finance Mastery', duration: '2 months' }
          ]
        },
        {
          phase: 'Core Finance Skills (12-18 months)',
          timeline: 'Months 13-30',
          items: [
            { type: 'course', title: 'Financial Statement Analysis', duration: '3 months', platform: 'CFI' },
            { type: 'course', title: 'Corporate Finance', duration: '3 months', platform: 'Coursera' },
            { type: 'course', title: 'Investment Analysis', duration: '3 months', platform: 'Udemy' },
            { type: 'certification', title: 'FMVA Certification', duration: '4 months', platform: 'CFI' }
          ]
        },
        {
          phase: 'Advanced Certifications (12-18 months)',
          timeline: 'Months 31-48',
          items: [
            { type: 'certification', title: 'CFA Level 1', duration: '6 months', platform: 'CFA Institute' },
            { type: 'skill', title: 'Bloomberg Terminal Training', duration: '2 months' },
            { type: 'course', title: 'Risk Management', duration: '3 months', platform: 'Coursera' }
          ]
        },
        {
          phase: 'Career Launch (6-12 months)',
          timeline: 'Months 49-60',
          items: [
            { type: 'internship', title: 'Finance Internship (Bank/Consulting)', duration: '4-6 months' },
            { type: 'networking', title: 'Finance Industry Events', duration: 'Ongoing' },
            { type: 'job', title: 'Financial Analyst Positions', duration: '3-4 months' }
          ]
        }
      ],
      salary: '₹3-8 Lakhs (Entry) → ₹12-30 Lakhs (Experienced)',
      demand: 'High - 14% annual growth'
    },

    'Chartered Accountant': {
      title: 'Chartered Accountant (CA) Roadmap',
      duration: '4-5 years',
      overview: 'Become a certified CA with expertise in accounting, taxation, auditing, and financial management.',
      steps: [
        {
          phase: 'CA Foundation',
          timeline: 'After 12th - 6-12 months',
          items: [
            { type: 'course', title: 'Principles of Accounting', duration: '4 months', platform: 'ICAI' },
            { type: 'course', title: 'Business Laws & Economics', duration: '3 months', platform: 'ICAI' },
            { type: 'exam', title: 'CA Foundation Exam', duration: 'Preparation + Exam' }
          ]
        },
        {
          phase: 'CA Intermediate',
          timeline: '12-18 months after Foundation',
          items: [
            { type: 'course', title: 'Advanced Accounting', duration: '4 months', platform: 'ICAI' },
            { type: 'course', title: 'Taxation (Direct & Indirect)', duration: '4 months', platform: 'ICAI' },
            { type: 'course', title: 'Costing & Auditing', duration: '4 months', platform: 'ICAI' },
            { type: 'exam', title: 'CA Intermediate Exam (Both Groups)', duration: 'Preparation + Exam' }
          ]
        },
        {
          phase: 'Articleship Training',
          timeline: '3 years',
          items: [
            { type: 'internship', title: 'CA Articleship under Practicing CA', duration: '3 years' },
            { type: 'skill', title: 'Practical Accounting & Taxation Work', duration: 'Ongoing' },
            { type: 'course', title: 'ICAI Orientation Course', duration: '1 month' }
          ]
        },
        {
          phase: 'CA Final',
          timeline: 'Last 6-12 months of Articleship',
          items: [
            { type: 'course', title: 'Financial Reporting', duration: '4 months', platform: 'ICAI' },
            { type: 'course', title: 'Strategic Financial Management', duration: '4 months', platform: 'ICAI' },
            { type: 'exam', title: 'CA Final Exam', duration: 'Preparation + Exam' },
            { type: 'job', title: 'CA Firm Placement', duration: 'After passing' }
          ]
        }
      ],
      salary: '₹6-12 Lakhs (Fresher CA) → ₹20-50 Lakhs (Experienced)',
      demand: 'Very High - Always in demand'
    },

    'MBA Professional': {
      title: 'MBA Professional Roadmap',
      duration: '2 years (Full-time MBA)',
      overview: 'Develop leadership and management skills to excel in business administration and corporate roles.',
      steps: [
        {
          phase: 'Pre-MBA Preparation (6-12 months)',
          timeline: 'Before MBA',
          items: [
            { type: 'exam', title: 'CAT/MAT/XAT Preparation', duration: '6-8 months' },
            { type: 'skill', title: 'Basic Business Concepts', duration: '2 months' },
            { type: 'course', title: 'Communication Skills Development', duration: 'Ongoing' }
          ]
        },
        {
          phase: 'MBA Year 1 - Core Management',
          timeline: 'First Year',
          items: [
            { type: 'course', title: 'Marketing Management', duration: 'Semester 1', platform: 'B-School' },
            { type: 'course', title: 'Financial Management', duration: 'Semester 1', platform: 'B-School' },
            { type: 'course', title: 'Operations Management', duration: 'Semester 2', platform: 'B-School' },
            { type: 'course', title: 'Human Resource Management', duration: 'Semester 2', platform: 'B-School' },
            { type: 'internship', title: 'Summer Internship (Corporate)', duration: '2 months' }
          ]
        },
        {
          phase: 'MBA Year 2 - Specialization',
          timeline: 'Second Year',
          items: [
            { type: 'course', title: 'Choose Specialization (Marketing/Finance/HR/IT)', duration: 'Full Year', platform: 'B-School' },
            { type: 'course', title: 'Strategic Management', duration: 'Semester 3', platform: 'B-School' },
            { type: 'project', title: 'Live Corporate Project', duration: 'Semester 3', platform: 'Industry' },
            { type: 'job', title: 'Final Placements', duration: 'Semester 4' }
          ]
        },
        {
          phase: 'Post-MBA Career Growth',
          timeline: 'Years 3-5',
          items: [
            { type: 'job', title: 'Management Trainee/Manager Role', duration: '2-3 years' },
            { type: 'certification', title: 'Six Sigma/PMP (Optional)', duration: '6 months' },
            { type: 'networking', title: 'Alumni Network Engagement', duration: 'Ongoing' }
          ]
        }
      ],
      salary: '₹5-20 Lakhs (Top B-School) → ₹15-50 Lakhs (Senior Management)',
      demand: 'High - 16% annual growth'
    },

    'Digital Marketer': {
      title: 'Digital Marketer Roadmap',
      duration: '1-2 years',
      overview: 'Master online marketing strategies including SEO, social media, content marketing, and analytics.',
      steps: [
        {
          phase: 'Marketing Fundamentals (3-6 months)',
          timeline: 'Months 1-6',
          items: [
            { type: 'course', title: 'Marketing Principles', duration: '2 months', platform: 'Coursera' },
            { type: 'course', title: 'Consumer Behavior', duration: '2 months', platform: 'NPTEL' },
            { type: 'skill', title: 'Content Writing Basics', duration: '1 month' }
          ]
        },
        {
          phase: 'Core Digital Marketing (6-12 months)',
          timeline: 'Months 7-18',
          items: [
            { type: 'course', title: 'SEO (Search Engine Optimization)', duration: '3 months', platform: 'Moz/SEMrush' },
            { type: 'course', title: 'Social Media Marketing', duration: '2 months', platform: 'Meta Blueprint' },
            { type: 'course', title: 'Google Ads & PPC', duration: '2 months', platform: 'Google Skillshop' },
            { type: 'certification', title: 'Google Analytics Certification', duration: '1 month', platform: 'Google' },
            { type: 'project', title: 'Run Live Campaigns', duration: '3 months' }
          ]
        },
        {
          phase: 'Advanced Skills (6-12 months)',
          timeline: 'Months 19-30',
          items: [
            { type: 'course', title: 'Email Marketing Automation', duration: '2 months', platform: 'HubSpot' },
            { type: 'course', title: 'Content Marketing Strategy', duration: '2 months', platform: 'HubSpot' },
            { type: 'skill', title: 'Video Marketing (YouTube)', duration: '2 months' },
            { type: 'certification', title: 'Facebook Blueprint Certification', duration: '2 months' }
          ]
        },
        {
          phase: 'Professional Career (6-12 months)',
          timeline: 'Months 31-42',
          items: [
            { type: 'internship', title: 'Digital Marketing Internship', duration: '3-6 months' },
            { type: 'portfolio', title: 'Client Success Stories', duration: 'Ongoing' },
            { type: 'job', title: 'Digital Marketing Executive/Manager', duration: '2-3 months' }
          ]
        }
      ],
      salary: '₹2-5 Lakhs (Entry) → ₹8-20 Lakhs (Experienced)',
      demand: 'Very High - 22% annual growth'
    },

    'Business Analyst': {
      title: 'Business Analyst Roadmap',
      duration: '2-3 years',
      overview: 'Bridge the gap between IT and business by analyzing requirements and recommending solutions.',
      steps: [
        {
          phase: 'Foundation (6-12 months)',
          timeline: 'Months 1-12',
          items: [
            { type: 'course', title: 'Business Fundamentals', duration: '3 months', platform: 'Coursera' },
            { type: 'course', title: 'Data Analysis Basics', duration: '3 months', platform: 'DataCamp' },
            { type: 'skill', title: 'Excel & SQL', duration: '2 months' }
          ]
        },
        {
          phase: 'Core BA Skills (12-18 months)',
          timeline: 'Months 13-30',
          items: [
            { type: 'course', title: 'Requirements Elicitation', duration: '3 months', platform: 'IIBA' },
            { type: 'course', title: 'Process Modeling (BPMN/UML)', duration: '2 months', platform: 'Udemy' },
            { type: 'course', title: 'Data Visualization (Tableau/Power BI)', duration: '3 months', platform: 'Coursera' },
            { type: 'certification', title: 'ECBA Certification', duration: '3 months', platform: 'IIBA' }
          ]
        },
        {
          phase: 'Advanced & Agile (12-18 months)',
          timeline: 'Months 31-48',
          items: [
            { type: 'course', title: 'Agile & Scrum Methodology', duration: '2 months', platform: 'Scrum.org' },
            { type: 'certification', title: 'Certified Scrum Master (CSM)', duration: '2 months' },
            { type: 'skill', title: 'JIRA & Confluence', duration: '2 months' },
            { type: 'project', title: 'Real Business Analysis Projects', duration: '4 months' }
          ]
        },
        {
          phase: 'Career Launch (6-12 months)',
          timeline: 'Months 49-60',
          items: [
            { type: 'internship', title: 'Business Analyst Internship', duration: '4-6 months' },
            { type: 'networking', title: 'BA Community Events', duration: 'Ongoing' },
            { type: 'job', title: 'Junior Business Analyst Roles', duration: '2-3 months' }
          ]
        }
      ],
      salary: '₹3-8 Lakhs (Entry) → ₹12-25 Lakhs (Experienced)',
      demand: 'High - 17% annual growth'
    },

    'Investment Banker': {
      title: 'Investment Banker Roadmap',
      duration: '3-4 years',
      overview: 'Advise corporations and governments on raising capital, mergers, acquisitions, and financial restructuring.',
      steps: [
        {
          phase: 'Education Foundation (1-2 years)',
          timeline: 'Years 1-2',
          items: [
            { type: 'degree', title: "Bachelor's in Finance/Economics/Business", duration: '2 years', platform: 'University' },
            { type: 'course', title: 'Financial Accounting', duration: '3 months', platform: 'Coursera' },
            { type: 'skill', title: 'Excel & Financial Modeling', duration: '3 months' }
          ]
        },
        {
          phase: 'Core Finance Skills (1-2 years)',
          timeline: 'Years 3-4',
          items: [
            { type: 'course', title: 'Corporate Finance', duration: '4 months', platform: 'CFA Institute' },
            { type: 'course', title: 'Valuation Methods', duration: '3 months', platform: 'Wall Street Prep' },
            { type: 'course', title: 'M&A Fundamentals', duration: '3 months', platform: 'Breaking Into Wall Street' },
            { type: 'certification', title: 'FMVA or CFA Level 1', duration: '6 months' }
          ]
        },
        {
          phase: 'Advanced Qualifications (2-3 years)',
          timeline: 'Years 5-7',
          items: [
            { type: 'degree', title: 'MBA from Top B-School (Optional)', duration: '2 years', platform: 'IIM/ISB' },
            { type: 'certification', title: 'CFA Charter', duration: '2-3 years', platform: 'CFA Institute' },
            { type: 'skill', title: 'Bloomberg Terminal Training', duration: '2 months' }
          ]
        },
        {
          phase: 'Career Entry & Growth',
          timeline: 'Years 8+',
          items: [
            { type: 'internship', title: 'Investment Banking Internship', duration: 'Summer after MBA/Year 3' },
            { type: 'job', title: 'Analyst Position at IB Firm', duration: '2-3 years' },
            { type: 'promotion', title: 'Associate → VP → MD', duration: 'Career progression' }
          ]
        }
      ],
      salary: '₹8-20 Lakhs (Entry) → ₹50 Lakhs-2 Crores+ (Experienced)',
      demand: 'Very High - Competitive field'
    },

    // ==================== DESIGN & CREATIVE ROADMAPS ====================
    
    'UX/UI Designer': {
      title: 'UX/UI Designer Career Roadmap',
      duration: '1.5-2.5 years',
      overview: 'Master user experience and interface design to create intuitive, beautiful digital products.',
      steps: [
        {
          phase: 'Design Fundamentals (4-6 months)',
          timeline: 'Months 1-6',
          items: [
            { type: 'course', title: 'Design Principles & Theory', duration: '2 months', platform: 'Coursera' },
            { type: 'course', title: 'Color Theory & Typography', duration: '1 month', platform: 'Skillshare' },
            { type: 'skill', title: 'Adobe Creative Suite', duration: '3 months' }
          ]
        },
        {
          phase: 'UX Specialization (6-8 months)',
          timeline: 'Months 7-14',
          items: [
            { type: 'course', title: 'User Research & Personas', duration: '2 months', platform: 'Interaction Design Foundation' },
            { type: 'course', title: 'Wireframing & Prototyping', duration: '2 months', platform: 'Figma' },
            { type: 'course', title: 'Usability Testing', duration: '2 months', platform: 'Nielsen Norman Group' },
            { type: 'project', title: 'Complete 3-5 UX Case Studies', duration: '2 months' }
          ]
        },
        {
          phase: 'UI & Advanced Skills (6-8 months)',
          timeline: 'Months 15-22',
          items: [
            { type: 'course', title: 'Advanced UI Design', duration: '2 months', platform: 'Udemy' },
            { type: 'course', title: 'Motion Design & Animation', duration: '2 months', platform: 'School of Motion' },
            { type: 'certification', title: 'Google UX Design Certificate', duration: '3 months', platform: 'Coursera' },
            { type: 'skill', title: 'Design Systems', duration: '1 month' }
          ]
        },
        {
          phase: 'Professional Portfolio (3-6 months)',
          timeline: 'Months 23-28',
          items: [
            { type: 'internship', title: 'UX/UI Design Internship', duration: '3-4 months' },
            { type: 'portfolio', title: 'Professional Design Portfolio', duration: '2 months' },
            { type: 'networking', title: 'Design Community Engagement', duration: 'Ongoing' },
            { type: 'job', title: 'Apply for Design Positions', duration: '1-2 months' }
          ]
        }
      ],
      salary: '₹2.5-6 Lakhs (Entry) → ₹8-18 Lakhs (Experienced)',
      demand: 'High - 12% annual growth'
    },

    'Graphic Designer': {
      title: 'Graphic Designer Roadmap',
      duration: '1-2 years',
      overview: 'Create visual concepts that inspire and inform through digital and print media.',
      steps: [
        {
          phase: 'Design Basics (3-6 months)',
          timeline: 'Months 1-6',
          items: [
            { type: 'course', title: 'Graphic Design Fundamentals', duration: '3 months', platform: 'Coursera' },
            { type: 'skill', title: 'Adobe Photoshop', duration: '2 months' },
            { type: 'skill', title: 'Adobe Illustrator', duration: '2 months' }
          ]
        },
        {
          phase: 'Advanced Tools (6-12 months)',
          timeline: 'Months 7-18',
          items: [
            { type: 'skill', title: 'Adobe InDesign', duration: '2 months' },
            { type: 'course', title: 'Branding & Identity Design', duration: '3 months', platform: 'Skillshare' },
            { type: 'course', title: 'Print Design & Production', duration: '2 months' },
            { type: 'project', title: 'Create 10+ Design Projects', duration: '4 months' }
          ]
        },
        {
          phase: 'Specialization (6-12 months)',
          timeline: 'Months 19-30',
          items: [
            { type: 'course', title: 'Logo Design Mastery', duration: '2 months', platform: 'Udemy' },
            { type: 'skill', title: 'Motion Graphics (After Effects)', duration: '3 months' },
            { type: 'portfolio', title: 'Behance/Dribbble Portfolio', duration: 'Ongoing' },
            { type: 'freelancing', title: 'Start Freelancing (Upwork/Fiverr)', duration: '3 months' }
          ]
        },
        {
          phase: 'Professional Career (6-12 months)',
          timeline: 'Months 31-42',
          items: [
            { type: 'internship', title: 'Design Agency Internship', duration: '3-6 months' },
            { type: 'job', title: 'Graphic Designer Positions', duration: '2-3 months' }
          ]
        }
      ],
      salary: '₹2-5 Lakhs (Entry) → ₹6-15 Lakhs (Experienced)',
      demand: 'Moderate - 10% annual growth'
    },

    'Fashion Designer': {
      title: 'Fashion Designer Roadmap',
      duration: '3-4 years (B.Des)',
      overview: 'Create original clothing designs, accessories, and fashion trends.',
      steps: [
        {
          phase: 'Foundation (1-2 years)',
          timeline: 'Year 1-2',
          items: [
            { type: 'course', title: 'Fashion Illustration', duration: '6 months', platform: 'Fashion Institute' },
            { type: 'skill', title: 'Sketching & Drawing', duration: '6 months' },
            { type: 'course', title: 'Textile Science', duration: '4 months', platform: 'NIFT/NID' }
          ]
        },
        {
          phase: 'Technical Skills (1-2 years)',
          timeline: 'Year 2-3',
          items: [
            { type: 'skill', title: 'Pattern Making & Draping', duration: '6 months' },
            { type: 'skill', title: 'Garment Construction', duration: '6 months' },
            { type: 'software', title: 'CAD for Fashion', duration: '3 months' },
            { type: 'course', title: 'Fashion History & Trends', duration: '3 months' }
          ]
        },
        {
          phase: 'Portfolio & Internship (1 year)',
          timeline: 'Year 4',
          items: [
            { type: 'internship', title: 'Fashion House Internship', duration: '6 months' },
            { type: 'project', title: 'Graduate Collection', duration: '6 months' },
            { type: 'portfolio', title: 'Professional Design Portfolio', duration: 'Ongoing' }
          ]
        },
        {
          phase: 'Career Launch',
          timeline: 'After Graduation',
          items: [
            { type: 'job', title: 'Assistant Designer/Junior Designer', duration: '2-3 years' },
            { type: 'networking', title: 'Fashion Weeks & Events', duration: 'Ongoing' }
          ]
        }
      ],
      salary: '₹2-4 Lakhs (Entry) → ₹8-20 Lakhs (Experienced)',
      demand: 'Moderate - 9% annual growth'
    },

    'Interior Designer': {
      title: 'Interior Designer Roadmap',
      duration: '2-4 years',
      overview: 'Design functional and aesthetically pleasing indoor spaces for homes, offices, and commercial buildings.',
      steps: [
        {
          phase: 'Design Foundation (6-12 months)',
          timeline: 'Months 1-12',
          items: [
            { type: 'course', title: 'Interior Design Principles', duration: '4 months', platform: 'New York Institute of Art and Design' },
            { type: 'skill', title: 'Space Planning', duration: '3 months' },
            { type: 'software', title: 'AutoCAD/SketchUp', duration: '3 months' }
          ]
        },
        {
          phase: 'Technical Skills (12-18 months)',
          timeline: 'Months 13-30',
          items: [
            { type: 'course', title: 'Color Theory & Materials', duration: '3 months', platform: 'Coursera' },
            { type: 'course', title: 'Lighting Design', duration: '2 months', platform: 'Udemy' },
            { type: 'software', title: '3ds Max/Revit', duration: '4 months' },
            { type: 'project', title: 'Residential Design Projects', duration: '3 months' }
          ]
        },
        {
          phase: 'Advanced & Specialization (12-18 months)',
          timeline: 'Months 31-48',
          items: [
            { type: 'course', title: 'Commercial Interior Design', duration: '3 months', platform: 'UC Santa Cruz Extension' },
            { type: 'certification', title: 'LEED Green Associate', duration: '3 months' },
            { type: 'portfolio', title: 'Professional Portfolio', duration: '6 months' },
            { type: 'internship', title: 'Interior Design Firm Internship', duration: '6 months' }
          ]
        },
        {
          phase: 'Career Launch',
          timeline: 'Months 49+',
          items: [
            { type: 'job', title: 'Junior Interior Designer', duration: '2-3 years' },
            { type: 'licensure', title: 'NCIDQ Certification (Optional)', duration: 'After 2 years experience' }
          ]
        }
      ],
      salary: '₹2-5 Lakhs (Entry) → ₹8-18 Lakhs (Experienced)',
      demand: 'Moderate - 11% annual growth'
    },

    'Animator': {
      title: 'Animator Roadmap',
      duration: '2-3 years',
      overview: 'Create animated visuals for films, games, advertisements, and digital media using 2D/3D techniques.',
      steps: [
        {
          phase: 'Art Foundation (6-12 months)',
          timeline: 'Months 1-12',
          items: [
            { type: 'course', title: 'Drawing & Sketching', duration: '4 months', platform: 'Proko' },
            { type: 'course', title: 'Principles of Animation', duration: '4 months', platform: 'Animation Mentor' },
            { type: 'skill', title: 'Character Design', duration: '2 months' }
          ]
        },
        {
          phase: 'Software & Techniques (12-18 months)',
          timeline: 'Months 13-30',
          items: [
            { type: 'software', title: 'Maya/Blender 3D', duration: '4 months', platform: 'CG Spectrum' },
            { type: 'software', title: 'Adobe After Effects', duration: '3 months' },
            { type: 'course', title: '3D Modeling & Rigging', duration: '4 months', platform: 'iAnimate' },
            { type: 'project', title: 'Short Animation Project', duration: '3 months' }
          ]
        },
        {
          phase: 'Specialization (12-18 months)',
          timeline: 'Months 31-48',
          items: [
            { type: 'course', title: 'VFX & Compositing', duration: '3 months', platform: 'FXPHD' },
            { type: 'portfolio', title: 'Demo Reel Creation', duration: '6 months' },
            { type: 'internship', title: 'Animation Studio Internship', duration: '4-6 months' }
          ]
        },
        {
          phase: 'Career Entry',
          timeline: 'Months 49+',
          items: [
            { type: 'job', title: 'Junior Animator/Storyboard Artist', duration: 'Job Search' },
            { type: 'freelancing', title: 'Freelance Animation Projects', duration: 'Optional' }
          ]
        }
      ],
      salary: '₹2.5-6 Lakhs (Entry) → ₹10-20 Lakhs (Experienced)',
      demand: 'High - 12% annual growth'
    },

    'Video Editor': {
      title: 'Video Editor Roadmap',
      duration: '1-2 years',
      overview: 'Edit and assemble raw footage into polished videos for films, YouTube, commercials, and corporate content.',
      steps: [
        {
          phase: 'Editing Basics (3-6 months)',
          timeline: 'Months 1-6',
          items: [
            { type: 'course', title: 'Film Editing Fundamentals', duration: '3 months', platform: 'MasterClass' },
            { type: 'software', title: 'Adobe Premiere Pro', duration: '2 months' },
            { type: 'skill', title: 'Storytelling & Pacing', duration: '1 month' }
          ]
        },
        {
          phase: 'Advanced Skills (6-12 months)',
          timeline: 'Months 7-18',
          items: [
            { type: 'software', title: 'DaVinci Resolve (Color Grading)', duration: '3 months' },
            { type: 'software', title: 'Final Cut Pro', duration: '2 months' },
            { type: 'skill', title: 'Sound Design & Audio Mixing', duration: '2 months' },
            { type: 'project', title: 'Edit 10+ Videos', duration: '3 months' }
          ]
        },
        {
          phase: 'Specialization (6-12 months)',
          timeline: 'Months 19-30',
          items: [
            { type: 'course', title: 'Motion Graphics (After Effects)', duration: '3 months', platform: 'School of Motion' },
            { type: 'niche', title: 'Choose Niche (Wedding/Corporate/YouTube)', duration: 'Focus Area' },
            { type: 'portfolio', title: 'Showreel Creation', duration: '2 months' },
            { type: 'freelancing', title: 'Start Freelancing', duration: '3 months' }
          ]
        },
        {
          phase: 'Professional Career',
          timeline: 'Months 31+',
          items: [
            { type: 'job', title: 'Video Editor at Production House', duration: 'Job Search' },
            { type: 'networking', title: 'Build Client Network', duration: 'Ongoing' }
          ]
        }
      ],
      salary: '₹2-5 Lakhs (Entry) → ₹8-18 Lakhs (Experienced)',
      demand: 'High - 14% annual growth'
    },

    // ==================== MEDICAL & HEALTHCARE ROADMAPS ====================
    
    'MBBS Doctor': {
      title: 'MBBS Doctor Roadmap',
      duration: '5.5 years (including internship)',
      overview: 'Become a medical doctor with comprehensive knowledge of diagnosis, treatment, and patient care.',
      steps: [
        {
          phase: 'Pre-Medical Preparation',
          timeline: 'After 12th',
          items: [
            { type: 'exam', title: 'NEET UG Preparation', duration: '1-2 years' },
            { type: 'course', title: 'Physics, Chemistry, Biology (Class 11-12)', duration: '2 years' }
          ]
        },
        {
          phase: 'MBBS Year 1-2 - Pre-Clinical',
          timeline: 'First 2 Years',
          items: [
            { type: 'course', title: 'Human Anatomy', duration: '1 year', platform: 'Medical College' },
            { type: 'course', title: 'Physiology', duration: '1 year', platform: 'Medical College' },
            { type: 'course', title: 'Biochemistry', duration: '1 year', platform: 'Medical College' }
          ]
        },
        {
          phase: 'MBBS Year 3 - Para-Clinical',
          timeline: 'Third Year',
          items: [
            { type: 'course', title: 'Pathology', duration: '6 months', platform: 'Medical College' },
            { type: 'course', title: 'Pharmacology', duration: '6 months', platform: 'Medical College' },
            { type: 'course', title: 'Microbiology', duration: '6 months', platform: 'Medical College' },
            { type: 'course', title: 'Forensic Medicine', duration: '6 months', platform: 'Medical College' }
          ]
        },
        {
          phase: 'MBBS Final Year - Clinical',
          timeline: 'Years 4-5',
          items: [
            { type: 'course', title: 'Medicine & Allied Subjects', duration: '1 year', platform: 'Hospital Rotation' },
            { type: 'course', title: 'Surgery & Allied Subjects', duration: '1 year', platform: 'Hospital Rotation' },
            { type: 'course', title: 'OBG, Pediatrics, Orthopedics', duration: '1 year', platform: 'Hospital Rotation' },
            { type: 'exam', title: 'NEET PG Preparation (Optional for PG)', duration: 'During internship' }
          ]
        },
        {
          phase: 'Compulsory Rotating Internship',
          timeline: '1 Year',
          items: [
            { type: 'internship', title: 'Hospital Rotations (All Departments)', duration: '1 year' },
            { type: 'license', title: 'Medical Council Registration', duration: 'After internship' }
          ]
        }
      ],
      salary: '₹4-8 Lakhs (Intern) → ₹10-30 Lakhs (Doctor) → ₹30 Lakhs-1 Crore (Specialist)',
      demand: 'Very High - Always in demand'
    },

    'Pharmacist': {
      title: 'Pharmacist Roadmap (B.Pharm)',
      duration: '4 years',
      overview: 'Dispense medications, provide drug information, and ensure patient safety.',
      steps: [
        {
          phase: 'Foundation (Year 1-2)',
          timeline: 'Semesters 1-4',
          items: [
            { type: 'course', title: 'Pharmaceutical Chemistry', duration: '1 year', platform: 'Pharmacy College' },
            { type: 'course', title: 'Human Anatomy & Physiology', duration: '6 months', platform: 'Pharmacy College' },
            { type: 'course', title: 'Pharmaceutics', duration: '6 months', platform: 'Pharmacy College' }
          ]
        },
        {
          phase: 'Core Pharmacy (Year 3)',
          timeline: 'Semesters 5-6',
          items: [
            { type: 'course', title: 'Pharmacology', duration: '6 months', platform: 'Pharmacy College' },
            { type: 'course', title: 'Pharmaceutical Analysis', duration: '6 months', platform: 'Pharmacy College' },
            { type: 'course', title: 'Medicinal Chemistry', duration: '6 months', platform: 'Pharmacy College' }
          ]
        },
        {
          phase: 'Advanced & Internship (Year 4)',
          timeline: 'Semesters 7-8',
          items: [
            { type: 'course', title: 'Clinical Pharmacy', duration: '6 months', platform: 'Hospital Training' },
            { type: 'internship', title: 'Community/Hospital Pharmacy Training', duration: '3 months' },
            { type: 'project', title: 'Research Project', duration: '6 months' }
          ]
        },
        {
          phase: 'Licensing & Career',
          timeline: 'After Graduation',
          items: [
            { type: 'license', title: 'Registered Pharmacist License', duration: 'State Pharmacy Council' },
            { type: 'job', title: 'Hospital/Community Pharmacist', duration: 'Job Search' }
          ]
        }
      ],
      salary: '₹2-4 Lakhs (Entry) → ₹6-12 Lakhs (Experienced)',
      demand: 'High - 11% annual growth'
    },

    'Dentist (BDS)': {
      title: 'Dentist (BDS) Roadmap',
      duration: '5 years (including internship)',
      overview: 'Diagnose and treat dental diseases, perform dental procedures, and maintain oral health.',
      steps: [
        {
          phase: 'Pre-Dental Preparation',
          timeline: 'After 12th',
          items: [
            { type: 'exam', title: 'NEET UG Preparation', duration: '1-2 years' },
            { type: 'course', title: 'Physics, Chemistry, Biology (Class 11-12)', duration: '2 years' }
          ]
        },
        {
          phase: 'BDS Year 1-2 - Basic Sciences',
          timeline: 'First 2 Years',
          items: [
            { type: 'course', title: 'Human Anatomy & Physiology', duration: '1 year', platform: 'Dental College' },
            { type: 'course', title: 'Dental Anatomy & Oral Histology', duration: '1 year', platform: 'Dental College' },
            { type: 'course', title: 'Biochemistry & Pathology', duration: '6 months', platform: 'Dental College' }
          ]
        },
        {
          phase: 'BDS Year 3 - Pre-Clinical',
          timeline: 'Third Year',
          items: [
            { type: 'course', title: 'Dental Materials', duration: '6 months', platform: 'Dental College' },
            { type: 'course', title: 'Oral Pathology', duration: '6 months', platform: 'Dental College' },
            { type: 'skill', title: 'Pre-Clinical Lab Work', duration: '6 months' }
          ]
        },
        {
          phase: 'BDS Final Year - Clinical',
          timeline: 'Years 4-5',
          items: [
            { type: 'course', title: 'Conservative Dentistry & Endodontics', duration: '1 year', platform: 'Dental College' },
            { type: 'course', title: 'Orthodontics & Dentofacial Orthopedics', duration: '1 year', platform: 'Dental College' },
            { type: 'course', title: 'Oral Surgery & Periodontics', duration: '1 year', platform: 'Dental College' },
            { type: 'internship', title: 'Rotating Internship', duration: '1 year' }
          ]
        },
        {
          phase: 'Post-Graduation & Practice',
          timeline: 'After BDS',
          items: [
            { type: 'exam', title: 'NEET MDS (Optional for Specialization)', duration: 'Preparation' },
            { type: 'license', title: 'Dental Council Registration', duration: 'State Dental Council' },
            { type: 'job', title: 'Private Practice/Government Jobs', duration: 'Career Start' }
          ]
        }
      ],
      salary: '₹3-8 Lakhs (Intern) → ₹8-20 Lakhs (Dentist) → ₹20-50 Lakhs+ (Private Practice)',
      demand: 'High - 10% annual growth'
    },

    'Nurse': {
      title: 'Nurse Career Roadmap (B.Sc Nursing)',
      duration: '4 years',
      overview: 'Provide patient care, administer treatments, and support healthcare teams in hospitals and clinics.',
      steps: [
        {
          phase: 'Foundation (Year 1-2)',
          timeline: 'First 2 Years',
          items: [
            { type: 'course', title: 'Anatomy & Physiology', duration: '1 year', platform: 'Nursing College' },
            { type: 'course', title: 'Microbiology & Biochemistry', duration: '6 months', platform: 'Nursing College' },
            { type: 'course', title: 'Fundamentals of Nursing', duration: '1 year', platform: 'Nursing College' }
          ]
        },
        {
          phase: 'Core Nursing (Year 2-3)',
          timeline: 'Years 2-3',
          items: [
            { type: 'course', title: 'Medical-Surgical Nursing', duration: '1 year', platform: 'Nursing College' },
            { type: 'course', title: 'Pharmacology for Nurses', duration: '6 months', platform: 'Nursing College' },
            { type: 'course', title: 'Pathophysiology', duration: '6 months', platform: 'Nursing College' },
            { type: 'clinical', title: 'Hospital Rotations', duration: 'Ongoing' }
          ]
        },
        {
          phase: 'Specialization & Internship (Year 4)',
          timeline: 'Final Year',
          items: [
            { type: 'course', title: 'Critical Care Nursing', duration: '6 months', platform: 'Nursing College' },
            { type: 'course', title: 'Community Health Nursing', duration: '6 months', platform: 'Nursing College' },
            { type: 'internship', title: 'Hospital Internship', duration: '6 months' }
          ]
        },
        {
          phase: 'Licensing & Career',
          timeline: 'After Graduation',
          items: [
            { type: 'exam', title: 'NCLEX-RN/Nursing Council Exam', duration: 'Preparation + Exam' },
            { type: 'license', title: 'Registered Nurse License', duration: 'State Nursing Council' },
            { type: 'job', title: 'Staff Nurse Positions', duration: 'Hospital Recruitment' }
          ]
        }
      ],
      salary: '₹2-5 Lakhs (Entry) → ₹6-15 Lakhs (Experienced) → ₹15-30 Lakhs+ (Abroad)',
      demand: 'Very High - 16% annual growth'
    },

    'Physiotherapist': {
      title: 'Physiotherapist Roadmap (BPT)',
      duration: '4.5 years (including internship)',
      overview: 'Help patients restore movement and function through exercise, manual therapy, and education.',
      steps: [
        {
          phase: 'Basic Sciences (Year 1-2)',
          timeline: 'First 2 Years',
          items: [
            { type: 'course', title: 'Human Anatomy & Physiology', duration: '1 year', platform: 'Physiotherapy College' },
            { type: 'course', title: 'Biomechanics & Kinesiology', duration: '6 months', platform: 'Physiotherapy College' },
            { type: 'course', title: 'Exercise Therapy', duration: '6 months', platform: 'Physiotherapy College' }
          ]
        },
        {
          phase: 'Core Physiotherapy (Year 2-3)',
          timeline: 'Years 2-3',
          items: [
            { type: 'course', title: 'Electrotherapy', duration: '6 months', platform: 'Physiotherapy College' },
            { type: 'course', title: 'Manual Therapy', duration: '6 months', platform: 'Physiotherapy College' },
            { type: 'course', title: 'Orthopedic Physiotherapy', duration: '6 months', platform: 'Physiotherapy College' },
            { type: 'course', title: 'Neurological Physiotherapy', duration: '6 months', platform: 'Physiotherapy College' }
          ]
        },
        {
          phase: 'Clinical Training & Internship (Year 4-4.5)',
          timeline: 'Final Year',
          items: [
            { type: 'course', title: 'Cardiopulmonary Physiotherapy', duration: '6 months', platform: 'Physiotherapy College' },
            { type: 'internship', title: 'Hospital/Clinic Rotating Internship', duration: '6 months' },
            { type: 'project', title: 'Research Project', duration: '6 months' }
          ]
        },
        {
          phase: 'Licensing & Practice',
          timeline: 'After BPT',
          items: [
            { type: 'license', title: 'Registered Physiotherapist License', duration: 'State Council' },
            { type: 'job', title: 'Hospital/Sports Clinic/Private Practice', duration: 'Career Start' },
            { type: 'certification', title: 'Sports/Musculoskeletal Certification (Optional)', duration: '6-12 months' }
          ]
        }
      ],
      salary: '₹2.5-6 Lakhs (Entry) → ₹8-18 Lakhs (Experienced)',
      demand: 'High - 14% annual growth'
    },

    'Nutritionist/Dietitian': {
      title: 'Nutritionist/Dietitian Roadmap',
      duration: '3-4 years',
      overview: 'Provide dietary advice, develop nutrition plans, and promote healthy eating habits.',
      steps: [
        {
          phase: 'Foundation (Year 1-2)',
          timeline: 'First 2 Years',
          items: [
            { type: 'course', title: 'Human Nutrition', duration: '6 months', platform: 'University' },
            { type: 'course', title: 'Food Science & Technology', duration: '6 months', platform: 'NPTEL' },
            { type: 'course', title: 'Biochemistry & Physiology', duration: '1 year', platform: 'University' }
          ]
        },
        {
          phase: 'Core Nutrition (Year 2-3)',
          timeline: 'Years 2-3',
          items: [
            { type: 'course', title: 'Clinical Nutrition', duration: '6 months', platform: 'University' },
            { type: 'course', title: 'Public Health Nutrition', duration: '6 months', platform: 'Coursera' },
            { type: 'course', title: 'Therapeutic Diets', duration: '6 months', platform: 'University' },
            { type: 'skill', title: 'Dietary Assessment Methods', duration: '3 months' }
          ]
        },
        {
          phase: 'Internship & Specialization (Year 3-4)',
          timeline: 'Final Year',
          items: [
            { type: 'internship', title: 'Hospital/Clinic Internship', duration: '6 months' },
            { type: 'course', title: 'Sports Nutrition', duration: '3 months', platform: 'ISSN' },
            { type: 'project', title: 'Research Dissertation', duration: '6 months' }
          ]
        },
        {
          phase: 'Certification & Career',
          timeline: 'After Graduation',
          items: [
            { type: 'certification', title: 'Registered Dietitian (RD) Exam', duration: 'Preparation + Exam' },
            { type: 'job', title: 'Clinical Nutritionist/Sports Nutritionist', duration: 'Job Search' },
            { type: 'private_practice', title: 'Start Private Consultation', duration: 'Optional' }
          ]
        }
      ],
      salary: '₹2.5-6 Lakhs (Entry) → ₹8-20 Lakhs (Experienced)',
      demand: 'High - 13% annual growth'
    },

    // ==================== LAW & CIVIL SERVICES ROADMAPS ====================
    
    'Lawyer': {
      title: 'Lawyer Roadmap (LLB)',
      duration: '3-5 years',
      overview: 'Practice law, represent clients, and provide legal counsel in various fields.',
      steps: [
        {
          phase: 'Legal Education',
          timeline: 'After 12th or Graduation',
          items: [
            { type: 'exam', title: 'CLAT/AILET Entrance', duration: 'Preparation 6-12 months' },
            { type: 'degree', title: 'BA LLB (5 years) or LLB (3 years)', duration: '3-5 years', platform: 'Law College' }
          ]
        },
        {
          phase: 'Core Law Subjects',
          timeline: 'During LLB',
          items: [
            { type: 'course', title: 'Constitutional Law', duration: '1 year', platform: 'Law College' },
            { type: 'course', title: 'Contract Law', duration: '6 months', platform: 'Law College' },
            { type: 'course', title: 'Criminal Law', duration: '1 year', platform: 'Law College' },
            { type: 'course', title: 'Civil Procedure Code', duration: '6 months', platform: 'Law College' }
          ]
        },
        {
          phase: 'Internships & Specialization',
          timeline: 'Final Years',
          items: [
            { type: 'internship', title: 'Law Firm/Court Internships', duration: '6-12 months (cumulative)' },
            { type: 'specialization', title: 'Choose Field (Corporate/Criminal/Civil)', duration: 'Focus Area' },
            { type: 'skill', title: 'Legal Research & Drafting', duration: 'Ongoing' }
          ]
        },
        {
          phase: 'Bar Council & Practice',
          timeline: 'After LLB',
          items: [
            { type: 'exam', title: 'All India Bar Examination (AIBE)', duration: 'Preparation + Exam' },
            { type: 'license', title: 'Enroll with State Bar Council', duration: 'Registration' },
            { type: 'job', title: 'Start Practice or Join Law Firm', duration: 'Career Launch' }
          ]
        }
      ],
      salary: '₹2-6 Lakhs (Entry) → ₹10-40 Lakhs (Experienced) → Crores (Senior Advocate)',
      demand: 'High - Always in demand'
    },

    'Judge': {
      title: 'Judge Career Roadmap',
      duration: '8-15 years (after LLB)',
      overview: 'Preside over court proceedings, make legal decisions, and administer justice.',
      steps: [
        {
          phase: 'Legal Education & Practice (5-10 years)',
          timeline: 'Years 1-10',
          items: [
            { type: 'degree', title: 'LLB Degree', duration: '3-5 years', platform: 'Law College' },
            { type: 'license', title: 'Enroll with Bar Council', duration: 'After LLB' },
            { type: 'practice', title: 'Practice as Advocate', duration: '5-7 years minimum' },
            { type: 'experience', title: 'Gain Courtroom Experience', duration: 'Ongoing' }
          ]
        },
        {
          phase: 'Judicial Services Preparation',
          timeline: 'Years 11-12',
          items: [
            { type: 'exam', title: 'State Judicial Services Exam', duration: '1-2 years preparation' },
            { type: 'course', title: 'Substantive & Procedural Laws', duration: '6 months' },
            { type: 'practice', title: 'Mock Tests & Previous Papers', duration: 'Ongoing' }
          ]
        },
        {
          phase: 'Judicial Services Exam',
          timeline: 'Year 13',
          items: [
            { type: 'exam', title: 'Prelims Examination', duration: 'Screening Test' },
            { type: 'exam', title: 'Mains Examination', duration: 'Written Test' },
            { type: 'interview', title: 'Viva Voce/Personality Test', duration: 'Final Round' }
          ]
        },
        {
          phase: 'Training & Appointment',
          timeline: 'Year 14+',
          items: [
            { type: 'training', title: 'Judicial Academy Training', duration: '1 year' },
            { type: 'appointment', title: 'Civil Judge/Judicial Magistrate', duration: 'Initial Posting' },
            { type: 'promotion', title: 'Career Progression (Sessions Judge/HC Judge)', duration: '15-20 years' }
          ]
        }
      ],
      salary: '₹60,000-1 Lakh (Entry Judge) → ₹2-5 Lakhs+ (Senior Judge)',
      demand: 'Very High - Prestigious position'
    },

    'Legal Advisor': {
      title: 'Legal Advisor Roadmap',
      duration: '4-6 years',
      overview: 'Provide legal guidance to corporations, government bodies, and organizations on compliance and risk management.',
      steps: [
        {
          phase: 'Legal Education',
          timeline: 'Years 1-5',
          items: [
            { type: 'exam', title: 'CLAT/LSAT Entrance', duration: '6-12 months preparation' },
            { type: 'degree', title: 'BA LLB/LLB', duration: '3-5 years', platform: 'Recognized Law College' },
            { type: 'course', title: 'Corporate Law', duration: '1 year', platform: 'Law College' }
          ]
        },
        {
          phase: 'Specialization & Experience',
          timeline: 'Years 6-8',
          items: [
            { type: 'degree', title: 'LLM in Corporate/Business Law', duration: '2 years', platform: 'Law College' },
            { type: 'job', title: 'Junior Legal Counsel/Law Firm Associate', duration: '2-3 years' },
            { type: 'skill', title: 'Contract Drafting & Negotiation', duration: 'Ongoing' }
          ]
        },
        {
          phase: 'Advanced Qualifications',
          timeline: 'Years 9-10',
          items: [
            { type: 'certification', title: 'Certified Compliance Professional', duration: '6 months' },
            { type: 'course', title: 'Intellectual Property Law', duration: '6 months' },
            { type: 'course', title: 'Labor & Employment Law', duration: '6 months' }
          ]
        },
        {
          phase: 'Career Advancement',
          timeline: 'Years 11+',
          items: [
            { type: 'job', title: 'Legal Advisor/General Counsel', duration: 'Corporate/Government' },
            { type: 'networking', title: 'Industry Events & Conferences', duration: 'Ongoing' }
          ]
        }
      ],
      salary: '₹4-10 Lakhs (Entry) → ₹15-40 Lakhs+ (Senior Legal Advisor)',
      demand: 'High - 12% annual growth'
    },

    'Civil Services (IAS/IPS)': {
      title: 'Civil Services (IAS/IPS/IFS) Roadmap',
      duration: '1-3 years preparation',
      overview: 'Serve the nation as an administrative officer through UPSC Civil Services Examination.',
      steps: [
        {
          phase: 'Understanding the Exam',
          timeline: 'Months 1-3',
          items: [
            { type: 'course', title: 'UPSC Syllabus & Pattern Study', duration: '1 month' },
            { type: 'resource', title: 'NCERT Books (Class 6-12)', duration: '2 months' },
            { type: 'habit', title: 'Daily Newspaper Reading', duration: 'Ongoing' }
          ]
        },
        {
          phase: 'Prelims Preparation',
          timeline: 'Months 4-12',
          items: [
            { type: 'course', title: 'General Studies Paper 1 & 2', duration: '8 months', platform: 'Coaching/Self-study' },
            { type: 'course', title: 'Current Affairs Compilation', duration: 'Ongoing' },
            { type: 'practice', title: 'MCQs & Mock Tests', duration: '3 months' },
            { type: 'optional', title: 'Choose Optional Subject', duration: 'Decision' }
          ]
        },
        {
          phase: 'Mains Preparation',
          timeline: 'After Prelims Clear',
          items: [
            { type: 'course', title: 'Essay Writing Practice', duration: '2 months' },
            { type: 'course', title: 'Optional Subject Deep Dive', duration: '4-6 months' },
            { type: 'practice', title: 'Answer Writing Practice', duration: 'Ongoing' },
            { type: 'test', title: 'Mains Test Series', duration: '2 months' }
          ]
        },
        {
          phase: 'Interview & Final Stage',
          timeline: 'After Mains Clear',
          items: [
            { type: 'course', title: 'Personality Test Preparation', duration: '1-2 months' },
            { type: 'mock', title: 'Mock Interviews', duration: '1 month' },
            { type: 'daf', title: 'Detailed Application Form', duration: 'Careful Filling' }
          ]
        },
        {
          phase: 'Training',
          timeline: 'After Selection',
          items: [
            { type: 'training', title: 'LBSNAA Foundation Course', duration: '3-15 months depending on service' },
            { type: 'posting', title: 'District/State Posting', duration: 'Career begins' }
          ]
        }
      ],
      salary: '₹56,100 (Starting Basic Pay) + Allowances → ₹2.5 Lakhs+ (Senior Positions)',
      demand: 'Very High - Most prestigious career'
    },

    // ==================== EDUCATION & WRITING ROADMAPS ====================
    
    'Professor/Lecturer': {
      title: 'Professor/Lecturer Roadmap',
      duration: '5-7 years minimum',
      overview: 'Teach at college/university level and conduct research in your field of expertise.',
      steps: [
        {
          phase: 'Educational Qualification',
          timeline: 'Years 1-5',
          items: [
            { type: 'degree', title: "Bachelor's Degree in Subject", duration: '3 years', platform: 'University' },
            { type: 'degree', title: "Master's Degree in Subject", duration: '2 years', platform: 'University' },
            { type: 'exam', title: 'NET/SET Exam for Eligibility', duration: 'Preparation during Masters' }
          ]
        },
        {
          phase: 'PhD (Required for Professor)',
          timeline: 'Years 6-10',
          items: [
            { type: 'degree', title: 'PhD in Specialized Area', duration: '3-5 years', platform: 'University' },
            { type: 'research', title: 'Publish Research Papers', duration: 'Ongoing' },
            { type: 'conference', title: 'Present at Conferences', duration: '2-3 per year' }
          ]
        },
        {
          phase: 'Teaching Experience',
          timeline: 'During/After PhD',
          items: [
            { type: 'job', title: 'Assistant Professor/Lecturer Position', duration: '2-3 years' },
            { type: 'skill', title: 'Pedagogy & Teaching Methods', duration: 'Ongoing' }
          ]
        },
        {
          phase: 'Career Progression',
          timeline: 'Years 10+',
          items: [
            { type: 'promotion', title: 'Associate Professor', duration: 'After 8-10 years' },
            { type: 'promotion', title: 'Full Professor', duration: 'After 15+ years' }
          ]
        }
      ],
      salary: '₹50,000-80,000 (Assistant Prof) → ₹1-2 Lakhs (Professor)',
      demand: 'Moderate - Stable demand'
    },

    'Content Writer': {
      title: 'Content Writer Roadmap',
      duration: '6-12 months',
      overview: 'Create engaging written content for websites, blogs, marketing, and businesses.',
      steps: [
        {
          phase: 'Writing Fundamentals (2-4 months)',
          timeline: 'Months 1-4',
          items: [
            { type: 'course', title: 'English Grammar & Composition', duration: '2 months', platform: 'Coursera' },
            { type: 'course', title: 'Creative Writing', duration: '2 months', platform: 'Skillshare' },
            { type: 'skill', title: 'Reading Habits Development', duration: 'Ongoing' }
          ]
        },
        {
          phase: 'Content Types (4-8 months)',
          timeline: 'Months 5-12',
          items: [
            { type: 'course', title: 'Blog Writing', duration: '2 months', platform: 'Udemy' },
            { type: 'course', title: 'SEO Writing', duration: '2 months', platform: 'SEMrush' },
            { type: 'course', title: 'Copywriting', duration: '2 months', platform: 'Coursera' },
            { type: 'portfolio', title: 'Start Personal Blog/Medium', duration: 'Ongoing' }
          ]
        },
        {
          phase: 'Specialization (6-12 months)',
          timeline: 'Months 13-24',
          items: [
            { type: 'niche', title: 'Choose Niche (Tech/Health/Finance)', duration: 'Focus Area' },
            { type: 'skill', title: 'Research Skills', duration: '3 months' },
            { type: 'freelancing', title: 'Freelance Platforms (Upwork/Fiverr)', duration: 'Start applying' }
          ]
        },
        {
          phase: 'Professional Career',
          timeline: 'Months 25+',
          items: [
            { type: 'job', title: 'Content Writer Positions', duration: 'Job Search' },
            { type: 'networking', title: 'LinkedIn & Writing Communities', duration: 'Ongoing' }
          ]
        }
      ],
      salary: '₹2-4 Lakhs (Entry) → ₹6-15 Lakhs (Experienced)',
      demand: 'High - 15% annual growth'
    },
    
    'Journalist': {
      title: 'Journalist Career Roadmap',
      duration: '3-4 years',
      overview: 'Investigate, report, and communicate news and stories through various media platforms.',
      steps: [
        {
          phase: 'Education Foundation (2-3 years)',
          timeline: 'Years 1-3',
          items: [
            { type: 'degree', title: "Bachelor's in Journalism/Mass Communication", duration: '3 years', platform: 'University' },
            { type: 'course', title: 'News Writing & Reporting', duration: '6 months', platform: 'University' },
            { type: 'course', title: 'Media Ethics & Law', duration: '3 months', platform: 'University' }
          ]
        },
        {
          phase: 'Skill Development (1-2 years)',
          timeline: 'Years 4-5',
          items: [
            { type: 'skill', title: 'Video Journalism & Editing', duration: '3 months' },
            { type: 'course', title: 'Digital Journalism', duration: '3 months', platform: 'Poynter Institute' },
            { type: 'internship', title: 'Media House Internship', duration: '3-6 months' },
            { type: 'portfolio', title: 'Published Articles/Reports', duration: 'Ongoing' }
          ]
        },
        {
          phase: 'Specialization (2-3 years)',
          timeline: 'Years 6-8',
          items: [
            { type: 'specialization', title: 'Choose Beat (Politics/Sports/Business)', duration: 'Focus Area' },
            { type: 'skill', title: 'Investigative Journalism', duration: '6 months' },
            { type: 'networking', title: 'Build Industry Contacts', duration: 'Ongoing' }
          ]
        },
        {
          phase: 'Career Growth',
          timeline: 'Years 9+',
          items: [
            { type: 'job', title: 'Senior Reporter/Editor', duration: 'Career progression' },
            { type: 'recognition', title: 'Awards & Recognition', duration: 'Career achievement' }
          ]
        }
      ],
      salary: '₹2.5-6 Lakhs (Entry) → ₹8-20 Lakhs (Experienced)',
      demand: 'Moderate - 8% annual growth'
    },
    
    'Technical Writer': {
      title: 'Technical Writer Roadmap',
      duration: '1-2 years',
      overview: 'Create clear, concise documentation for technical products, software, and processes.',
      steps: [
        {
          phase: 'Foundation (3-6 months)',
          timeline: 'Months 1-6',
          items: [
            { type: 'course', title: 'Technical Communication', duration: '3 months', platform: 'Coursera' },
            { type: 'skill', title: 'Business Writing', duration: '2 months' },
            { type: 'tool', title: 'Microsoft Office Suite', duration: '1 month' }
          ]
        },
        {
          phase: 'Technical Skills (6-12 months)',
          timeline: 'Months 7-18',
          items: [
            { type: 'tool', title: 'MadCap Flare/Adobe FrameMaker', duration: '3 months' },
            { type: 'course', title: 'API Documentation', duration: '3 months', platform: 'Write the Docs' },
            { type: 'skill', title: 'Basic Programming Knowledge', duration: '3 months' },
            { type: 'portfolio', title: 'Sample Documentation Projects', duration: '3 months' }
          ]
        },
        {
          phase: 'Advanced & Specialization (12-18 months)',
          timeline: 'Months 19-36',
          items: [
            { type: 'certification', title: 'Certified Professional Technical Communicator', duration: '6 months' },
            { type: 'domain', title: 'Industry Specialization (IT/Pharma/Engineering)', duration: '1 year' },
            { type: 'tool', title: 'Git/GitHub for Documentation', duration: '2 months' }
          ]
        },
        {
          phase: 'Career Development',
          timeline: 'Months 37+',
          items: [
            { type: 'job', title: 'Technical Writer/Documentation Specialist', duration: 'Job Search' },
            { type: 'networking', title: 'Society for Technical Communication', duration: 'Ongoing' }
          ]
        }
      ],
      salary: '₹3-7 Lakhs (Entry) → ₹10-22 Lakhs (Experienced)',
      demand: 'High - 13% annual growth'
    },
  };

  const generateRoadmap = () => {
    if (selectedCareer && careerRoadmaps[selectedCareer]) {
      setRoadmap(careerRoadmaps[selectedCareer]);
    }
  };

  const getIcon = (type) => {
    const icons = {
      course: '📚',
      skill: '🔧',
      project: '💻',
      certification: '📜',
      internship: '🏢',
      portfolio: '🎨',
      networking: '👥',
      job: '💼'
    };
    return icons[type] || '📌';
  };

  const getTypeColor = (type) => {
    const colors = {
      course: 'bg-blue-100 text-blue-800',
      skill: 'bg-green-100 text-green-800',
      project: 'bg-purple-100 text-purple-800',
      certification: 'bg-yellow-100 text-yellow-800',
      internship: 'bg-indigo-100 text-indigo-800',
      portfolio: 'bg-pink-100 text-pink-800',
      networking: 'bg-teal-100 text-teal-800',
      job: 'bg-orange-100 text-orange-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8 text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-3">Career Roadmap Generator</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Get a personalized step-by-step roadmap to achieve your dream career with courses, skills, and timeline
              </p>
            </div>

            {/* Career Selection */}
            <Card className="bg-white mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Choose Your Dream Career</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {careerOptions.map((career) => (
                  <button
                    key={career}
                    onClick={() => setSelectedCareer(career)}
                    className={`p-4 rounded-xl border-2 text-center transition-all duration-200 ${
                      selectedCareer === career
                        ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                        : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="text-2xl mb-2">
                      {/* Engineering & Technology */}
                      {career === 'Computer Science Engineering' && '💻'}
                      {career === 'Mechanical Engineering' && '⚙️'}
                      {career === 'Electrical Engineering' && '⚡'}
                      {career === 'Civil Engineering' && '🏗️'}
                      {career === 'Electronics & Communication' && '📡'}
                      {career === 'Chemical Engineering' && '🧪'}
                      {career === 'Biotechnology' && '🧬'}
                      {career === 'Biomedical Engineering' && '🔬'}
                      {career === 'Aerospace Engineering' && '✈️'}
                      {career === 'Automobile Engineering' && '🚗'}
                      
                      {/* Science & Research */}
                      {career === 'Data Scientist' && '📊'}
                      {career === 'Artificial Intelligence Engineer' && '🤖'}
                      {career === 'Machine Learning Engineer' && '🧠'}
                      {career === 'Environmental Scientist' && '🌍'}
                      {career === 'Physics Researcher' && '⚛️'}
                      {career === 'Chemistry Researcher' && '🧬'}
                      {career === 'Mathematics Professor' && '📐'}
                      {career === 'Clinical Psychologist' && '🧠'}
                      
                      {/* Medical & Healthcare */}
                      {career === 'MBBS Doctor' && '👨‍⚕️'}
                      {career === 'Dentist (BDS)' && '🦷'}
                      {career === 'Pharmacist' && '💊'}
                      {career === 'Nurse' && '👩‍⚕️'}
                      {career === 'Physiotherapist' && '💪'}
                      {career === 'Nutritionist/Dietitian' && '🥗'}
                      
                      {/* Management & Commerce */}
                      {career === 'Software Engineer' && '👨‍💻'}
                      {career === 'Financial Analyst' && '📈'}
                      {career === 'Chartered Accountant' && '💰'}
                      {career === 'MBA Professional' && '💼'}
                      {career === 'Digital Marketer' && '📱'}
                      {career === 'Business Analyst' && '📊'}
                      {career === 'Investment Banker' && '🏦'}
                      
                      {/* Design & Creative */}
                      {career === 'UX/UI Designer' && '🎨'}
                      {career === 'Graphic Designer' && '🖌️'}
                      {career === 'Fashion Designer' && '👗'}
                      {career === 'Interior Designer' && '🛋️'}
                      {career === 'Animator' && '🎬'}
                      {career === 'Video Editor' && '✂️'}
                      
                      {/* Law & Civil Services */}
                      {career === 'Lawyer' && '⚖️'}
                      {career === 'Judge' && '👨‍⚖️'}
                      {career === 'Civil Services (IAS/IPS)' && '🏛️'}
                      {career === 'Legal Advisor' && '📜'}
                      
                      {/* Education & Writing */}
                      {career === 'Professor/Lecturer' && '👨‍🏫'}
                      {career === 'Content Writer' && '✍️'}
                      {career === 'Journalist' && '📰'}
                      {career === 'Technical Writer' && '📝'}
                    </div>
                    <div className="font-medium">{career}</div>
                  </button>
                ))}
              </div>
              
              <Button
                variant="primary"
                onClick={generateRoadmap}
                disabled={!selectedCareer}
                className="w-full py-3"
              >
                Generate My Roadmap
              </Button>
            </Card>

            {/* Generated Roadmap */}
            {roadmap && (
              <div className="space-y-8">
                {/* Overview */}
                <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">{roadmap.title}</h2>
                      <p className="text-gray-700 text-lg">{roadmap.overview}</p>
                    </div>
                    <div className="mt-4 md:mt-0 text-right">
                      <div className="text-2xl font-bold text-indigo-600">{roadmap.duration}</div>
                      <div className="text-gray-600">Total Duration</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-xl">
                      <h3 className="font-semibold text-gray-900 mb-2">Salary Range</h3>
                      <p className="text-indigo-600 font-medium">{roadmap.salary}</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl">
                      <h3 className="font-semibold text-gray-900 mb-2">Market Demand</h3>
                      <p className="text-green-600 font-medium">{roadmap.demand}</p>
                    </div>
                  </div>
                </Card>

                {/* Roadmap Steps */}
                <div className="space-y-6">
                  {roadmap.steps.map((step, index) => (
                    <Card key={index} className="bg-white">
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{step.phase}</h3>
                          <p className="text-gray-600">{step.timeline}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-500">Duration</div>
                          <div className="font-semibold text-gray-900">
                            {step.items.reduce((total, item) => {
                              const duration = item.duration;
                              if (duration.includes('month')) {
                                return total + parseInt(duration);
                              }
                              return total;
                            }, 0)} months
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        {step.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                            <div className="text-2xl mt-1">{getIcon(item.type)}</div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(item.type)}`}>
                                  {item.type.toUpperCase()}
                                </span>
                                <span className="text-sm text-gray-500">{item.duration}</span>
                              </div>
                              <h4 className="font-medium text-gray-900">{item.title}</h4>
                              {item.platform && (
                                <p className="text-sm text-gray-600">Platform: {item.platform}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    variant="primary" 
                    onClick={() => navigate('/counsellor-profile')}
                    className="flex-1 py-3"
                  >
                    🗣️ Talk to Career Expert
                  </Button>
                  <Button 
                    variant="secondary" 
                    onClick={() => navigate('/aptitude-test')}
                    className="flex-1 py-3"
                  >
                    🧪 Take Aptitude Test
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => window.print()}
                    className="flex-1 py-3"
                  >
                    📄 Download Roadmap
                  </Button>
                </div>
              </div>
            )}

            {/* Additional Resources */}
            {!roadmap && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <Card className="text-center">
                  <div className="text-4xl mb-4">🎯</div>
                  <h3 className="text-xl font-semibold mb-2">Personalized Guidance</h3>
                  <p className="text-gray-600">Get roadmaps tailored to your interests and goals</p>
                </Card>
                <Card className="text-center">
                  <div className="text-4xl mb-4">📅</div>
                  <h3 className="text-xl font-semibold mb-2">Realistic Timeline</h3>
                  <p className="text-gray-600">Structured learning paths with achievable milestones</p>
                </Card>
                <Card className="text-center">
                  <div className="text-4xl mb-4">💰</div>
                  <h3 className="text-xl font-semibold mb-2">Career Growth</h3>
                  <p className="text-gray-600">Understand salary potential and market demand</p>
                </Card>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CourseRoadmap;