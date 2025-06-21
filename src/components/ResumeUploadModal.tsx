import React, { useState } from 'react';
import { Button, Card, CardBody, CardHeader, Typography, Input } from "@material-tailwind/react";
import axios from 'axios';

interface ResumeUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResumeUploadModal: React.FC<ResumeUploadModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    resume: null as File | null
  });
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        resume: file
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.role || !formData.resume) {
      alert('Please fill in all fields and select a resume file');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('role', formData.role);
      formDataToSend.append('resume', formData.resume);

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);
      debugger
      const response = await axios.post('http://127.0.0.1:5000/upload', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(progress);
          }
        }
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      console.log('Upload successful:', response.data);
      
      // Reset form and close modal
      setTimeout(() => {
        setFormData({ name: '', role: '', resume: null });
        setIsUploading(false);
        setUploadProgress(0);
        onClose();
      }, 1000);

    } catch (error) {
      console.error('Error uploading resume:', error);
      setIsUploading(false);
      setUploadProgress(0);
      alert('Error uploading resume. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <Card className="w-full h-full">
          <CardHeader color="blue" className="relative h-24 flex items-center justify-center">
            <div className="flex items-center justify-center gap-3">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <Typography variant="h4" color="white" className="text-center">
                Upload Your Resume
              </Typography>
            </div>
          </CardHeader>
          
          <CardBody className="p-8 overflow-y-auto max-h-[calc(90vh-96px)]">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <Typography variant="small" color="blue-gray" className="mb-3 font-semibold flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Full Name *
                </Typography>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  size="lg"
                  required
                  disabled={isUploading}
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[100px]" }}
                />
              </div>

              {/* Role Field */}
              <div>
                <Typography variant="small" color="blue-gray" className="mb-3 font-semibold flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                  </svg>
                  Desired Role *
                </Typography>
                <Input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  placeholder="e.g., Frontend Developer, Full Stack Engineer, Data Scientist"
                  size="lg"
                  required
                  disabled={isUploading}
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[100px]" }}
                />
              </div>

              {/* Resume Upload Field */}
              <div>
                <Typography variant="small" color="blue-gray" className="mb-3 font-semibold flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  Resume (PDF) *
                </Typography>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-500 transition-all duration-300 bg-gray-50 hover:bg-blue-50">
                  <input
                    type="file"
                    accept=".pdf , .png , .jpg , .jpeg"
                    onChange={handleFileChange}
                    className="hidden"
                    id="resume-upload"
                    required
                    disabled={isUploading}
                  />
                  <label htmlFor="resume-upload" className="cursor-pointer">
                    <div className="space-y-4">
                      <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-gray-700 mb-2">
                          <span className="text-blue-600 hover:text-blue-700 font-bold">
                            Click to upload
                          </span> or drag and drop
                        </p>
                        <p className="text-sm text-gray-500">PDF files only, up to 10MB</p>
                      </div>
                    </div>
                  </label>
                </div>
                {formData.resume && (
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <p className="text-sm font-medium text-green-800">
                          File selected successfully
                        </p>
                        <p className="text-xs text-green-600">{formData.resume.name}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Upload Progress */}
              {isUploading && (
                <div className="space-y-3 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-600 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <Typography variant="small" color="blue-gray" className="font-semibold">
                      Uploading... {uploadProgress}%
                    </Typography>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-blue-600 h-3 rounded-full transition-all duration-300 ease-out"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6">
                <Button
                  type="button"
                  variant="outlined"
                  color="red"
                  onClick={onClose}
                  disabled={isUploading}
                  className="flex-1 flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  color="blue"
                  disabled={isUploading || !formData.name || !formData.role || !formData.resume}
                  className="flex-1 flex items-center justify-center gap-2"
                >
                  {isUploading ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Uploading...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      Upload Resume
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default ResumeUploadModal; 