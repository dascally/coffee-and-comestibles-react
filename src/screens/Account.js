import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import { viewAccountInfo } from '../features/user/userSlice';
import SavedPaymentCard from '../components/SavedPaymentCard';

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
          <Col md={3} lg={2}></Col>
          <Col>
            <Container as='section'>
              <h2>Rewards</h2>
              <p>
                You have <b className='fs-6'>{rewards}</b> rewards points!
              </p>
              <p>
                Every 100 rewards points are equivalent to $1. Apply them when
                you check out!
              </p>
            </Container>
            <Container as='section'>
              <h2>Saved Orders</h2>
            </Container>
            <Container as='section'>
              <h2>Saved Payments</h2>
              <Row xs={1} md={2} className='g-3'>
                {savedPayments.map((savedPayment) => (
                  <Col>
                    <SavedPaymentCard {...savedPayment} />
                  </Col>
                ))}
              </Row>
            </Container>
            <Container as='section'>
              <h2>Administration</h2>
              <p>Change name, email, or password.</p>
            </Container>
          </Col>
        </Row>
      )}
    </Container>
  );
}
