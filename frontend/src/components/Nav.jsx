import React, { useContext, useEffect, useState } from 'react';
import '../styles/nav.css';
import { useNavigate } from 'react-router-dom';
import { Context } from '../context/Context';

const Nav = () => {
  const [isShow, setIsShow] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const { logout, getUser, user } = useContext(Context);

  useEffect(() => {
    getUser();
  }, []);

  const handlePopup = () => setIsShow(!isShow);
  return (
    <div className="nav-container">
      <h1 onClick={() => navigate('/dashboard')}>ShareSecret</h1>
      {token && (
        <div className="btns">
          <div className="logout" onClick={handlePopup}>
            <h2>{user.name}</h2>
          </div>
          <div
            className="logout-pop"
            style={{ display: isShow ? 'block' : 'none' }}
          >
            <h2 onClick={logout}>Logout</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default Nav;
