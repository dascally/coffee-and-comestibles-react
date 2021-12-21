import './App.scss';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import UserContext from './utils/UserContext.js';
import Header from './components/Header.js';
import Footer from './components/Footer.js';

function App(props) {
  const [loggedInUser, setLoggedInUser] = useState(null);

  return (
    <UserContext.Provider value={loggedInUser}>
      <Header className={props.headerClass} setLoggedInUser={setLoggedInUser} />
      <main className='m-3 position-relative'>
        <Outlet />
      </main>
      <Footer />
    </UserContext.Provider>
  );
}

export default App;
