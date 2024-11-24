import React, { useContext } from 'react';
import { Context } from '../context/Context';
import { MdDelete, MdEdit } from 'react-icons/md';
import '../styles/secret.css';
import { useNavigate } from 'react-router-dom';

const Secret = ({ secret }) => {
  const userId = localStorage.getItem('userId');
  const { deleteSecret } = useContext(Context);

  const navigate = useNavigate();
  return (
    <div className="secret-card">
      <div className="secret-header">
        <h2>Anonymous User</h2>
        {userId === secret.userId && (
          <div className="btns">
            <button
              className="edit-btn"
              onClick={() => navigate(`/secret/${secret._id}`)}
            >
              <MdEdit />
            </button>
            <button
              className="delete-btn"
              onClick={() => deleteSecret(secret._id)}
            >
              <MdDelete />
            </button>
          </div>
        )}
      </div>
      <h3>{secret.title}</h3>
      <p className="secret-content">{secret.content}</p>
    </div>
  );
};

export default Secret;
