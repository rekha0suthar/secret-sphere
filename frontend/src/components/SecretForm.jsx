import React, { useContext } from 'react';
import { Context } from '../context/Context';
import '../styles/secret-form.css';
import { useNavigate } from 'react-router-dom';

const SecretForm = () => {
  const { title, setTitle, content, setContent, addSecret, user } =
    useContext(Context);
  return (
    <div className="secret-form">
      <form onSubmit={addSecret}>
        <h2>Hi, {user.name}</h2>
        <h2 style={{ marginBottom: '10px' }}>Share Your Secret</h2>
        <input
          type="text"
          placeholder="Title of your secret"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Your secret"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <button className="add-secret" type="submit">
          Share Secret
        </button>
      </form>
      <a href="/secrets">Explore secrets shared by others</a>
    </div>
  );
};

export default SecretForm;
