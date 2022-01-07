import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button, Col, Dropdown, Form, Nav, Navbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMugHot } from '@fortawesome/free-solid-svg-icons';
import UserContext from '../utils/UserContext.js';

export default function Header(props) {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

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
          {/* TODO: make component for logged in state and move dropdown to
          component */}
          {loggedInUser ? (
            <p>Hi {loggedInUser}!</p>
          ) : (
            <Dropdown className='mb-2 mb-md-0' as={Nav.Item}>
              <Dropdown.Toggle as={Nav.Link}>Login</Dropdown.Toggle>
              <Dropdown.Menu align='end' className='bg-light mb-2 shadow'>
                <Form
                  className='py-1 px-3'
                  onSubmit={() => setLoggedInUser('Danny')}
                >
                  <Form.Group className='mb-2'>
                    <Form.Label htmlFor='loginEmail' className='mb-1'>
                      Email
                    </Form.Label>
                    <Form.Control type='email' name='email' id='loginEmail' />
                  </Form.Group>
                  <Form.Group className='mb-2'>
                    <Form.Label htmlFor='loginPassword' className='mb-1'>
                      Password
                    </Form.Label>
                    <Form.Control
                      type='password'
                      name='password'
                      id='loginPassword'
                    />
                  </Form.Group>
                  <Form.Group className='mb-2'>
                    <Form.Check
                      type='checkbox'
                      name='remember'
                      id='loginRemember'
                      label='Remember me'
                    />
                  </Form.Group>
                  <Form.Group className='d-flex justify-content-center'>
                    <Button type='submit'>Log in</Button>
                  </Form.Group>
                </Form>
                <Dropdown.Divider />
                <Dropdown.Item>New? Make an account.</Dropdown.Item>
                <Dropdown.Item>Forgot password?</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
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
