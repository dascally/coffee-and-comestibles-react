import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Col, Container, Row } from 'react-bootstrap';
import SavedPaymentCard from './SavedPaymentCard';
import AddSavedPayment from '../../components/AddSavedPayment';

export default function SavedPayments() {
  const savedPayments = useSelector((state) => state.user?.savedPayments);
  const [showAddPayment, setShowAddPayment] = useState(false);

  return (
    <Container as='section' id='payments'>
      <h2>Saved payments</h2>
      {!savedPayments.length ? (
        <p>You don't have any saved payment methods.</p>
      ) : (
        <Row xs={1} md={2} className='g-3 mb-3'>
          {savedPayments.map((savedPayment) => (
            <Col key={savedPayment._id}>
              <SavedPaymentCard {...savedPayment} />
            </Col>
          ))}
        </Row>
      )}
      <Row>
        <Col>
          <Button
            onClick={() => {
              setShowAddPayment(!showAddPayment);
            }}
            variant='secondary'
            size='sm'
          >
            {!showAddPayment ? 'Add a new payment method' : 'Cancel'}
          </Button>
          <AddSavedPayment open={showAddPayment} setOpen={setShowAddPayment} />
        </Col>
      </Row>
    </Container>
  );
}
