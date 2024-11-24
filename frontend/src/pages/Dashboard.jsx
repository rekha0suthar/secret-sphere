import React from 'react';
import Nav from '../components/Nav';
import '../styles/dashboard.css';
import Secrets from '../components/Secrets';
import SecretForm from '../components/SecretForm';
const Dashboard = () => {
  return (
    <div className="dashboard">
      <Nav />
      <SecretForm />
    </div>
  );
};

export default Dashboard;
