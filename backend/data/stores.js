// In-memory data stores
const users = new Map();
const students = new Map();
const colleges = new Map();
const counsellors = new Map();
const appointments = new Map();

// Sample data
const sampleColleges = [
  {
    id: '1',
    name: 'IIT Bombay',
    location: { city: 'Mumbai', state: 'Maharashtra', country: 'India' },
    stream: 'Engineering',
    fees: 200000,
    rating: 4.8,
    description: 'Indian Institute of Technology Bombay',
    website: 'https://www.iitb.ac.in',
    contact: { email: 'admissions@iitb.ac.in' },
    establishedYear: 1958,
    isFeatured: true
  },
  {
    id: '2',
    name: 'AIIMS Delhi',
    location: { city: 'Delhi', state: 'Delhi', country: 'India' },
    stream: 'Medical',
    fees: 150000,
    rating: 4.9,
    description: 'All India Institute of Medical Sciences',
    website: 'https://www.aiims.edu',
    contact: { email: 'admissions@aiims.edu' },
    establishedYear: 1956,
    isFeatured: true
  },
  {
    id: '3',
    name: 'IIM Ahmedabad',
    location: { city: 'Ahmedabad', state: 'Gujarat', country: 'India' },
    stream: 'Management',
    fees: 250000,
    rating: 4.7,
    description: 'Indian Institute of Management Ahmedabad',
    website: 'https://www.iima.ac.in',
    contact: { email: 'admissions@iima.ac.in' },
    establishedYear: 1961,
    isFeatured: true
  }
];

// Initialize sample data
sampleColleges.forEach(college => {
  colleges.set(college.id, college);
});

module.exports = {
  users,
  students,
  colleges,
  counsellors,
  appointments
};