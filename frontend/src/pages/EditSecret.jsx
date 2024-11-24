import React, { useContext, useEffect } from 'react';
import { Context } from '../context/Context';
import { useParams } from 'react-router-dom';
import Nav from '../components/Nav';

const EditSecret = () => {
  const { title, setTitle, content, setContent, updateSecret, getUserSecret } =
    useContext(Context);
  const { id } = useParams();
  useEffect(() => {
    getUserSecret(id);
  }, [id]);
  return (
    <>
      <Nav />
      <div className="secret-form">
        <form onSubmit={(e) => updateSecret(e, id)}>
          <h2 style={{ marginBottom: '10px' }}>Update Your Secret</h2>
          <input
            type="text"
            placeholder="Enter title of your secret"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Enter your secret"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />

          <button className="add-secret" type="submit">
            Share Secret
          </button>
        </form>
      </div>
    </>
  );
};

export default EditSecret;
