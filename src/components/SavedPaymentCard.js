import { Card } from 'react-bootstrap';

const SavedPaymentCard = ({
  billingName,
  streetAddress,
  city,
  state,
  zipCode,
  cardNumberFinalDigits,
}) => {
  return (
    <Card>
      <Card.Body>
        <Card.Text>
          xxxx-xxxx-xxxx-{cardNumberFinalDigits}
          <br />
          {billingName}
          <br />
          {streetAddress}
          <br />
          {city}, {state} {zipCode}
        </Card.Text>
        <Card.Link className='link-danger'>Delete</Card.Link>
        <Card.Link className='position-absolute end-0 me-3'>Edit</Card.Link>
      </Card.Body>
    </Card>
  );
};

export default SavedPaymentCard;
