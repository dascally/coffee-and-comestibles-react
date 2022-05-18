import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../features/user/userSlice';
import { Button, Dropdown, Form, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import RegisterModal from './RegisterModal';

export default function LoginDropdown(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showRegisterAccount, setShowRegisterAccount] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleLoginSubmit = (evt) => {
    evt.preventDefault();

    const form = evt.target;
    dispatch(
      login({
        email: form.elements.email.value,
        password: form.elements.password.value,
      })
    )
      .unwrap()
      .then((user) => {
        if (form.elements.remember.checked) {
          localStorage.setItem('user', JSON.stringify(user));
        }

        setShowDropdown(false);
      })
      .catch((err) => {
        setLoginError(err.message);
      });
  };
  const handleLogoutClick = () => {
    dispatch(logout());
  };

  return (
    <>
      <RegisterModal
        show={showRegisterAccount}
        setShow={setShowRegisterAccount}
      />
      <Dropdown
        className={props.className}
        as={Nav.Item}
        show={showDropdown}
        onToggle={(isOpen) => {
          setShowDropdown(!showDropdown);
        }}
      >
        {user ? (
          <>
            <Dropdown.Toggle as={Nav.Link}>Account</Dropdown.Toggle>
            <Dropdown.Menu align='end' className='bg-light mb-2 shadow'>
              <Dropdown.Item as={Link} to='/account'>
                Hi, {user.firstName}!
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item as={Link} to='/account/rewards.html'>
                Rewards
              </Dropdown.Item>
              <Dropdown.Item as={Link} to='/account/saved-orders.html'>
                Favorite orders
              </Dropdown.Item>
              <Dropdown.Item as={Link} to='/account/saved-payments.html'>
                Saved payments
              </Dropdown.Item>
              <Dropdown.Item as={Link} to='/account/change-info.html'>
                Change account info
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogoutClick}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </>
        ) : (
          <>
            <Dropdown.Toggle as={Nav.Link}>Login</Dropdown.Toggle>
            <Dropdown.Menu align='end' className='bg-light mb-2 shadow'>
              <Form className='py-1 px-3' onSubmit={handleLoginSubmit}>
                <Form.Group className='mb-2'>
                  <Form.Label htmlFor='loginEmail' className='mb-1'>
                    Email
                  </Form.Label>
                  <Form.Control
                    type='email'
                    name='email'
                    id='loginEmail'
                    required
                  />
                </Form.Group>
                <Form.Group className='mb-2'>
                  <Form.Label htmlFor='loginPassword' className='mb-1'>
                    Password
                  </Form.Label>
                  <Form.Control
                    type='password'
                    name='password'
                    id='loginPassword'
                    required
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
                {loginError ? (
                  <p
                    className='
                      text-danger
                      border
                      border-danger
                      rounded
                      px-2 py-1
                      mb-2
                    '
                  >
                    {loginError}
                  </p>
                ) : null}
                <Form.Group className='d-flex justify-content-center'>
                  <Button type='submit'>Log in</Button>
                </Form.Group>
              </Form>
              <Dropdown.Divider />
              <Dropdown.Item
                onClick={() => {
                  setShowRegisterAccount(true);
                }}
              >
                New? Make an account.
              </Dropdown.Item>
              <Dropdown.Item disabled>Forgot password?</Dropdown.Item>
            </Dropdown.Menu>
          </>
        )}
      </Dropdown>
    </>
  );
}
