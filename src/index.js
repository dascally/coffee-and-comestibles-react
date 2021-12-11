// import reportWebVitals from './reportWebVitals';
import { StrictMode } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from './App.js';
import Home from './views/Home.js';
import Menu from './views/Menu.js';
import Events from './views/Events.js';
import About from './views/About.js';
import Contact from './views/Contact.js';

render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={<App headerClass='position-absolute top-0 w-100' />}
        >
          <Route path='/index.html' element={<Home />} />
          <Route index element={<Home />} />
        </Route>
        <Route path='/' element={<App />}>
          <Route path='/menu.html' element={<Menu />} />
          <Route path='/events.html' element={<Events />} />
          <Route path='/about.html' element={<About />} />
          <Route path='/contact.html' element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
