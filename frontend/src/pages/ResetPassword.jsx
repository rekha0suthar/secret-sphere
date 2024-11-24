import React, { useContext } from 'react';
import { Context } from '../context/Context';
import '../styles/form.css';

const ResetPassword = () => {
  const {
    confirmPassword,
    setConfirmPassword,
    password,
    setPassword,
    loading,
    resetPassword,
  } = useContext(Context); // all the states from context
  return (
    <div className="form-container">
      <form onSubmit={resetPassword}>
        <h1>Reset Password</h1>

        <label>New Password</label>

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          autoComplete="cc-number"
        />
        <label>Confirm New Password</label>

        <input
          type="password"
          placeholder="Enter your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          minLength={6}
          autoComplete="cc-number"
        />
        <button type="submit">
          {loading ? 'Resetting ...' : 'Reset Password'}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
