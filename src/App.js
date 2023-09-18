import logo from './logo.svg';
import './App.css'; 

import NavigationBar from './components/NavigationBar';
import SearchBar from './components/SearchBar';

import Container from 'react-bootstrap/Container';
import DataViewer from './components/DataViewer';

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <br />
      <Container>
        <SearchBar />
        <br />
        <DataViewer />
      </Container>
    </div>
  );
}

export default App;
