import './App.css'; 
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AddData from './pages/AddData'
import NavigationBar from './components/NavigationBar';

function App() {
  return (
    <BrowserRouter>
    <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddData />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
