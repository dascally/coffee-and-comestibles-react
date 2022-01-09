import { useContext, useState } from 'react';
import { Button, Dropdown, Form, Nav } from 'react-bootstrap';
import UserContext from '../utils/UserContext.js';

export default function LoginDropdown(props) {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <Dropdown
      className={props.className}
      as={Nav.Item}
      show={showDropdown}
      onToggle={(isOpen) => {
        setShowDropdown(!showDropdown);
      }}
    >
      {loggedInUser ? (
        <>
          <Dropdown.Toggle as={Nav.Link}>Account</Dropdown.Toggle>
          <Dropdown.Menu align='end' className='bg-light mb-2 shadow'>
            <Dropdown.Item>Hi, {loggedInUser}!</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>Rewards</Dropdown.Item>
            <Dropdown.Item>Favorite Orders</Dropdown.Item>
            <Dropdown.Item>Account Settings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={() => setLoggedInUser(null)}>
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </>
      ) : (
        <>
          <Dropdown.Toggle as={Nav.Link}>Login</Dropdown.Toggle>
          <Dropdown.Menu align='end' className='bg-light mb-2 shadow'>
            <Form
              className='py-1 px-3'
              onSubmit={() => {
                setLoggedInUser('Danny');
                setShowDropdown(false);
              }}
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
        </>
      )}
    </Dropdown>
  );
}
