import './App.scss';
import { Outlet } from 'react-router-dom';
import Header from './components/Header.js';
import Footer from './components/Footer.js';

function App(props) {
  return (
    <>
      <Header className={props.headerClass} />
      <main className='m-3'>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
