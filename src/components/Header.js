import { NavLink } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';

export default function Header() {
  return (
    <header>
      <Navbar className='justify-content-around' expand='md' bg='secondary'>
        <Navbar.Brand className='mx-4 me-lg-5' href='/'>
          {/* TODO: add FA icon */}
          Coffee & Comestibles
        </Navbar.Brand>
        {/* TODO: make this have nav-fill and navbar-collapse--hopefully with
        idiomatic react-bootstrap, but custom classes are fine if needed */}
        <Nav className='justify-content-center' fill>
          {/* TODO: Either make a custom component wrapper to style router
          Links or find a library that does that for you */}
          <NavLink className='nav-link' to='/'>
            Home
          </NavLink>
          <Nav.Link href='/menu.html'>Menu</Nav.Link>
          <Nav.Link href='events.html'>Events</Nav.Link>
          <Nav.Link href='about.html'>About</Nav.Link>
          <Nav.Link href='contact.html'>Contact</Nav.Link>
          <div className='vr text-primary d-none d-md-block' />
          <Navbar.Text>Login placeholder</Navbar.Text>
        </Nav>
      </Navbar>
    </header>
  );
}
