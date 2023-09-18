import logo from './logo.svg';
import './App.css'; 

import NavigationBar from './components/NavigationBar';

import Container from 'react-bootstrap/Container';
import DataViewer from './components/DataViewer';

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <br />
      <Container>
        <DataViewer />
      </Container>
    </div>
  );
}

export default App;
