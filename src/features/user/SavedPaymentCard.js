import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card } from 'react-bootstrap';
import { deleteSavedPayment } from './userSlice';
import EditPaymentForm from './EditPaymentForm';

const SavedPaymentCard = (props) => {
  const {
    billingName,
    streetAddress,
    city,
    state,
    zipCode,
    cardNumberFinalDigits,
    _id,
  } = props;
  const dispatch = useDispatch();
  const jwt = useSelector((state) => state.user?.token);
  const userId = useSelector((state) => state.user?.id);
  const [editing, setEditing] = useState(false);

  const handleDeleteClick = (evt) => {
    dispatch(deleteSavedPayment({ jwt, userId, paymentId: _id }));
  };
  const handleEditClick = (evt) => {
    setEditing(!editing);
  };

  return (
    <Card>
      <Card.Body>
        {!editing ? (
          <Card.Text>
            xxxx-xxxx-xxxx-{cardNumberFinalDigits}
            <br />
            {billingName}
            <br />
            {streetAddress}
            <br />
            {city}, {state} {zipCode}
          </Card.Text>
        ) : (
          <EditPaymentForm {...props} doneEditing={() => setEditing(false)} />
        )}
        {!editing ? (
          <Button
            variant='link'
            className='text-danger p-0 position-absolute start-0 ms-3'
            onClick={handleDeleteClick}
          >
            Delete
          </Button>
        ) : null}
        <Button
          variant='link'
          className='p-0 ms-auto d-block'
          onClick={handleEditClick}
        >
          {!editing ? 'Edit' : 'Cancel'}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default SavedPaymentCard;
