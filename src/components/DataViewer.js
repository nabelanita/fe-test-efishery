import React, { useState, useEffect } from 'react';
import axios from "axios";

const SteinStore = require("stein-js-client");

function DataViewer() {
  const [data, setData] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20; // Change this as needed
  
  useEffect(() => {
    const url = "https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4";

    const store = new SteinStore(url);

    store.read("list")
      .then(data => {
        console.log(data)
        setData(data);
        setCurrentData(data);
      })
      .catch((error) => {
        // Handle error
        console.error("Error fetching data:", error);
      });
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = currentData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const sortAlphabet = () => {
    const col = "komoditas"
    const sorted = [...data].sort((a, b) => {
      if (a[col] && b[col]) {
        return a[col].localeCompare(b[col])
      } else {
        return 1
      }
    });
    setData(sorted);
    setCurrentData(sorted);
  }

  const sortAlphabetReverse = () => {
    const col = "komoditas"
    const sorted = [...data].sort((a, b) => {
      if (a[col] && b[col]) {
        return -1 * a[col].localeCompare(b[col])
      } else {
        return -1
      }
    });
    setData(sorted);
    setCurrentData(sorted);
  }

  const sortNumber = () => {
    const col = "price"
    const sorted = [...data].sort((a, b) => {
      if (a[col] && b[col]) {
        return a[col].localeCompare(b[col], undefined, { numeric: true })
      } else {
        return 1
      }
    });
    setData(sorted);
    setCurrentData(sorted);
  };

  const sortNumberReverse = () => {
    const col = "price"
    const sorted = [...data].sort((a, b) => {
      if (a[col] && b[col]) {
        return -1 * a[col].localeCompare(b[col], undefined, { numeric: true })
      } else {
        return -1
      }
    });
    setData(sorted);
    setCurrentData(sorted);
  };


  return (
    <div>
      <button onClick={sortAlphabetReverse}>Sort Alphabet (Descending)</button>
      <button onClick={sortAlphabet}>Sort Alphabet (Ascending)</button>
      <button onClick={sortNumberReverse}>Sort Harga (Descending)</button>
      <button onClick={sortNumber}>Sort Harga (Ascending)</button>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Komoditas</th>
            <th scope="col">Provinsi</th>
            <th scope="col">Kota</th>
            <th scope="col">Ukuran</th>
            <th scope="col">Harga</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.uuid}>
              <td>{item.komoditas}</td>
              <td>{item.area_provinsi}</td>
              <td>{item.area_kota}</td>
              <td>{item.size}</td>
              <td>{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <nav aria-label="Page navigation">
      <ul className="pagination">
        {Array.from({ length: Math.ceil(currentData.length / itemsPerPage) }).map((_, index) => (
          <li
            key={index}
            className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
          >
            <button
              className="page-link"
              onClick={() => {
                handlePageChange(index + 1)
              }}
            >
              {index + 1}
            </button>
          </li>
        ))}
      </ul>
    </nav>
      
    </div>
  );
}

export default DataViewer;
