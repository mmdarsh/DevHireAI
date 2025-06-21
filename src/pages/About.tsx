import React from 'react';

const About: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">About DevHireAI</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-gray-700 mb-6">
            DevHireAI is a cutting-edge platform designed to revolutionize the way companies hire developers 
            and how developers find their dream jobs. We leverage artificial intelligence to create the perfect 
            match between talent and opportunity.
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">What We Do</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">For Companies</h3>
              <p className="text-blue-700">
                Find the perfect developers for your team using our AI-powered matching system. 
                Save time and resources while ensuring quality hires.
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-green-800 mb-2">For Developers</h3>
              <p className="text-green-700">
                Discover opportunities that match your skills, experience, and career goals. 
                Connect with companies that value your expertise.
              </p>
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Technology</h2>
          <p className="text-gray-700 mb-4">
            Built with modern technologies including React, TypeScript, and Material Tailwind CSS, 
            our platform provides a seamless and intuitive user experience.
          </p>
          
          <div className="flex gap-2 flex-wrap">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              React
            </span>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              TypeScript
            </span>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              Material Tailwind
            </span>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              AI/ML
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 