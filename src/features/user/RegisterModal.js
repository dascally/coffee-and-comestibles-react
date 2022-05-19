import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from './userSlice';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';

export default function RegisterModal({ show, setShow }) {
  const dispatch = useDispatch();
  const [registerFirstname, setRegisterFirstname] = useState('');
  const [registerLastname, setRegisterLastname] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerRemember, setRegisterRemember] = useState(true);
  const [registerError, setRegisterError] = useState('');

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

        setShow(false);
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
    <Modal
      show={show}
      onHide={() => {
        setShow(false);
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
  );
}
