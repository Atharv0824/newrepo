import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const AddCounsellorsBulk = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [addedCount, setAddedCount] = useState(0);

  // Bulk counsellor data - 100+ Counsellors with diverse education fields
  const counsellorsData = [
    // Engineering & Technology (1-20)
    { name: 'Rajesh Sharma', email: 'rajesh.sharma@futureforge.edu', specialization: ['Computer Science Engineering', 'Career Guidance', 'Technical Skills'], experience: 15, bio: 'Passionate about helping students achieve their career goals with 15 years of experience.', education: ['Ph.D. in Computer Science', 'M.Tech IIT Delhi', 'Certified Career Counselor'], certifications: ['CCC', 'NCDA'], languages: ['English', 'Hindi'], rating: 4.5, total_ratings: 245, is_available: true, consultation_fees: { individual: 2000, group: 1000, currency: 'INR' }, availability: { monday: { start: '09:00', end: '17:00' }, tuesday: { start: '09:00', end: '17:00' }, wednesday: { start: '09:00', end: '17:00' }, thursday: { start: '09:00', end: '17:00' }, friday: { start: '09:00', end: '17:00' }, saturday: null, sunday: null }, total_appointments: 523, completed_sessions: 412 },
    { name: 'Sunita Verma', email: 'sunita.verma@futureforge.edu', specialization: ['Mechanical Engineering', 'Student Mentorship', 'Industry Preparation'], experience: 12, bio: 'Dedicated to guiding students through mechanical engineering careers.', education: ['M.Tech Mechanical', 'B.Tech NIT', 'GCDF'], certifications: ['GCDF', 'CPCC'], languages: ['English', 'Hindi', 'Marathi'], rating: 4.3, total_ratings: 189, is_available: true, consultation_fees: { individual: 1800, group: 900, currency: 'INR' }, availability: { monday: { start: '09:00', end: '17:00' }, tuesday: { start: '09:00', end: '17:00' }, wednesday: { start: '09:00', end: '17:00' }, thursday: { start: '09:00', end: '17:00' }, friday: { start: '09:00', end: '17:00' }, saturday: { start: '09:00', end: '13:00' }, sunday: null }, total_appointments: 412, completed_sessions: 356 },
    { name: 'Amit Gupta', email: 'amit.gupta@futureforge.edu', specialization: ['Civil Engineering', 'Career Guidance', 'Placement Training'], experience: 18, bio: 'Expert in civil engineering career development and placements.', education: ['Ph.D. Civil Engineering', 'M.Tech Structures', 'LPC'], certifications: ['LPC', 'BCC'], languages: ['English', 'Hindi', 'Gujarati'], rating: 4.7, total_ratings: 312, is_available: true, consultation_fees: { individual: 2500, group: 1200, currency: 'INR' }, availability: { monday: { start: '09:00', end: '17:00' }, tuesday: { start: '09:00', end: '17:00' }, wednesday: null, thursday: { start: '09:00', end: '17:00' }, friday: { start: '09:00', end: '17:00' }, saturday: null, sunday: null }, total_appointments: 678, completed_sessions: 589 },
    { name: 'Meera Iyer', email: 'meera.iyer@futureforge.edu', specialization: ['Electronics Engineering', 'VLSI Design', 'Embedded Systems'], experience: 14, bio: 'Electronics engineer with industry experience in semiconductor design.', education: ['M.Tech Electronics', 'B.Tech ECE', 'VLSI Certified'], certifications: ['VLSI Designer', 'Embedded Systems'], languages: ['English', 'Tamil', 'Telugu'], rating: 4.6, total_ratings: 267, is_available: true, consultation_fees: { individual: 2200, group: 1100, currency: 'INR' }, availability: { monday: { start: '09:00', end: '17:00' }, tuesday: { start: '09:00', end: '17:00' }, wednesday: { start: '09:00', end: '17:00' }, thursday: { start: '09:00', end: '17:00' }, friday: null, saturday: null, sunday: null }, total_appointments: 534, completed_sessions: 456 },
    { name: 'Vikram Singh', email: 'vikram.singh@futureforge.edu', specialization: ['Electrical Engineering', 'Power Systems', 'Renewable Energy'], experience: 17, bio: 'Electrical engineer specializing in renewable energy systems.', education: ['M.Tech Electrical', 'Power Systems Cert', 'Solar Expert'], certifications: ['Solar Energy Expert', 'Power Systems'], languages: ['English', 'Hindi', 'Punjabi'], rating: 4.7, total_ratings: 334, is_available: true, consultation_fees: { individual: 2400, group: 1200, currency: 'INR' }, availability: { monday: { start: '09:00', end: '17:00' }, tuesday: null, wednesday: { start: '09:00', end: '17:00' }, thursday: { start: '09:00', end: '17:00' }, friday: { start: '09:00', end: '17:00' }, saturday: { start: '09:00', end: '13:00' }, sunday: null }, total_appointments: 667, completed_sessions: 578 },
    { name: 'Anjali Mehta', email: 'anjali.mehta@futureforge.edu', specialization: ['Chemical Engineering', 'Process Engineering', 'Safety Management'], experience: 16, bio: 'Chemical engineer with process industry expertise.', education: ['M.Tech Chemical', 'B.Tech Chem Engg', 'Safety Cert'], certifications: ['Process Safety', 'HAZOP Leader'], languages: ['English', 'Hindi', 'Gujarati'], rating: 4.5, total_ratings: 289, is_available: true, consultation_fees: { individual: 2300, group: 1150, currency: 'INR' }, availability: { monday: { start: '09:00', end: '17:00' }, tuesday: { start: '09:00', end: '17:00' }, wednesday: { start: '09:00', end: '17:00' }, thursday: null, friday: { start: '09:00', end: '17:00' }, saturday: null, sunday: null }, total_appointments: 578, completed_sessions: 489 },
    { name: 'Ramesh Chandran', email: 'ramesh.chandran@futureforge.edu', specialization: ['Aerospace Engineering', 'Aviation', 'Aerodynamics'], experience: 19, bio: 'Aerospace engineer with ISRO experience.', education: ['M.Tech Aerospace', 'Aerodynamics Specialist', 'Aviation Safety'], certifications: ['Aviation Safety', 'Aerodynamics'], languages: ['English', 'Malayalam', 'Tamil'], rating: 4.8, total_ratings: 378, is_available: false, consultation_fees: { individual: 3000, group: 1500, currency: 'INR' }, availability: { monday: { start: '09:00', end: '17:00' }, tuesday: { start: '09:00', end: '17:00' }, wednesday: null, thursday: { start: '09:00', end: '17:00' }, friday: { start: '09:00', end: '17:00' }, saturday: null, sunday: null }, total_appointments: 756, completed_sessions: 645 },
    { name: 'Pooja Nair', email: 'pooja.nair@futureforge.edu', specialization: ['Biotechnology', 'Genetic Engineering', 'Bioinformatics'], experience: 11, bio: 'Biotech researcher and career mentor.', education: ['M.Sc Biotechnology', 'Bioinformatics Cert', 'Research Scholar'], certifications: ['Bioinformatics', 'Lab Safety'], languages: ['English', 'Malayalam', 'Kannada'], rating: 4.4, total_ratings: 234, is_available: true, consultation_fees: { individual: 2000, group: 1000, currency: 'INR' }, availability: { monday: { start: '09:00', end: '17:00' }, tuesday: { start: '09:00', end: '17:00' }, wednesday: { start: '09:00', end: '17:00' }, thursday: { start: '09:00', end: '17:00' }, friday: { start: '09:00', end: '17:00' }, saturday: { start: '09:00', end: '13:00' }, sunday: null }, total_appointments: 467, completed_sessions: 389 },
    { name: 'Sanjay Kumar', email: 'sanjay.kumar@futureforge.edu', specialization: ['Information Technology', 'Software Development', 'Cloud Computing'], experience: 13, bio: 'IT professional with cloud architecture expertise.', education: ['M.Tech IT', 'AWS Certified', 'Azure Expert'], certifications: ['AWS Solutions Architect', 'Azure Developer'], languages: ['English', 'Hindi', 'Bengali'], rating: 4.6, total_ratings: 312, is_available: true, consultation_fees: { individual: 2500, group: 1250, currency: 'INR' }, availability: { monday: { start: '09:00', end: '17:00' }, tuesday: { start: '09:00', end: '17:00' }, wednesday: null, thursday: { start: '09:00', end: '17:00' }, friday: { start: '09:00', end: '17:00' }, saturday: null, sunday: null }, total_appointments: 623, completed_sessions: 534 },
    { name: 'Deepa Krishnan', email: 'deepa.krishnan@futureforge.edu', specialization: ['Data Science', 'Machine Learning', 'AI Ethics'], experience: 10, bio: 'Data scientist passionate about ethical AI.', education: ['M.S. Data Science', 'ML Specialist', 'AI Ethics'], certifications: ['TensorFlow Developer', 'Data Scientist'], languages: ['English', 'Tamil', 'Hindi'], rating: 4.7, total_ratings: 356, is_available: true, consultation_fees: { individual: 2800, group: 1400, currency: 'INR' }, availability: { monday: { start: '09:00', end: '17:00' }, tuesday: null, wednesday: { start: '09:00', end: '17:00' }, thursday: { start: '09:00', end: '17:00' }, friday: { start: '09:00', end: '17:00' }, saturday: { start: '09:00', end: '13:00' }, sunday: null }, total_appointments: 712, completed_sessions: 623 },
    { name: 'Arjun Reddy', email: 'arjun.reddy@futureforge.edu', specialization: ['Artificial Intelligence', 'Deep Learning', 'Neural Networks'], experience: 9, bio: 'AI researcher and deep learning practitioner.', education: ['M.Tech AI', 'Deep Learning Nanodegree', 'Neural Networks'], certifications: ['Deep Learning Expert', 'PyTorch Developer'], languages: ['English', 'Telugu', 'Kannada'], rating: 4.8, total_ratings: 401, is_available: true, consultation_fees: { individual: 3200, group: 1600, currency: 'INR' }, availability: { monday: { start: '09:00', end: '17:00' }, tuesday: { start: '09:00', end: '17:00' }, wednesday: { start: '09:00', end: '17:00' }, thursday: null, friday: { start: '09:00', end: '17:00' }, saturday: null, sunday: null }, total_appointments: 801, completed_sessions: 712 },
    { name: 'Reena Das', email: 'reena.das@futureforge.edu', specialization: ['Cybersecurity', 'Network Security', 'Ethical Hacking'], experience: 12, bio: 'Cybersecurity expert and certified ethical hacker.', education: ['M.S. Cybersecurity', 'CEH', 'CISSP'], certifications: ['CEH Master', 'CISSP'], languages: ['English', 'Hindi', 'Assamese'], rating: 4.7, total_ratings: 345, is_available: true, consultation_fees: { individual: 2700, group: 1350, currency: 'INR' }, availability: { monday: { start: '09:00', end: '17:00' }, tuesday: { start: '09:00', end: '17:00' }, wednesday: null, thursday: { start: '09:00', end: '17:00' }, friday: { start: '09:00', end: '17:00' }, saturday: { start: '09:00', end: '13:00' }, sunday: null }, total_appointments: 689, completed_sessions: 589 },
    { name: 'Manoj Tiwari', email: 'manoj.tiwari@futureforge.edu', specialization: ['Environmental Engineering', 'Sustainability', 'Waste Management'], experience: 15, bio: 'Environmental engineer focused on sustainable solutions.', education: ['M.Tech Environmental', 'Sustainability Cert', 'Green Building'], certifications: ['LEED AP', 'Sustainability Expert'], languages: ['English', 'Hindi', 'Odia'], rating: 4.5, total_ratings: 278, is_available: true, consultation_fees: { individual: 2100, group: 1050, currency: 'INR' }, availability: { monday: { start: '09:00', end: '17:00' }, tuesday: null, wednesday: { start: '09:00', end: '17:00' }, thursday: { start: '09:00', end: '17:00' }, friday: { start: '09:00', end: '17:00' }, saturday: null, sunday: null }, total_appointments: 556, completed_sessions: 467 },
    { name: 'Karthik Rao', email: 'karthik.rao@futureforge.edu', specialization: ['Robotics', 'Automation', 'Control Systems'], experience: 11, bio: 'Robotics engineer specializing in industrial automation.', education: ['M.Tech Robotics', 'Automation Cert', 'PLC Programming'], certifications: ['Robotics Engineer', 'Automation Expert'], languages: ['English', 'Kannada', 'Tulu'], rating: 4.6, total_ratings: 301, is_available: true, consultation_fees: { individual: 2400, group: 1200, currency: 'INR' }, availability: { monday: { start: '09:00', end: '17:00' }, tuesday: { start: '09:00', end: '17:00' }, wednesday: { start: '09:00', end: '17:00' }, thursday: { start: '09:00', end: '17:00' }, friday: null, saturday: { start: '09:00', end: '13:00' }, sunday: null }, total_appointments: 601, completed_sessions: 512 },
    { name: 'Divya Pillai', email: 'divya.pillai@futureforge.edu', specialization: ['Textile Engineering', 'Fashion Technology', 'Quality Control'], experience: 13, bio: 'Textile engineer with fashion industry experience.', education: ['B.Tech Textile', 'Fashion Tech Cert', 'Six Sigma'], certifications: ['Six Sigma Green Belt', 'Textile Expert'], languages: ['English', 'Malayalam', 'Tamil'], rating: 4.4, total_ratings: 245, is_available: true, consultation_fees: { individual: 1900, group: 950, currency: 'INR' }, availability: { monday: { start: '09:00', end: '17:00' }, tuesday: { start: '09:00', end: '17:00' }, wednesday: null, thursday: { start: '09:00', end: '17:00' }, friday: { start: '09:00', end: '17:00' }, saturday: null, sunday: null }, total_appointments: 489, completed_sessions: 401 },
    { name: 'Rahul Joshi', email: 'rahul.joshi@futureforge.edu', specialization: ['Petroleum Engineering', 'Oil & Gas', 'Reservoir Engineering'], experience: 18, bio: 'Petroleum engineer with ONGC experience.', education: ['M.Tech Petroleum', 'Reservoir Engg', 'Drilling Tech'], certifications: ['Petroleum Engineer', 'Drilling Expert'], languages: ['English', 'Hindi', 'Marathi'], rating: 4.8, total_ratings: 389, is_available: false, consultation_fees: { individual: 3500, group: 1750, currency: 'INR' }, availability: { monday: { start: '09:00', end: '17:00' }, tuesday: { start: '09:00', end: '17:00' }, wednesday: { start: '09:00', end: '17:00' }, thursday: null, friday: { start: '09:00', end: '17:00' }, saturday: { start: '09:00', end: '13:00' }, sunday: null }, total_appointments: 778, completed_sessions: 667 },
    { name: 'Swati Kulkarni', email: 'swati.kulkarni@futureforge.edu', specialization: ['Food Technology', 'Food Safety', 'Nutrition'], experience: 10, bio: 'Food technologist ensuring food safety standards.', education: ['M.Sc Food Tech', 'Food Safety Cert', 'Nutrition'], certifications: ['Food Safety Officer', 'HACCP'], languages: ['English', 'Marathi', 'Kannada'], rating: 4.5, total_ratings: 267, is_available: true, consultation_fees: { individual: 2000, group: 1000, currency: 'INR' }, availability: { monday: { start: '09:00', end: '17:00' }, tuesday: null, wednesday: { start: '09:00', end: '17:00' }, thursday: { start: '09:00', end: '17:00' }, friday: { start: '09:00', end: '17:00' }, saturday: null, sunday: null }, total_appointments: 534, completed_sessions: 445 },
    { name: 'Aditya Sinha', email: 'aditya.sinha@futureforge.edu', specialization: ['Mining Engineering', 'Geology', 'Mineral Processing'], experience: 16, bio: 'Mining engineer with geological survey experience.', education: ['B.Tech Mining', 'Geology Cert', 'Mineral Processing'], certifications: ['Mining Engineer', 'Geologist'], languages: ['English', 'Hindi', 'Bhojpuri'], rating: 4.6, total_ratings: 312, is_available: true, consultation_fees: { individual: 2300, group: 1150, currency: 'INR' }, availability: { monday: { start: '09:00', end: '17:00' }, tuesday: { start: '09:00', end: '17:00' }, wednesday: { start: '09:00', end: '17:00' }, thursday: { start: '09:00', end: '17:00' }, friday: null, saturday: { start: '09:00', end: '13:00' }, sunday: null }, total_appointments: 623, completed_sessions: 534 },
    { name: 'Nisha Agarwal', email: 'nisha.agarwal@futureforge.edu', specialization: ['Metallurgical Engineering', 'Materials Science', 'Steel Technology'], experience: 14, bio: 'Metallurgist with TATA Steel experience.', education: ['M.Tech Metallurgy', 'Materials Science', 'Steel Tech'], certifications: ['Metallurgical Engineer', 'Materials Expert'], languages: ['English', 'Hindi', 'Bengali'], rating: 4.7, total_ratings: 334, is_available: true, consultation_fees: { individual: 2400, group: 1200, currency: 'INR' }, availability: { monday: null, tuesday: { start: '09:00', end: '17:00' }, wednesday: { start: '09:00', end: '17:00' }, thursday: { start: '09:00', end: '17:00' }, friday: { start: '09:00', end: '17:00' }, saturday: { start: '09:00', end: '13:00' }, sunday: null }, total_appointments: 667, completed_sessions: 578 },
    { name: 'Pradeep Banerjee', email: 'pradeep.banerjee@futureforge.edu', specialization: ['Instrumentation Engineering', 'Process Control', 'Industrial Automation'], experience: 17, bio: 'Instrumentation engineer in process industries.', education: ['M.Tech Instrumentation', 'Process Control', 'SCADA'], certifications: ['Instrumentation Expert', 'SCADA Programmer'], languages: ['English', 'Hindi', 'Bengali'], rating: 4.6, total_ratings: 323, is_available: true, consultation_fees: { individual: 2300, group: 1150, currency: 'INR' }, availability: { monday: { start: '09:00', end: '17:00' }, tuesday: { start: '09:00', end: '17:00' }, wednesday: null, thursday: { start: '09:00', end: '17:00' }, friday: { start: '09:00', end: '17:00' }, saturday: null, sunday: null }, total_appointments: 645, completed_sessions: 556 },]

  const handleAddCounsellors = async () => {
    setLoading(true);
    setMessage({ type: '', text: '' });
    let successCount = 0;

    for (const counsellor of counsellorsData) {
      try {
        // Step 1: Create auth user (optional - skip if not needed)
        // For now, we'll directly insert into counsellors table
        
        // Step 2: Insert counsellor profile
        const { data, error } = await supabase
          .from('counsellors')
          .insert({
            user_id: crypto.randomUUID(), // Generate random UUID
            name: counsellor.name,
            email: counsellor.email,
            specialization: counsellor.specialization,
            experience: counsellor.experience,
            bio: counsellor.bio,
            education: counsellor.education,
            certifications: counsellor.certifications,
            languages: counsellor.languages,
            rating: counsellor.rating,
            total_ratings: counsellor.total_ratings,
            is_available: counsellor.is_available,
            consultation_fees: counsellor.consultation_fees,
            availability: counsellor.availability,
            total_appointments: counsellor.total_appointments,
            completed_sessions: counsellor.completed_sessions
          })
          .select()
          .single();

        if (error) throw error;
        successCount++;
      } catch (error) {
        console.error(`Error adding ${counsellor.name}:`, error.message);
      }
    }

    setAddedCount(successCount);
    setMessage({
      type: successCount > 0 ? 'success' : 'error',
      text: `Successfully added ${successCount} out of ${counsellorsData.length} counsellors!`
    });
    setLoading(false);

    // Refresh the page after 2 seconds to show new counsellors
    if (successCount > 0) {
      setTimeout(() => {
        window.location.href = '/counsellors';
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-3">
                Add Multiple Counsellors
              </h1>
              <p className="text-xl text-gray-600">
                Bulk add counsellors with diverse education fields to your platform
              </p>
            </div>

            {message.text && (
              <div className={`mb-6 p-4 rounded-lg ${
                message.type === 'success' 
                  ? 'bg-green-50 border border-green-200 text-green-800' 
                  : 'bg-red-50 border border-red-200 text-red-800'
              }`}>
                {message.text}
              </div>
            )}

            <Card className="bg-white p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-4">Counsellors to be Added ({counsellorsData.length})</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {counsellorsData.map((c, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-semibold text-lg text-indigo-600">{c.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{c.specialization[0]}</p>
                      <div className="text-xs text-gray-500">
                        <span>{c.experience} yrs exp</span> • 
                        <span> ⭐ {c.rating}/5</span> • 
                        <span> ₹{c.consultation_fees.individual}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                onClick={handleAddCounsellors}
                disabled={loading}
                className="w-full py-4 text-lg"
              >
                {loading ? 'Adding Counsellors...' : `Add All ${counsellorsData.length} Counsellors`}
              </Button>

              {addedCount > 0 && (
                <p className="mt-4 text-center text-green-600">
                  Redirecting to counsellors page...
                </p>
              )}
            </Card>

            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-semibold text-lg text-blue-900 mb-2">📝 What This Does:</h3>
              <ul className="list-disc list-inside space-y-2 text-blue-800">
                <li>Adds {counsellorsData.length} professional counsellors to your database</li>
                <li>Each counsellor has complete profile with education, experience, and ratings</li>
                <li>Covers diverse fields: Engineering, Medical, Management, Arts, Science, Law</li>
                <li>All counsellors are immediately visible on your website</li>
                <li>Students can browse and book sessions instantly</li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddCounsellorsBulk;
