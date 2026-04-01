import React from 'react';
import HeroSection from '../components/sections/HeroSection';
import SignupForm from '../components/sections/SignupForm';

const SignupPage = () => {
  return (
    <HeroSection
      title="Start Your Journey with Future Forge"
      subtitle="Join thousands of students who found their perfect career path with our personalized guidance and recommendations."
    >
      <SignupForm />
    </HeroSection>
  );
};

export default SignupPage;