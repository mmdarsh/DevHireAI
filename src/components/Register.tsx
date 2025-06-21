import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Input
} from "@material-tailwind/react";
 
const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
 
  const clearForm = () => {
    setFormData({
      username: '',
      email: '',
      password: ''
    });
    setError('');
    setSuccess('');
  };
 
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
    if (success) setSuccess('');
  };
 
  const validateForm = () => {
    if (!formData.username.trim()) {
      setError('Username is required');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!formData.password.trim()) {
      setError('Password is required');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    return true;
  };
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
   
    if (!validateForm()) {
      return;
    }
 
    setIsLoading(true);
    setError('');
 
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
 
    try {
      // Here you would typically make an API call to register the user
      // For demo purposes, we'll simulate a successful registration
     
      // Store registration data (in real app, this would be handled by backend)
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const newUser = {
        id: Date.now(),
        username: formData.username,
        email: formData.email,
        password: formData.password, // In real app, this should be hashed
        createdAt: new Date().toISOString()
      };
     
      // Check if user already exists
      const userExists = existingUsers.some((user: any) =>
        user.username === formData.username || user.email === formData.email
      );
     
      if (userExists) {
        setError('User with this username or email already exists');
        setIsLoading(false);
        return;
      }
     
      existingUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(existingUsers));
     
      setSuccess('Registration successful! Redirecting to login...');
     
      // Clear form data
      clearForm();
     
      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
     
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
   
    setIsLoading(false);
  };
 
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Company Logo/Branding Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
            </svg>
          </div>
          <Typography variant="h4" color="gray" className="font-bold mb-2" {...({} as any)}>
            DevHire AI
          </Typography>
        </div>
 
        <Card className="shadow-2xl border-0" {...({} as any)}>
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-6 grid h-20 place-items-center rounded-t-xl"
            {...({} as any)}
          >
            <Typography variant="h5" color="white" className="font-semibold" {...({} as any)}>
              Create New Account
            </Typography>  
          </CardHeader>
         
          <CardBody className="p-6" {...({} as any)}>
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span className="text-red-700 text-sm">{error}</span>
                </div>
              </div>
            )}
 
            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-green-700 text-sm">{success}</span>
                </div>
              </div>
            )}
           
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Typography variant="small" color="gray" className="mb-2 font-medium" {...({} as any)}>
                  Username
                </Typography>
                <Input
                  type="text"
                  size="lg"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                  className="!border-gray-300 focus:!border-blue-500"
                  labelProps={{
                    className: "text-gray-600"
                  }}
                  icon={
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  }
                  {...({} as any)}
                />
              </div>
             
              <div>
                <Typography variant="small" color="gray" className="mb-2 font-medium" {...({} as any)}>
                  Email Address
                </Typography>
                <Input
                  type="email"
                  size="lg"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="!border-gray-300 focus:!border-blue-500"
                  labelProps={{
                    className: "text-gray-600"
                  }}
                  icon={
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  }
                  {...({} as any)}
                />
              </div>
             
              <div>
                <Typography variant="small" color="gray" className="mb-2 font-medium" {...({} as any)}>
                  Password
                </Typography>
                <Input
                  type="password"
                  size="lg"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="!border-gray-300 focus:!border-blue-500"
                  labelProps={{
                    className: "text-gray-600"
                  }}
                  icon={
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  }
                  {...({} as any)}
                />
              </div>
             
              <Button
                type="submit"
                variant="gradient"
                color="blue"
                size="lg"
                fullWidth
                disabled={isLoading}
                className="mt-8 py-3 font-semibold text-base"
                {...({} as any)}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Creating Account...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    <span>Create Account</span>
                  </div>
                )}
              </Button>
            </form>
 
            {/* Login Link */}
            <div className="mt-6 text-center">
              <Typography variant="small" color="gray" className="font-medium" {...({} as any)}>
                Already have an account?{' '}
                <button
                  onClick={() => navigate('/login')}
                  className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                >
                  Sign In
                </button>
              </Typography>
            </div>
          </CardBody>
        </Card>
       
        {/* Footer */}
        <div className="text-center mt-8">
        </div>
      </div>
    </div>
  );
};
 
export default Register;