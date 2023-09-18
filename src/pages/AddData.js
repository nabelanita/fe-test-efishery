import React, { useState, useEffect } from 'react';

import Container from 'react-bootstrap/Container';

const SteinStore = require("stein-js-client");

function AddData() {
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

  // Event handler for form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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

  const handleProvinsiChange = (e) => {
    const selectedProvinsi = e.target.value;
    setSelectedProvince(selectedProvinsi);
    setFormData({ ...formData, province: selectedProvinsi });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // store
    // .append("list", [
    //   {
    //     komoditas: formData.komoditas,
    //     area_provinsi: formData.province,
    //     area_kota: formData.city,
    //     size: formData.size,
    //     price: formData.price
    //   }
    // ])
    // .then(res => {
    //   console.log(res);
    // });
  };

  return (
    <div className="add-form">
      <Container>
        <h3 className='af-title'>Tambah Data Baru</h3>
        <div className='af-container d-flex justify-content-center'>
          <form onSubmit={handleSubmit} className='af-form'>
            <div className='af-elmt'>
              <label htmlFor="komoditas" className='af-label'>Komoditas</label>
              <br />
              <input
                className='af-text'
                type="text"
                id="komoditas"
                name="komoditas"
                value={formData.komoditas}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className='af-elmt'>
              <label htmlFor="province" className='af-label'>Provinsi</label>
              <br />
              <select
                className='af-select'
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
            <div  className='af-elmt'>
              <label htmlFor="city" className='af-label'>Kota</label>
              <br />
              <select
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className='af-select'
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
            <div className='af-elmt'>
              <label htmlFor="size" className='af-label'>Size</label>
              <br />
              <select
                id="size"
                name="size"
                value={formData.size}
                onChange={handleInputChange}
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
            <div className='af-elmt'>
              <label htmlFor="price" className='af-label'>Harga</label>
              <br />
              <input
                className='af-text'
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className='btn af-submit'>Submit</button>
          </form>
        </div>
      </Container>
    </div>
  );
}

export default AddData;
