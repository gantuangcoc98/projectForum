// import logo from './logo.svg';
import './App.css';
import AppBar from './Appbar';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    
      <div className='wrapper'>
        <AppBar />
        
        <Routes>
          <Route
            path='/'
            element={<></>}
          ></Route>
        </Routes>
      </div>
  );
}

export default App;
