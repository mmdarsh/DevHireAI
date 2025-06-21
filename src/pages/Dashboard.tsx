import React from 'react';
import { Button } from "@material-tailwind/react";
import ResumeUploadModal from '../components/ResumeUploadModal';

const Dashboard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top right corner button - positioned below navbar */}
      <div className="absolute top-20 right-4 z-10">
        <Button
          color="blue"
          size="lg"
          onClick={openModal}
          className="flex items-center gap-2 shadow-lg hover:shadow-xl"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          Upload Resume
        </Button>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            DevHireAI Dashboard
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Upload your resume and let the AI do the job for you
          </p>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-600 mb-4">
            Ready to take the next step in your career?
          </p>
          <p className="text-sm text-gray-500">
            Click the upload button in the top right corner to get started
          </p>
        </div>
      </div>

      <ResumeUploadModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Dashboard;
