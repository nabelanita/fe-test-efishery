import React, { useState, useEffect } from 'react';
import { FormControl, InputGroup} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const SteinStore = require("stein-js-client");

function SearchBar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  const [formData, setFormData] = useState({
    komoditas: '',
    province: '',
    city: '',
    size: '',
    price: '',
  });

  const [provinsiOptions, setProvinsiOptions] = useState([]);
  const [kotaOptions, setKotaOptions] = useState({});
  const [sizeOptions, setSizeOptions] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState('');

  const url = "https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4";

  const store = new SteinStore(url);

  useEffect(() => {
    store.read("option_size")
      .then((data) => {
        const size =  Array.from(
          new Set(data.map((item) => Number(item.size)))
        ).sort((a, b) => a - b); 

        setSizeOptions(size);
      })
      .catch((error) => {
        // Handle error
        console.error("Error fetching data:", error);
      });

    store.read("option_area")
      .then((data) => {
        const filteredData = data.filter(item => item.province !== null && item.city !== null);
        const provinceCityMap = {};
        
        filteredData.forEach((item) => {
          const { province, city } = item;
          if (!provinceCityMap[province]) {
            provinceCityMap[province] = [];
          }
          provinceCityMap[province].push(city);
        });

        setProvinsiOptions(Object.keys(provinceCityMap));
        setKotaOptions(provinceCityMap);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

  }, []);

  useEffect(() => {
    onSearch(formData)
  }, [formData])
  

  const handleProvinsiChange = (e) => {
    const selectedProvinsi = e.target.value;
    setSelectedProvince(selectedProvinsi);
    setFormData({ ...formData, province: selectedProvinsi });
  };

  const handleCityChange = (e) => {
    setFormData({ ...formData, city: e.target.value });
  };

  const handleSizeChange = (e) => {
    setFormData({ ...formData, size: e.target.value });
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setFormData({ ...formData, komoditas: query });
  };

  return (
    <div className='search-bar'>
      <h3 className='sb-title'>Cari data</h3>
      <div className='row'>
        <InputGroup className="mb-3 col-12">
          <FormControl className='sb-field'
            placeholder="Cari komoditas"
            aria-label="Search"
            aria-describedby="search-button"
            onChange={handleSearch}
          />
        </InputGroup>
        <div className='col-12 col-md-4 col-lg-4'>
          <label htmlFor="province" className='af-label col-12'>Provinsi</label>
          <br />
          <select
            className='af-select col-12'
            id="province"
            name="province"
            value={formData.province}
            onChange={handleProvinsiChange}
            required
          >
            <option value="">Select Provinsi</option>
            {provinsiOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
          </select>
        </div>
        
        <div className='col-12 col-md-4 col-lg-4'>
          <label htmlFor="city" className='af-label col-12'>Kota</label>
          <br />
          <select
            id="city"
            name="city"
            value={formData.city}
            onChange={handleCityChange}
            className='af-select col-12'
            required
          >
            <option value="">Select Kota</option>
            {kotaOptions[selectedProvince]?.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
          </select>
        </div>

        <div className='af-elmt col-12 col-md-4 col-lg-4'>
            <label htmlFor="size" className='af-label col-12'>Size</label>
            <br />
            <select
              id="size"
              name="size"
              value={formData.size}
              onChange={handleSizeChange}
              className='af-select'
              required
            >
              <option value="">Select Size</option>
              {sizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

      </div>
    </div>
  );
}

export default SearchBar;
