import React, { useState } from 'react';
import { FormControl, InputGroup} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function SearchBar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

   const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div className='search-bar'>
      <h3 className='sb-title'>Cari data</h3>
      <InputGroup className="mb-3">
        <FormControl className='sb-field'
          placeholder="Cari komoditas / area / ukuran"
          aria-label="Search"
          aria-describedby="search-button"
          onChange={handleSearch}
        />
      </InputGroup>
    </div>
  );
}

export default SearchBar;
