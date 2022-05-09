import './App.scss';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from './features/user/userSlice.js';
import { fetchMenu } from './features/menu/menuSlice.js';
import { Outlet } from 'react-router-dom';
import Header from './components/Header.js';
import Footer from './components/Footer.js';

function App(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      dispatch(setUser(JSON.parse(user)));
    }

    dispatch(fetchMenu());
  }, [dispatch]);

  return (
    <>
      <Header className={props.headerClass} />
      <main className='m-3 position-relative'>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
