import { Link, NavLink } from 'react-router-dom';
import { Col, Navbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMugHot } from '@fortawesome/free-solid-svg-icons';
import LoginDropdown from '../features/user/LoginDropdown';

export default function Header(props) {
  return (
    <header className={props.className}>
      <Navbar className='justify-content-around' expand='md' bg='secondary'>
        <Link className='navbar-brand mx-4 me-lg-5' to='/'>
          <FontAwesomeIcon icon={faMugHot} /> Coffee & Comestibles
        </Link>
        <Navbar.Collapse
          id='globalNav'
          className='justify-content-center navbar-nav nav-fill'
        >
          <NavLink className='nav-link' to='/'>
            Home
          </NavLink>
          <NavLink className='nav-link' to='/menu.html'>
            Menu
          </NavLink>
          <NavLink className='nav-link' to='/events.html'>
            Events
          </NavLink>
          <NavLink className='nav-link' to='/about.html'>
            About
          </NavLink>
          <NavLink className='nav-link' to='/contact.html'>
            Contact
          </NavLink>
          <div className='vr text-primary d-none d-md-block' />
          <LoginDropdown className='mb-2 mb-md-0' />
        </Navbar.Collapse>
        <Col className='d-md-none' />
        <Navbar.Toggle
          className='mx-3'
          label='Toggle navigation'
          aria-controls='globalNav'
        />
      </Navbar>
    </header>
  );
}
