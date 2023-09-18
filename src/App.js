import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AddData from './pages/AddData'
import NavigationBar from './components/NavigationBar';

function App() {
  return (
    <BrowserRouter>
    <NavigationBar />
    <div className='main-app'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddData />} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
