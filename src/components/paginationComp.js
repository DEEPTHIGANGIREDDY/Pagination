import axios from "axios";
import { useEffect, useState } from "react";
import "./style.css";

const PaginationComp = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(1);

  const pages = [];
  for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexofLastItem = currentPage * itemsPerPage;
  const indexofFirstItem = indexofLastItem - itemsPerPage;
  const currentItems = data.slice(indexofFirstItem, indexofLastItem);

//   const renderPageNumber = pages.map((number) => {
//     if (number<maxPageNumberLimit+1 && number>minPageNumberLimit) {
//         return (
//             <li
//               key={number}
//               id={number}
//               onClick={() => setCurrentPage(number)}
//               className={currentPage === number ? "active" : ""}
//             >
//               {number}
//             </li>
//           );
//     }else{
//         return null
//     }
//   });

const renderPageNumber = pages.map((number) => {
    if (number <= maxPageNumberLimit && number >= minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={() => setCurrentPage(number)}
          className={currentPage === number ? "active" : ""}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });
  
  useEffect(() => {
    axios("https://jsonplaceholder.typicode.com/photos")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleNextBtn = () => {
    setCurrentPage(currentPage + 1);
    if (currentPage + 1 > maxPageNumberLimit && maxPageNumberLimit + pageNumberLimit <= pages.length) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };
  
  const handlePrevBtn = () => {
    setCurrentPage(currentPage - 1);
    if (currentPage - 1 < minPageNumberLimit && minPageNumberLimit - pageNumberLimit >= 1) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };
  
  const handleLoadMore=()=>{
    setItemsPerPage(itemsPerPage+6)
  }

  return (
    <>
      <p><b>Pagination</b></p>
      <ul className="pagenumbers">
        <li>
            <button onClick={handlePrevBtn}><b>Prev</b></button>
        </li>
        {renderPageNumber}
        <li>
            <button onClick={handleNextBtn}><b>Next</b></button>
        </li>
        </ul>
        <button className="loadmore" onClick={handleLoadMore}>Load More</button>
      <div className="parent">
        <div className="child">
          {currentItems.map((val, index) => {
            return <img src={val.thumbnailUrl} key={index} alt={`Product ${index}`} />;
          })}
        </div>
      </div>
      
    </>
  );
};

export default PaginationComp;
