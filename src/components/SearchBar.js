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
    <InputGroup className="mb-3">
      <FormControl
        placeholder="Cari komoditas/area/ukuran"
        aria-label="Search"
        aria-describedby="search-button"
        onChange={handleSearch}
      />
    </InputGroup>
  );
}

export default SearchBar;
