import React, { useContext } from 'react';
import { Context } from '../context/Context';
import '../styles/form.css';

const ForgetPassword = () => {
  const { email, setEmail, loading, forgetPassword } = useContext(Context); // all the states from context

  return (
    <div className="form-container">
      <form onSubmit={forgetPassword}>
        <h1>Forget Password</h1>

        <label>Email</label>

        <input
          type="text"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit">
          {loading ? 'Forgetting ...' : 'Forget Password'}
        </button>
        <p className="msg">
          Go Back to <a href="/">Login</a>
        </p>
      </form>
    </div>
  );
};

export default ForgetPassword;
