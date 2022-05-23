import React from 'react';
import { BsChevronLeft, BsChevronRight, BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";
import styles from "./Pagination.module.css";

const Pagination = (props) => {

  const { totalPages, pageNumber, setPageNumber } = props;

  const pageChangeHandler = (index) => {
    setPageNumber(index);
  }

  /**
   *  For navigating between pages (left or right side)
   * @param {*} index page Number
   */
  const navigatePageHandler = (index) => {
    if (index  < 1) {
        index = 1;
    } else if (index > totalPages) {
        index = totalPages;
    }

    setPageNumber(index);
  }

  let pages = [];

  /** For directly jumping to first page */
  pages.push(
    <button 
        className={`${styles.btn} ${pageNumber === 1 ? styles.btnDisable : ""}`}
        key={-2}
        onClick={() => pageChangeHandler(1)}
    >
        <BsChevronDoubleLeft/>
    </button>
  );

  /** For navigating to previous page */
  pages.push(
    <button 
        className={`${styles.btn} ${pageNumber === 1 ? styles.btnDisable : ""}`}
        key={-1}
        onClick={() => navigatePageHandler(pageNumber - 1)}
    >
        <BsChevronLeft/>
    </button>
 );

 /** Showing current page */
 pages.push(
     <button
        className={`${styles.btn}`}
        key={0}
    >
        {pageNumber}
     </button>
 );

  /** For navigating to next page */
  pages.push(
    <button 
        className={`${styles.btn} ${pageNumber === totalPages ? styles.btnDisable : ""}`}
        key={1}
        onClick={() => navigatePageHandler(pageNumber + 1)}
    >
        <BsChevronRight/>
    </button>
  );

  /** For directly jumping to last page */
  pages.push(
    <button 
        className={`${styles.btn} ${pageNumber === totalPages ? styles.btnDisable : ""}`}
        key={2}
        onClick={() => pageChangeHandler(totalPages)}
    >
        <BsChevronDoubleRight/>
    </button>
  );
  
  return (
    <div className={styles["btn-section"]}>
        {pages}
    </div>
  )
}

export default Pagination;