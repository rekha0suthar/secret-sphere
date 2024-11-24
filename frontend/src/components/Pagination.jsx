import React, { useContext } from 'react';
import { GrPrevious } from 'react-icons/gr';
import { GrNext } from 'react-icons/gr';
import { Context } from '../context/Context';
import '../styles/pagination.css';

const Pagination = () => {
  const { currentPage, setCurrentPage, totalPages } = useContext(Context);

  // Method to go to next page
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // Method to go to previous page
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="pagination">
      <button onClick={handlePrevPage} disabled={currentPage === 1}>
        <GrPrevious />
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button onClick={handleNextPage} disabled={currentPage === totalPages}>
        <GrNext />
      </button>
    </div>
  );
};

export default Pagination;
