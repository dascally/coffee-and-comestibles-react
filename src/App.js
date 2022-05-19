import './App.scss';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from './features/user/userSlice';
import { fetchMenu } from './features/menu/menuSlice';
import { fetchEvents } from './features/events/eventsSlice';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

function App(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      dispatch(setUser(JSON.parse(user)));
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchMenu());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchEvents());
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
