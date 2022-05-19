import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Accordion, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { confirmPassword, updateAccount, deleteAccount } from './userSlice';

export default function ChangeInfo() {
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.user.id);
  const userToken = useSelector((state) => state.user.token);
  const userEmail = useSelector((state) => state.user.email);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [deletionPassword, setDeletionPassword] = useState('');
  const [deletionPasswordConfirmed, setDeletionPasswordConfirmed] =
    useState('');
  const [changePasswordValidated, setChangePasswordValidated] = useState(false);
  const [notification, setNotification] = useState('');
  const confirmNewPasswordRef = useRef(null);
  const timerId = useRef(null);

  const setTimedNotification = (message) => {
    clearTimeout(timerId.current);
    setNotification(message);
    timerId.current = setTimeout(() => {
      setNotification('');
    }, 3000);
  };

  const handleChangeNameSubmit = (evt) => {
    evt.preventDefault();

    const updatedUser = {};
    if (firstName) updatedUser.firstName = firstName;
    if (lastName) updatedUser.lastName = lastName;

    dispatch(updateAccount({ userId, jwt: userToken, ...updatedUser }))
      .unwrap()
      .then((action) => {
        setTimedNotification(
          `Name successfully changed to ${firstName} ${lastName}.`
        );
        setFirstName('');
        setLastName('');
      })
      .catch((err) => {
        setTimedNotification(err.message);
      });
  };

  const handleChangeEmailSubmit = (evt) => {
    evt.preventDefault();

    dispatch(updateAccount({ userId, jwt: userToken, email }))
      .unwrap()
      .then((action) => {
        setTimedNotification(`Email successfully changed to ${email}.`);
        setEmail('');
      })
      .catch((err) => {
        setTimedNotification(err.message);
      });
  };

  const handleChangePasswordSubmit = (evt) => {
    evt.preventDefault();

    dispatch(confirmPassword({ email: userEmail, password: oldPassword }))
      .unwrap()
      .then((action) => {
        dispatch(
          updateAccount({ userId, jwt: userToken, password: newPassword })
        )
          .unwrap()
          .then((action) => {
            setTimedNotification('Password successfully changed.');
            setOldPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
            setChangePasswordValidated(false);
          })
          .catch((err) => {
            setTimedNotification(err.message);
          });
      })
      .catch((err) => {
        setTimedNotification('Old password is incorrect.');
      });
  };

  const handleDeletionConfirmPasswordSubmit = (evt) => {
    evt.preventDefault();

    dispatch(
      confirmPassword({ email: userEmail, password: deletionPassword })
    ).then((action) => {
      if (action.type.match(/fulfilled$/)) {
        setDeletionPasswordConfirmed(true);
      }
    });
  };

  const handleDeleteAccountClick = (evt) => {
    dispatch(deleteAccount({ userId, jwt: userToken }));
  };

  const handleConfirmNewPasswordChange = (evt) => {
    setConfirmNewPassword(evt.target.value);
    setChangePasswordValidated(true);
  };

  useEffect(() => {
    if (confirmNewPassword !== newPassword) {
      confirmNewPasswordRef.current.setCustomValidity(
        'Passwords do not match.'
      );
    } else {
      confirmNewPasswordRef.current.setCustomValidity('');
    }
  }, [newPassword, confirmNewPassword]);

  return (
    <Container as='section' id='change'>
      <h2>Change account info</h2>
      {notification ? <p>{notification}</p> : null}
      <Accordion style={{ maxWidth: '35em' }}>
        <Accordion.Item eventKey='change-name'>
          <Accordion.Header>Change name</Accordion.Header>
          <Accordion.Body>
            <Form onSubmit={handleChangeNameSubmit}>
              <Row className='mb-2 g-1'>
                <Form.Group controlId='change-firstname' as={Col}>
                  <Form.Label className='mb-1' style={{ width: '14ch' }}>
                    First name
                  </Form.Label>
                  <Form.Control
                    type='text'
                    name='firstname'
                    required
                    value={firstName}
                    onChange={(evt) => {
                      setFirstName(evt.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group controlId='change-lastname' as={Col}>
                  <Form.Label className='mb-1' style={{ width: '14ch' }}>
                    Last name
                  </Form.Label>
                  <Form.Control
                    type='text'
                    name='lastname'
                    required
                    value={lastName}
                    onChange={(evt) => {
                      setLastName(evt.target.value);
                    }}
                  />
                </Form.Group>
              </Row>
              <div className='d-flex justify-content-center'>
                <Button type='submit'>Change name</Button>
              </div>
            </Form>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey='change-email'>
          <Accordion.Header>Change email</Accordion.Header>
          <Accordion.Body>
            <Form onSubmit={handleChangeEmailSubmit}>
              <Form.Group controlId='change-email' className='mb-2'>
                <Form.Label className='mb-1' style={{ width: '14ch' }}>
                  Email
                </Form.Label>
                <Form.Control
                  type='email'
                  name='email'
                  required
                  value={email}
                  onChange={(evt) => {
                    setEmail(evt.target.value);
                  }}
                />
              </Form.Group>
              <div className='d-flex justify-content-center'>
                <Button type='submit'>Change email</Button>
              </div>
            </Form>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey='change-password'>
          <Accordion.Header>Change password</Accordion.Header>
          <Accordion.Body>
            <Form
              onSubmit={handleChangePasswordSubmit}
              validated={changePasswordValidated}
            >
              <Form.Group controlId='changePasswordOld' className='mb-1'>
                <Form.Label className='mb-1' style={{ width: '14ch' }}>
                  Old password
                </Form.Label>
                <Form.Control
                  type='password'
                  name='old-password'
                  required
                  value={oldPassword}
                  onChange={(evt) => {
                    setOldPassword(evt.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group controlId='changePasswordNew' className='mb-1'>
                <Form.Label className='mb-1' style={{ width: '14ch' }}>
                  New password
                </Form.Label>
                <Form.Control
                  type='password'
                  name='new-password'
                  required
                  value={newPassword}
                  onChange={(evt) => {
                    setNewPassword(evt.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group controlId='changePasswordConfirm' className='mb-2'>
                <Form.Label className='mb-1' style={{ width: '20ch' }}>
                  Confirm new password
                </Form.Label>
                <Form.Control
                  type='password'
                  name='confirm-new-password'
                  required
                  value={confirmNewPassword}
                  onChange={handleConfirmNewPasswordChange}
                  ref={confirmNewPasswordRef}
                />
              </Form.Group>
              <div className='d-flex justify-content-center'>
                <Button type='submit'>Change password</Button>
              </div>
            </Form>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey='delete-account'>
          <Accordion.Header>Delete account</Accordion.Header>
          <Accordion.Body className='border border-danger'>
            <p>Are you sure you want to delete your account?</p>
            {!deletionPasswordConfirmed ? (
              <Form onSubmit={handleDeletionConfirmPasswordSubmit}>
                <Form.Group controlId='deletion-password' className='mb-2'>
                  <Form.Label className='mb-1'>
                    Enter your password to confirm:
                  </Form.Label>
                  <Form.Control
                    type='password'
                    name='deletion-password'
                    required
                    value={deletionPassword}
                    onChange={(evt) => {
                      setDeletionPassword(evt.target.value);
                    }}
                  />
                </Form.Group>
                <div className='d-flex justify-content-center'>
                  <Button type='submit' variant='danger'>
                    Confirm password
                  </Button>
                </div>
              </Form>
            ) : (
              <div className='d-flex justify-content-center'>
                <Button
                  type='button'
                  variant='danger'
                  onClick={handleDeleteAccountClick}
                >
                  Delete account
                </Button>
              </div>
            )}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
}
