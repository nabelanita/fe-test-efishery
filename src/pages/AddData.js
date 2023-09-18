import React, { useState, useEffect } from 'react';

import Container from 'react-bootstrap/Container';

const SteinStore = require("stein-js-client");

function AddData() {
  // Define state variables to store form input values
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

  // Event handler for form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    const url = "https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4";

    const store = new SteinStore(url);

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

        // Set the provinsiOptions to the unique province values
        setProvinsiOptions(Object.keys(provinceCityMap));
        
        // Set the kotaOptions object
        setKotaOptions(provinceCityMap);
      })
      .catch((error) => {
        // Handle error
        console.error("Error fetching data:", error);
      });

  }, []);

  const handleProvinsiChange = (e) => {
    const selectedProvinsi = e.target.value;
    setSelectedProvince(selectedProvinsi);
    setFormData({ ...formData, province: selectedProvinsi });
  };
  

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="Home">
      <Container>
        <h3>Tambah Data Baru</h3>
        <hr />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="komoditas">Komoditas:</label>
            <input
              type="text"
              id="komoditas"
              name="komoditas"
              value={formData.komoditas}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="province">Provinsi:</label>
            <select
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
          <div>
            <label htmlFor="city">Kota:</label>
            <select
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
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
          <div>
            <label htmlFor="size">Size:</label>
            <select
              id="size"
              name="size"
              value={formData.size}
              onChange={handleInputChange}
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
          <div>
            <label htmlFor="price">Harga:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </Container>
    </div>
  );
}

export default AddData;
