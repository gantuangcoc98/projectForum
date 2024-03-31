import './App.css';
import AppBar from './components/Appbar';
import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Welcome } from './pages/Welcome';

function App() {

  return (
      <div className='bg-light-white'>
        <AppBar />
        
        <Routes>
          <Route path='/' element={<Welcome />} />
          <Route path='/home' element={<Home />}/>
        </Routes>
      </div>
  );
}

export default App;
