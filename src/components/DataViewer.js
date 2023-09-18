import React, { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

const SteinStore = require("stein-js-client");

function DataViewer() {
  const [data, setData] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'default' });

  const itemsPerPage = 20; // Change this as needed
  
  useEffect(() => {
    const url = "https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4";

    const store = new SteinStore(url);

    store.read("list")
      .then(data => {
        setData(data);
        setCurrentData(data);
      })
      .catch((error) => {
        // Handle error
        console.error("Error fetching data:", error);
      });
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const sortData = () => {
    const col = sortConfig.key
    const sorted = [...data].sort((a, b) => {
      if (a[col] && b[col]) {
        if (sortConfig.direction === 'asc') {
          return a[col].localeCompare(b[col], undefined, {
            numeric: true,
            sensitivity: 'base',
          })
        } else if (sortConfig.direction === 'desc') {
          return -1 * a[col].localeCompare(b[col], undefined, {
            numeric: true,
            sensitivity: 'base',
          })
        }
      } else {
        return 1
      }
    });
    if (sortConfig.direction === 'default') {
      setCurrentData(data);
    } else {
      setCurrentData(sorted);
    }
  }

  const handleSort = (key) => {
    let direction = 'default';
    if (sortConfig.direction === 'default') {
      direction = 'asc';
    } else if (sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    setSortConfig({ key, direction });
    sortData();
  };

  const renderSortIcon = (col) => {
    console.log(sortConfig.direction)
    if (sortConfig.key === col) {
      if (sortConfig.direction === 'asc') {
        return <FontAwesomeIcon icon={faSortDown} />;
      } else if (sortConfig.direction === 'desc') {
        return <FontAwesomeIcon icon={faSortUp} />;
      }
    }
    return <FontAwesomeIcon icon={faSort} />;
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = currentData.slice(indexOfFirstItem, indexOfLastItem);


  return (
    <div>
      
      <table className="table">
        <thead>
          <tr>
            <th scope="col" 
            onClick={() => handleSort('komoditas')}
            >
              Komoditas 
              {renderSortIcon('komoditas')}
              </th>
            <th scope="col" 
            onClick={() => handleSort('area_provinsi')}
            >
              Provinsi
              {renderSortIcon('area_provinsi')}
            </th>
            <th scope="col" 
            onClick={() => handleSort('area_kota')}
            >
              Kota
              {renderSortIcon('area_kota')}
            </th>
            <th scope="col" onClick={() => handleSort('size')}
            >
              Ukuran
              {renderSortIcon('size')}
              </th>
            <th scope="col" onClick={() => handleSort('price')}
            >
              Harga
              {renderSortIcon('price')}
            </th>
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
