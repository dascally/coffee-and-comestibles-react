import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Col, Container, Nav, Row } from 'react-bootstrap';
import { viewAccountInfo, logout } from '../features/user/userSlice';
import { Outlet } from 'react-router-dom';

export default function Account() {
  const dispatch = useDispatch();
  const jwt = useSelector((state) => state.user?.token);
  const userId = useSelector((state) => state.user?.id);
  const accountDeleted = useSelector((state) => state.user?.deleted);

  useEffect(() => {
    if (userId) {
      dispatch(viewAccountInfo({ userId, jwt }));
    }
  }, [dispatch, userId, jwt]);

  useEffect(() => {
    if (accountDeleted) {
      setTimeout(() => {
        dispatch(logout());
      }, 3000);
    }
  }, [dispatch, accountDeleted]);

  return (
    <Container>
      <h1>Account</h1>
      {accountDeleted ? (
        <p>Account successfully deleted!</p>
      ) : !userId ? (
        <p>You must be logged in to view account information.</p>
      ) : (
        <Row>
          <Col md={3} lg={2} className='d-flex justify-content-center mb-3'>
            <Nav as='ul' className='flex-column mx-n2'>
              <Nav.Item as='li'>
                <NavLink to='rewards.html' className='nav-link p-1 fs-5'>
                  Rewards
                </NavLink>
              </Nav.Item>
              <Nav.Item as='li'>
                <NavLink to='saved-orders.html' className='nav-link p-1 fs-5'>
                  Saved orders
                </NavLink>
              </Nav.Item>
              <Nav.Item as='li'>
                <NavLink to='saved-payments.html' className='nav-link p-1 fs-5'>
                  Saved payments
                </NavLink>
              </Nav.Item>
              <Nav.Item as='li'>
                <NavLink to='change-info.html' className='nav-link p-1 fs-5'>
                  Change info
                </NavLink>
              </Nav.Item>
            </Nav>
          </Col>
          <Col>
            <Outlet />
          </Col>
        </Row>
      )}
    </Container>
  );
}
