import React from 'react';
import { FormControl, InputGroup, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function SearchBar() {
  return (
    <InputGroup className="mb-3">
      <FormControl
        placeholder="Search data..."
        aria-label="Search"
        aria-describedby="search-button"
      />
      <Button variant="outline-secondary" id="search-button">
        Search
      </Button>
    </InputGroup>
  );
}

export default SearchBar;
