import './App.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { checkAuth } from './features/user';

import Header from './components/Header';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import HomeNew from './pages/HomeNew'
import ChatRoom from './pages/ChatRoom';

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkAuth());
  }, [])

  return (
    // <div className='container dark'>
      // <div className='app'>
        <BrowserRouter>
          {/* <Header /> */}
          <Routes>
            <Route path='/' element={<HomeNew />} />
            <Route path='/room/:slug' element={<ChatRoom />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
          </Routes>
        </BrowserRouter>
      // </div>
    // </div>
  );
}

export default App;