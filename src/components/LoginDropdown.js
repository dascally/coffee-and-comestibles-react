import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { register, login, logout } from '../features/user/userSlice';
import { Button, Col, Dropdown, Form, Modal, Nav, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function LoginDropdown(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showRegisterAccount, setShowRegisterAccount] = useState(false);
  const [registerFirstname, setRegisterFirstname] = useState('');
  const [registerLastname, setRegisterLastname] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerRemember, setRegisterRemember] = useState(true);
  const [registerError, setRegisterError] = useState('');

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
      });

    setShowDropdown(false);
  };
  const handleLogoutClick = () => {
    dispatch(logout());
  };

  const handleRegisterSubmit = (evt) => {
    evt.preventDefault();

    dispatch(
      register({
        firstName: registerFirstname,
        lastName: registerLastname,
        email: registerEmail,
        password: registerPassword,
      })
    )
      .unwrap()
      .then((user) => {
        if (registerRemember) {
          localStorage.setItem('user', JSON.stringify(user));
        }

        setShowRegisterAccount(false);
        setRegisterFirstname('');
        setRegisterLastname('');
        setRegisterEmail('');
        setRegisterPassword('');
        setRegisterRemember(true);
        setRegisterError('');
      })
      .catch((err) => {
        setRegisterError(err.message);
      });
  };

  return (
    <>
      <Modal
        show={showRegisterAccount}
        onHide={() => {
          setShowRegisterAccount(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Register a new account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleRegisterSubmit}>
            {registerError ? (
              <Row className='mb-2'>
                <Col>
                  <p
                    className='
                      text-danger
                      fw-bold
                      border
                      border-danger
                      rounded
                      px-2 py-1
                      mb-0
                    '
                  >
                    {registerError}
                  </p>
                </Col>
              </Row>
            ) : null}
            <Row className='mb-1 g-1'>
              <Form.Group controlId='register-firstname' as={Col}>
                <Form.Label className='mb-1' style={{ width: '14ch' }}>
                  First name
                </Form.Label>
                <Form.Control
                  type='text'
                  name='firstname'
                  required
                  value={registerFirstname}
                  onChange={(evt) => {
                    setRegisterFirstname(evt.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group controlId='register-lastname' as={Col}>
                <Form.Label className='mb-1' style={{ width: '14ch' }}>
                  Last name
                </Form.Label>
                <Form.Control
                  type='text'
                  name='lastname'
                  required
                  value={registerLastname}
                  onChange={(evt) => {
                    setRegisterLastname(evt.target.value);
                  }}
                />
              </Form.Group>
            </Row>
            <Row className='mb-1'>
              <Form.Group controlId='register-email' as={Col}>
                <Form.Label className='mb-1'>Email</Form.Label>
                <Form.Control
                  type='email'
                  name='email'
                  required
                  value={registerEmail}
                  onChange={(evt) => {
                    setRegisterEmail(evt.target.value);
                  }}
                />
              </Form.Group>
            </Row>
            <Row className='mb-2'>
              <Form.Group controlId='register-email' as={Col}>
                <Form.Label className='mb-1'>Password</Form.Label>
                <Form.Control
                  type='password'
                  name='password'
                  required
                  value={registerPassword}
                  onChange={(evt) => {
                    setRegisterPassword(evt.target.value);
                  }}
                />
              </Form.Group>
            </Row>
            <Row className='mb-2'>
              <Form.Group controlId='register-remember' as={Col}>
                <Form.Check
                  type='checkbox'
                  name='remember'
                  label={'Remember login?'}
                  checked={registerRemember}
                  onChange={(evt) => {
                    setRegisterRemember(evt.target.checked);
                  }}
                />
              </Form.Group>
            </Row>
            <div className='d-flex justify-content-center'>
              <Button type='submit'>Register</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
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
              <Dropdown.Item
                onClick={() => {
                  setShowRegisterAccount(true);
                }}
              >
                New? Make an account.
              </Dropdown.Item>
              <Dropdown.Item>Forgot password?</Dropdown.Item>
            </Dropdown.Menu>
          </>
        )}
      </Dropdown>
    </>
  );
}
