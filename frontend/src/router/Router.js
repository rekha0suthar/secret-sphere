import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import ProtectedRoute from './ProtectedRoute';
import Dashboard from '../pages/Dashboard';
import EditSecret from '../pages/EditSecret';
import Secrets from '../components/Secrets';
import ForgetPassword from '../pages/ForgetPassword';
import ResetPassword from '../pages/ResetPassword';

export const Router = () => {
  return (
    <Routes>
      <Route path="/" Component={Login} />
      <Route path="/signup" Component={Signup} />
      <Route path="/forget-password" Component={ForgetPassword} />
      <Route path="/reset-password" Component={ResetPassword} />
      <Route Component={ProtectedRoute}>
        <Route path="/dashboard" Component={Dashboard} />
        <Route path="/secrets" Component={Secrets} />
        <Route path="/secret/:id" Component={EditSecret} />
      </Route>
    </Routes>
  );
};
