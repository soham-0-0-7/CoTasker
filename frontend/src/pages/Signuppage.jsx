import React from 'react';
import Contributorslabel from '../componentsSignUp/Contributorslabel';
import Cotaskerlabel from '../componentsSignUp/Cotaskerlabel';
import Signupform from '../componentsSignUp/Signupform';

function Signuppage() {
  return (
    <div 
      className="min-h-screen flex items-center justify-center p-6 relative bg-cover bg-center"
      style={{
        backgroundImage: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)"
      }}
    >
      {/* Glassmorphic Blur Effect for a Sleek Look */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-lg rounded-lg z-0"></div>

      {/* Centered Main Content */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-10 max-w-6xl w-full px-4">
        
        {/* Left Side - CoTasker Label */}
        <Cotaskerlabel/>

        {/* Middle - Signup Form */}
        <Signupform/>

        {/* Right Side - Contributors Label */}
        <Contributorslabel/>
      </div>
    </div>
  );
}

export default Signuppage;
