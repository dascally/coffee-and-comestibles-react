import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Nav, Row } from 'react-bootstrap';
import { viewAccountInfo } from '../features/user/userSlice';
import SavedPaymentCard from '../components/SavedPaymentCard';
import AddSavedPayment from '../components/AddSavedPayment';

export default function Account() {
  const dispatch = useDispatch();
  const jwt = useSelector((state) => state.user?.token);
  const userId = useSelector((state) => state.user?.id);
  const rewards = useSelector((state) => state.user?.rewards);
  const savedOrders = useSelector((state) => state.user?.savedOrders);
  const savedPayments = useSelector((state) => state.user?.savedPayments);

  useEffect(() => {
    if (userId) {
      dispatch(viewAccountInfo({ userId, jwt }));
    }
  }, [dispatch, userId, jwt]);

  return (
    <Container>
      <h1>Account</h1>
      {!userId ? (
        <p>You must be logged in to view account information.</p>
      ) : (
        <Row>
          <Col md={3} lg={2} className='d-flex justify-content-center mb-3'>
            <Nav as='ul' className='flex-column mx-n2'>
              <Nav.Item as='li'>
                <Nav.Link href='#rewards' className='p-1 fs-5'>
                  Rewards
                </Nav.Link>
              </Nav.Item>
              <Nav.Item as='li'>
                <Nav.Link href='#orders' className='p-1 fs-5'>
                  Saved orders
                </Nav.Link>
              </Nav.Item>
              <Nav.Item as='li'>
                <Nav.Link href='#payments' className='p-1 fs-5'>
                  Saved payments
                </Nav.Link>
              </Nav.Item>
              <Nav.Item as='li'>
                <Nav.Link href='#change' className='p-1 fs-5'>
                  Change info
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col>
            <Container as='section' id='rewards'>
              <h2>Rewards</h2>
              <p>
                You have <b className='fs-6'>{rewards}</b> rewards points!
              </p>
              <p>
                Every 100 rewards points are equivalent to $1. Apply them when
                you check out!
              </p>
            </Container>
            <Container as='section' id='orders'>
              <h2>Saved orders</h2>
            </Container>
            <Container as='section' id='payments'>
              <h2>Saved payments</h2>
              <Row xs={1} md={2} className='g-3 mb-3'>
                {savedPayments.map((savedPayment) => (
                  <Col>
                    <SavedPaymentCard {...savedPayment} />
                  </Col>
                ))}
              </Row>
              <Row>
                <Col>
                  <AddSavedPayment />
                </Col>
              </Row>
            </Container>
            <Container as='section' id='change'>
              <h2>Change account info</h2>
              <p>Change name, email, or password.</p>
            </Container>
          </Col>
        </Row>
      )}
    </Container>
  );
}
