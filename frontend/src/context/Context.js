import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const BASE_API_URL = 'https://secret-sphere-backend.vercel.app/api'; //'http://localhost:7000/api';

const Context = createContext({});

const ContextProvider = ({ children }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [secrets, setSecrets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  const isValidEmail = () => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  // Method for Signup user --- input: name, email, password
  const signup = async (e) => {
    // preventing page from refresh
    e.preventDefault();

    // Signup User object
    const newUser = { name, email, password };

    try {
      // setting loading true until we back response
      setLoading(true);
      if (password === confirmPassword && isValidEmail()) {
        // calling api and store response
        const response = await axios.post(
          `${BASE_API_URL}/auth/signup`,
          newUser,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        toast.success(response.data.msg); // success alert
        navigate('/'); // redirect to login page
        setLoading(false); //setting loading false
      } else {
        toast.error('Password does not match or invalid email');
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      const errorMsg = err.response?.data?.msg || 'Signup failed';
      toast.error(errorMsg); // show specific error message if available
    } finally {
      setLoading(false);
    }
  };

  // Method for login --- input: email and password
  const login = async (e) => {
    // preventing page from refresh
    e.preventDefault();

    const newUser = { email, password };

    try {
      // setting loading true until we back response
      setLoading(true);
      const response = await axios.post(`${BASE_API_URL}/auth/login`, newUser, {
        headers: { 'Content-Type': 'application/json' },
      });

      toast.success(response.data.msg); // success alert
      localStorage.setItem('token', response.data.token); // storing token in localstorage
      localStorage.setItem('userId', response.data.user._id);
      navigate('/dashboard'); // redirecting to dashboard after successfull login
    } catch (err) {
      console.error(err);
      toast.error('Incorrect email/password'); // error alert
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  // Method for logout
  const logout = () => {
    localStorage.removeItem('token'); // removing token from localstorage
    localStorage.removeItem('userId');
    navigate('/'); // redirecting to login after logout
  };

  const forgetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BASE_API_URL}/auth/forget-password`,
        { email },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      console.log(response);
      if (response.status === 200) {
        setUser(response.data.user);
        localStorage.setItem('userId', response.data.user._id);
        navigate('/reset-password');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    try {
      const id = localStorage.getItem('userId');

      console.log(userId, password);
      if (password === confirmPassword) {
        const response = await axios.put(
          `${BASE_API_URL}/auth/reset-password`,
          { id, password },
          {
            headers: { 'Content-Type': 'application/json' },
          }
        );
        console.log(response);

        navigate('/');
      } else {
        toast.error('Incorrect password match');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Method to fetch User details
  const getUser = async () => {
    try {
      const response = await axios.get(`${BASE_API_URL}/auth/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data || null);
    } catch (err) {
      console.error(err);
    }
  };

  // Method to add secret
  const addSecret = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post(
        `${BASE_API_URL}/secret/`,
        { userId, title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTitle('');
      setContent('');
      getSecrets();
      navigate('/secrets');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Method to fetch all secrets
  const getSecrets = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${BASE_API_URL}/secret/?page=${currentPage}&limit=4`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSecrets(response.data.secrets);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Method to delete secret
  const deleteSecret = async (id) => {
    // alert confirmation before delete
    const confirmed = window.confirm(
      'Are you sure you want to delete this secret?'
    );
    if (confirmed) {
      try {
        const response = await axios.delete(`${BASE_API_URL}/secret/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success(response.data.msg); // success alert
        getSecrets(); // fetching all secrets
      } catch (err) {
        console.log(err);
        toast.error(err);
      }
    }
  };

  // Method to fetch specific user secret
  const getUserSecret = async (secretId) => {
    try {
      const response = await axios.get(`${BASE_API_URL}/secret/${secretId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      setTitle(response.data.title);
      setContent(response.data.content);
    } catch (err) {
      toast.error(err);
    }
  };

  // Method to update user secret
  const updateSecret = async (e, secretId) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.put(
        `${BASE_API_URL}/secret/${secretId}`,
        { title, content },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getSecrets();
      navigate('/secrets');
      setTitle('');
      setContent('');
    } catch (err) {
      toast.error(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Context.Provider
      value={{
        name,
        setName,
        email,
        setEmail,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        title,
        setTitle,
        content,
        setContent,
        secrets,
        setSecrets,
        loading,
        setLoading,
        signup,
        login,
        logout,
        user,
        setUser,
        getUser,
        addSecret,
        getSecrets,
        deleteSecret,
        getUserSecret,
        updateSecret,
        currentPage,
        setCurrentPage,
        totalPages,
        setTotalPages,
        forgetPassword,
        resetPassword,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, ContextProvider };
