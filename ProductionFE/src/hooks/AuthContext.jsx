// AuthContext.jsx
import axios from 'axios';
import PropTypes from 'prop-types';
import {jwtDecode} from 'jwt-decode';
import { toast } from 'react-toastify';
import React, { useMemo, useState, useEffect, useCallback, createContext } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userAvatar, setUserAvatar] = useState('default-avatar.jpg');
  const [userName, setUserName] = useState('');
  const [userMail, setUserMail] = useState('');
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || null);
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken') || null);
  const [loading, setLoading] = useState(false);

  const logout = useCallback(() => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setAccessToken(null);
    setRefreshToken(null);
    setIsLoggedIn(false);
    setUserAvatar('default-avatar.jpg');
    setUserName('');
    setUserMail('');
    toast.success('Logged out successfully!', { autoClose: 2000 });
  }, []);

  const fetchUserProfile = useCallback(async () => {
    const access = localStorage.getItem('accessToken');
    if (access) {
      try {
        const decodedToken = jwtDecode(access);

        if (decodedToken.user_id) {
          try {
            const response = await axios.get(`http://127.0.0.1:8000/api/users/${decodedToken.user_id}/`, {
              headers: {
                Authorization: `Bearer ${access}`
              }
            });
            const user = response.data;
            setUserAvatar(`/assets/images/avatars/avatar_${decodedToken.user_id + 1}.jpg`);
            setUserName(user.username);
            setUserMail(user.email);
            toast.success(`Hi: ${user.username}`, { autoClose: 2000 }); 
          } catch (error) {
              console.error('Failed to fetch user profile:', error);
              toast.error('Failed to fetch user profile', { autoClose: 2000 });
          }
        } else {
          throw new Error('Token missing required properties');
        }
      } catch (error) {
        console.error('Failed to decode token:', error);
        toast.error('Failed to decode token', { autoClose: 2000 });
        logout();
      }
    }
  }, [logout]);

  useEffect(() => {
    if (accessToken) {
      setIsLoggedIn(true);
      fetchUserProfile();
    }
  }, [accessToken, fetchUserProfile]);

  const login = useCallback(async (credentials) => {
    setLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/token/', credentials);
      const { access, refresh } = response.data;

      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);
      setAccessToken(access);
      setRefreshToken(refresh);

      setIsLoggedIn(true);
      fetchUserProfile();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw new Error('Invalid credentials');
    }
  }, [fetchUserProfile]);

  const updateUserAvatar = useCallback((newAvatar) => {
    setUserAvatar(newAvatar);
  }, []);

  const updateUserName = useCallback((newName) => {
    setUserName(newName);
  }, []);

  const fetchAllUsers = useCallback(async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/users/', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch users', error);
      toast.error('Failed to fetch users', { autoClose: 2000 });
      return [];
    }
  }, [accessToken]);

  const refreshAccessToken = useCallback(async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {
        refresh: refreshToken
      });
      const { access } = response.data;

      localStorage.setItem('accessToken', access);
      setAccessToken(access);
      toast.success('Refresh Token Success');
    } catch (error) {
      console.error('Failed to refresh access token', error);
      toast.error('Session expired. Please log in again.', { autoClose: 2000 });
      logout();
    }
  }, [refreshToken, logout]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (accessToken) {
        const decodedToken = jwtDecode(accessToken);
        const currentTime = Date.now() / 1000;
        
        if (decodedToken.exp - currentTime < 300) { // if token is about to expire in less than 5 minutes
          refreshAccessToken();
        }
      }
    }, 60000); // check every minute

    return () => clearInterval(intervalId);
  }, [accessToken, refreshAccessToken]);

  const contextValue = useMemo(() => ({
    isLoggedIn,
    login,
    logout,
    userAvatar,
    userName,
    userMail,
    updateUserAvatar,
    updateUserName,
    fetchAllUsers,
    loading
  }), [
    isLoggedIn,
    userAvatar,
    userName,
    userMail,
    login,
    logout,
    updateUserAvatar,
    updateUserName,
    fetchAllUsers,
    loading
  ]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export { AuthContext, AuthProvider };
