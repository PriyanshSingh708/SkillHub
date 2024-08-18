import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import socketIoClient from 'socket.io-client';

export const GeneralContext = createContext();

const GeneralContextProvider = ({ children }) => {
  const WS = 'http://localhost:6001';
  const socket = socketIoClient(WS);
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usertype, setUsertype] = useState('');

  const login = async () => {
    try {
      const loginInputs = { email, password };
      const res = await axios.post('http://localhost:6001/login', loginInputs);
      localStorage.setItem('userId', res.data._id);
      localStorage.setItem('usertype', res.data.usertype);
      localStorage.setItem('username', res.data.username);
      localStorage.setItem('email', res.data.email);
      navigate(res.data.usertype === 'freelancer' ? '/freelancer' : res.data.usertype === 'client' ? '/client' : '/admin');
    } catch (err) {
      alert('Login failed!!');
      console.error(err);
    }
  };

  const register = async () => {
    try {
      const inputs = { username, email, usertype, password };
      const res = await axios.post('http://localhost:6001/register', inputs);
      localStorage.setItem('userId', res.data._id);
      localStorage.setItem('usertype', res.data.usertype);
      localStorage.setItem('username', res.data.username);
      localStorage.setItem('email', res.data.email);
      navigate(res.data.usertype === 'freelancer' ? '/freelancer' : res.data.usertype === 'client' ? '/client' : '/admin');
    } catch (err) {
      alert('Registration failed!!');
      console.error(err);
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <GeneralContext.Provider value={{ socket, login, register, logout, username, setUsername, email, setEmail, password, setPassword, usertype, setUsertype }}>
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralContextProvider;
