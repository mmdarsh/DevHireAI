import React, { useState, useEffect } from 'react';
import { Button, Card, CardHeader, CardBody, Typography } from "@material-tailwind/react";
import ResumeUploadModal from '../components/ResumeUploadModal';
import api from '../config/axios';
import { API_ENDPOINTS } from '../config/endpoints';

interface ResumeData {
  id: number;
  name: string;
  role: string;
  extractedText: string;
}

const Dashboard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resumes, setResumes] = useState<ResumeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const openModal = () => {
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

  const fetchResumes = async () => {
    try {
      setLoading(true);
      setError('');
      const baseUrl = import.meta.env.VITE_APP_NET_URL;
      const resumeEndpoint = API_ENDPOINTS.RESUME_INFO;
      const url = `${baseUrl}${resumeEndpoint}`;
      
      const response = await api.get(url);
      setResumes(response.data);
    } catch (error: any) {
      console.error('Error fetching resumes:', error);
      setError('Failed to load resume data. Please try again.');
      // Fallback to sample data for development
      setResumes([
        {
          id: 1,
          name: "John Doe",
          role: "Frontend Developer",
          extractedText: "Experienced frontend developer with 5+ years..."
        },
        {
          id: 2,
          name: "Jane Smith",
          role: "Backend Developer",
          extractedText: "Senior backend developer specializing in Node.js..."
        },
        {
          id: 3,
          name: "Mike Johnson",
          role: "Full Stack Developer",
          extractedText: "Full stack developer with expertise in React and Python..."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const getStatusStyles = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  }

  const truncateText = (text: string, maxLength: number = 50) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const handleClick = async() => {
    const baseUrl = import.meta.env.VITE_APP_PY_URL;
    const resumeEndpoint = API_ENDPOINTS.COMPARE;
    const url = `${baseUrl}${resumeEndpoint}`;
    
    const response = await api.get(url);

    debugger
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Top right corner button - positioned below navbar */}
      <button onClick={handleClick}>
        click
      </button>
      <div className="absolute top-20 right-4 z-10">

        <Button
          color="blue"
          size="lg"
          onClick={openModal}
          className="flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
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
            Manage your uploaded resumes and track application status
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2 text-red-700">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">{error}</span>
            </div>
          </div>
        )}

        {/* Applications Table */}
        <Card className="shadow-2xl border-0 overflow-hidden" {...({} as any)}>
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-0 grid h-20 place-items-center"
            {...({} as any)}
          >
            <div className="flex items-center justify-between w-full px-6">
              <Typography variant="h4" color="white" className="font-semibold" {...({} as any)}>
                Resume Applications
              </Typography>
              <div className="flex items-center gap-2">
                {loading && (
                  <div className="flex items-center gap-2 text-white">
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="text-sm">Loading...</span>
                  </div>
                )}
                <Button
                  size="sm"
                  color="white"
                  variant="outlined"
                  onClick={fetchResumes}
                  className="flex items-center gap-1"
                  {...({} as any)}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Refresh
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardBody className="overflow-x-auto px-0 pt-0 pb-2" {...({} as any)}>
            <table className="w-full min-w-[800px] table-auto">
              <thead className="bg-gray-50">
                <tr>
                  {["Name", "Desired Role", "Status", "Actions"].map((el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-4 px-6 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-bold uppercase text-blue-gray-600 tracking-wider"
                        {...({} as any)}
                      >
                        {el}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {resumes.map((resume, key) => {
                  const className = `py-4 px-6 ${
                    key === resumes.length - 1 ? "" : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={resume.id} className="hover:bg-blue-gray-50 transition-colors duration-200">
                      <td className={className}>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold text-sm">
                              {resume.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                              {...({} as any)}
                            >
                              {resume.name}
                            </Typography>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="text-xs opacity-75"
                              {...({} as any)}
                            >
                              ID: {resume.id}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-medium"
                          {...({} as any)}
                        >
                          {resume.role}
                        </Typography>
                      </td>
                      <td className={className}>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getStatusStyles('Approved')}`}>
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                          Approved
                        </span>
                      </td>
                      <td className={className}>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            color="blue"
                            variant="outlined"
                            className="flex items-center gap-1 hover:shadow-md transition-shadow"
                            {...({} as any)}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            View
                          </Button>
                          <Button
                            size="sm"
                            color="green"
                            variant="outlined"
                            className="flex items-center gap-1 hover:shadow-md transition-shadow"
                            {...({} as any)}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Edit
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {resumes.length === 0 && !loading && (
              <div className="text-center py-12">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <Typography variant="h6" color="gray" className="mb-2" {...({} as any)}>
                  No resumes uploaded yet
                </Typography>
                <Typography variant="small" color="gray" {...({} as any)}>
                  Upload your first resume to get started
                </Typography>
              </div>
            )}
          </CardBody>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300" {...({} as any)}>
            <CardBody className="text-center" {...({} as any)}>
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <Typography variant="h4" color="blue-gray" className="mb-2" {...({} as any)}>
                {resumes.length}
              </Typography>
              <Typography variant="small" color="blue-gray" className="font-medium" {...({} as any)}>
                Total Resumes
              </Typography>
            </CardBody>
          </Card>
          
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300" {...({} as any)}>
            <CardBody className="text-center" {...({} as any)}>
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <Typography variant="h4" color="blue-gray" className="mb-2" {...({} as any)}>
                {resumes.length}
              </Typography>
              <Typography variant="small" color="blue-gray" className="font-medium" {...({} as any)}>
                Approved Applications
              </Typography>
            </CardBody>
          </Card>
          
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300" {...({} as any)}>
            <CardBody className="text-center" {...({} as any)}>
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <Typography variant="h4" color="blue-gray" className="mb-2" {...({} as any)}>
                {resumes.length}
              </Typography>
              <Typography variant="small" color="blue-gray" className="font-medium" {...({} as any)}>
                Active Candidates
              </Typography>
            </CardBody>
          </Card>
        </div>
      </div>

      <ResumeUploadModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Dashboard;
