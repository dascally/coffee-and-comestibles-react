// import reportWebVitals from './reportWebVitals';
import { StrictMode } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './app/store.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from './App.js';
import Home from './screens/Home.js';
import Menu from './screens/Menu.js';
import Checkout from './screens/Checkout.js';
import Events from './screens/Events.js';
import About from './screens/About.js';
import Contact from './screens/Contact.js';
import Account from './screens/Account.js';

render(
  <StrictMode>
    <Provider store={store}>
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
            <Route path='/checkout.html' element={<Checkout />} />
            <Route path='/events.html' element={<Events />} />
            <Route path='/about.html' element={<About />} />
            <Route path='/contact.html' element={<Contact />} />
            <Route path='/account.html' element={<Account />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
