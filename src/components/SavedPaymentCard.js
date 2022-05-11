import { useDispatch, useSelector } from 'react-redux';
import { Button, Card } from 'react-bootstrap';
import { deleteSavedPayment } from '../features/user/userSlice';

const SavedPaymentCard = ({
  billingName,
  streetAddress,
  city,
  state,
  zipCode,
  cardNumberFinalDigits,
  _id,
}) => {
  const dispatch = useDispatch();
  const jwt = useSelector((state) => state.user?.token);
  const userId = useSelector((state) => state.user?.id);

  const handleDeleteClick = (evt) => {
    dispatch(deleteSavedPayment({ jwt, userId, paymentId: _id }));
  };

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
        <Button
          variant='link'
          className='text-danger p-0'
          onClick={handleDeleteClick}
        >
          Delete
        </Button>
        <Button variant='link' className='position-absolute end-0 p-0 me-3'>
          Edit
        </Button>
      </Card.Body>
    </Card>
  );
};

export default SavedPaymentCard;
