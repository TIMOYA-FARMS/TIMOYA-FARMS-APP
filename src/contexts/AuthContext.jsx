import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [loading, setLoading] = useState(!!token);
  const [error, setError] = useState(null);

  // Attach token to axios
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // Fetch current user if token exists
  const fetchCurrentUser = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await axios.get(`${baseUrl}/user/me`);
      setUser(res.data.user || res.data);
      setError(null);
    } catch (err) {
      setUser(null);
      setError('Session expired. Please login again.');
      setToken(null);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) fetchCurrentUser();
  }, [token, fetchCurrentUser]);

  // Login
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(`${baseUrl}/user/login`, { email, password });
      const authToken = res.data.token || res.data.accessToken;
      setToken(authToken);
      localStorage.setItem('token', authToken);
      await fetchCurrentUser();
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      setUser(null);
      setToken(null);
      localStorage.removeItem('token');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Register
  const register = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      await axios.post(`${baseUrl}/user/signup`, formData);
      // Optionally auto-login after registration
      return await login(formData.email, formData.password);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    setLoading(true);
    try {
      await axios.post(`${baseUrl}/user/logout`);
    } catch (err) {
      // Ignore errors on logout
    } finally {
      setUser(null);
      setToken(null);
      localStorage.removeItem('token');
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, error, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
