import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Welcome } from './pages/Welcome';
import { Post } from './pages/Post';

function App() {

  return (
      <div className='bg-light-white'>
        <Routes>
          <Route path='/' element={<Welcome />} />
          <Route path='/home' element={<Home />}/>
          <Route path='/post/:postId' element={<Post />}/>
        </Routes>
      </div>
  );
}

export default App;
