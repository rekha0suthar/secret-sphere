import React, { useContext } from 'react';
import { Context } from '../context/Context';
import '../styles/form.css';
import Nav from '../components/Nav';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { email, setEmail, password, setPassword, loading, login } =
    useContext(Context); // all the states from context

  const navigate = useNavigate();

  return (
    <>
      <Nav />
      <div className="form-container">
        <form onSubmit={login}>
          <h1>Login</h1>

          <label>Email</label>

          <input
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="cc-number"
          />

          <button type="submit">{loading ? 'Logging ...' : 'Login'}</button>
          <button onClick={() => navigate('/forget-password')}>
            Forget Password
          </button>
          <p className="msg">
            Don't have an account? <a href="/signup">Signup</a>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
