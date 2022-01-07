import './App.scss';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import UserContext from './utils/UserContext.js';
import Header from './components/Header.js';
import Footer from './components/Footer.js';

function App(props) {
  const getOrSetLoggedInUserPair = useState(null);

  return (
    <UserContext.Provider value={getOrSetLoggedInUserPair}>
      <Header className={props.headerClass} />
      <main className='m-3 position-relative'>
        <Outlet />
      </main>
      <Footer />
    </UserContext.Provider>
  );
}

export default App;
