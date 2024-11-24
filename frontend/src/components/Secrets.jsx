import React, { useContext, useEffect } from 'react';
import '../styles/secrets.css';
import { Context } from '../context/Context';
import Secret from './Secret';
import Nav from './Nav';
import Pagination from './Pagination';

const Secrets = () => {
  const { secrets, getSecrets, currentPage, setCurrentPage, totalPages } =
    useContext(Context);
  useEffect(() => {
    getSecrets();
  }, [currentPage, setCurrentPage, totalPages]);
  return (
    <>
      <Nav />
      <div className="secret-container">
        <div className={secrets.length > 0 && 'secrets'}>
          {' '}
          {secrets.map((secret) => (
            <Secret key={secret._id} secret={secret} />
          ))}
        </div>
        <Pagination />
      </div>
    </>
  );
};

export default Secrets;
