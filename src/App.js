import './App.scss';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import Home from './views/Home.js';

function App() {
  return (
    <>
      <Header />
      <main>
        <Home />
      </main>
      <Footer />
    </>
  );
}

export default App;
