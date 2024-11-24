import React, { useContext } from 'react';
import { Context } from '../context/Context';
import '../styles/form.css';
import Nav from '../components/Nav';

const Signup = () => {
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    loading,
    signup,
  } = useContext(Context);

  return (
    <>
      <Nav />
      <div className="form-container">
        <form onSubmit={signup}>
          <h1>Signup</h1>

          <label>Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Password</label>
          <input
            type="password" // update input type to password for security
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
            autoComplete="cc-number"
          />
          <label>Confirm Password</label>
          <input
            type="password" // update input type to password for security
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            minLength={6}
            required
            autoComplete="cc-number"
          />
          <button type="submit">{loading ? 'Loading' : 'Signup'}</button>
          <p className="msg">
            Already have an account? <a href="/">Login</a>
          </p>
        </form>
      </div>{' '}
    </>
  );
};

export default Signup;
