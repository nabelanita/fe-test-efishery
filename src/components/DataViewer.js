import React, { useState, useEffect } from 'react';

import SearchBar from './SearchBar';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

import { BeatLoader } from 'react-spinners';

const SteinStore = require("stein-js-client");

function DataViewer() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState(data); // Filtered data

  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'default' });

  const [query, setQuery] = useState({})

  const [provinsiOptions, setProvinsiOptions] = useState([]);
  const [kotaOptions, setKotaOptions] = useState({});
  const [sizeOptions, setSizeOptions] = useState([]);

  const itemsPerPage = 20; // Change this as needed
  
  useEffect(() => {
    const url = "https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4";

    const store = new SteinStore(url);

    store.read("list")
      .then(data => {
        setData(data);
        setFilteredData(data);
      })
      .catch((error) => {
        // Handle error
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    var filtered = data;
    if (query.komoditas) {
      const regex = new RegExp(query.komoditas, 'i');
      filtered = filtered.filter((item) => regex.test(item.komoditas)); 
      setFilteredData(filtered);
    }

    if (query.province) {
      filtered = filtered.filter((item) => item.area_provinsi === query.province);
      setFilteredData(filtered);
    }

    if (query.city) {
      filtered = filtered.filter((item) => item.area_kota === query.city);
      setFilteredData(filtered);
    }

    if (query.size) {
      filtered = filtered.filter((item) => item.size === query.size);
      setFilteredData(filtered);
    }

    setCurrentPage(1)

  }, [query])
  
  useEffect(() => {
    sortData();
    setCurrentPage(1)
  }, [sortConfig])
  

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const sortData = () => {
    const col = sortConfig.key
    const sorted = [...filteredData].sort((a, b) => {
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
      setFilteredData(data);
    } else {
      setFilteredData(sorted);
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
  };

  const handleSearch = (query) => {
    setQuery(query)
  };

  const renderSortIcon = (col) => {
    if (sortConfig.key === col) {
      if (sortConfig.direction === 'asc') {
        return <FontAwesomeIcon className='dv-sort-icon' icon={faSortDown} />;
      } else if (sortConfig.direction === 'desc') {
        return <FontAwesomeIcon className='dv-sort-icon' icon={faSortUp} />;
      }
    }
    return <FontAwesomeIcon className='dv-sort-icon' icon={faSort} />;
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);


  return (
    <div>
      <SearchBar onSearch={handleSearch}/>
      <br />
      <table className="table data-viewer">
        <thead>
          <tr>
            <th scope="col" 
            onClick={() => handleSort('komoditas')}
            className='dv-header'
            >
              Komoditas 
              {renderSortIcon('komoditas')}
              </th>
            <th scope="col" 
            onClick={() => handleSort('area_provinsi')}
            className='dv-header'
            >
              Provinsi
              {renderSortIcon('area_provinsi')}
            </th>
            <th scope="col" 
            onClick={() => handleSort('area_kota')}
            className='dv-header'
            >
              Kota
              {renderSortIcon('area_kota')}
            </th>
            <th scope="col" onClick={() => handleSort('size')}
            className='dv-header'
            >
              Ukuran
              {renderSortIcon('size')}
              </th>
            <th scope="col" onClick={() => handleSort('price')}
            className='dv-header'
            >
              Harga
              {renderSortIcon('price')}
            </th>
          </tr>
        </thead>
        {!(data.length > 0) ? (
          <tr class='dv-loader-container'>
            <BeatLoader color="#36d7b7" className='dv-loader d-flex justify-content-center'/>
          </tr>
        )
        : (      
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.uuid} className='dv-element'>
                <td>{item.komoditas}</td>
                <td>{item.area_provinsi}</td>
                <td>{item.area_kota}</td>
                <td>{item.size}</td>
                <td>{item.price}</td>
              </tr>
            ))}
          </tbody>
        )}
        
      </table>
      
      <nav aria-label="Page navigation" className='data-pagination-container'>
        <ul className="dp-outer">
          {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }).map((_, index) => (
            <li
              key={index}
              className={`dp-page page-item ${currentPage === index + 1 ? 'active' : ''}`}
              onClick={() => {
                handlePageChange(index + 1)
              }}
            >
              {index + 1}
            </li>
          ))}
        </ul>
      </nav>
      
    </div>
  );
}

export default DataViewer;
