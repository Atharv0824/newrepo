import React from 'react';
import HeroSection from '../components/sections/HeroSection';
import LoginForm from '../components/sections/LoginForm';

const LoginPage = () => {
  return (
    <HeroSection
      title="Shape Your Future with Future Forge"
      subtitle="Get personalized college recommendations and career guidance based on your academic profile and aspirations."
    >
      <LoginForm />
    </HeroSection>
  );
};

export default LoginPage;