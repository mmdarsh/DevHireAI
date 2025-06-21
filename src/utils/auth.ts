export const isAuthenticated = (): boolean => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const token = localStorage.getItem('token');
  return isLoggedIn && !!token;
};

export const getToken = (): string | null => {
  return localStorage.getItem('token');
};

export const getUser = (): any => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

export const logout = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('user');
}; 