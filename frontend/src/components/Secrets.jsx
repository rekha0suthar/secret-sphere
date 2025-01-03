import React, { useContext, useEffect } from 'react';
import '../styles/secrets.css';
import { Context } from '../context/Context';
import Secret from './Secret';
import Nav from './Nav';
import Pagination from './Pagination';
import Spinner from '../assets/spinner.gif';
import { MdArrowBackIosNew } from 'react-icons/md';

const Secrets = () => {
  const {
    secrets,
    getSecrets,
    loading,
    currentPage,
    setCurrentPage,
    totalPages,
  } = useContext(Context);
  useEffect(() => {
    getSecrets();
  }, [currentPage, setCurrentPage, totalPages]);
  return (
    <>
      <Nav />
      <div className="secret-container">
        <a href="/dashboard">
          <MdArrowBackIosNew /> Back to Share Secret
        </a>
        {loading ? (
          <div className="loading">
            <img src={Spinner} alt="Loading..." />
          </div>
        ) : secrets?.length === 0 ? (
          <div className="no-secrets">
            <p>No Secrets Found</p>
          </div>
        ) : (
          <>
            <div className="secrets">
              {secrets.map((secret) => (
                <Secret key={secret._id} secret={secret} />
              ))}
            </div>
            <Pagination />
          </>
        )}
      </div>
    </>
  );
};

export default Secrets;
