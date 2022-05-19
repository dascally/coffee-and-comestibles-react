import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Row } from 'react-bootstrap';
import { editSavedPayment } from './userSlice';

const EditPaymentForm = ({
  billingName,
  streetAddress,
  city,
  state,
  zipCode,
  cardNumberFinalDigits,
  _id,
  doneEditing,
}) => {
  const dispatch = useDispatch();
  const jwt = useSelector((state) => state.user?.token);
  const userId = useSelector((state) => state.user?.id);
  const [newBillingName, setNewBillingName] = useState(billingName);
  const [newStreetAddress, setNewStreetAddress] = useState(streetAddress);
  const [newCity, setNewCity] = useState(city);
  const [newState, setNewState] = useState(state);
  const [newZipCode, setNewZipCode] = useState(zipCode);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    dispatch(
      editSavedPayment({
        userId,
        jwt,
        paymentId: _id,
        billingName: newBillingName,
        streetAddress: newStreetAddress,
        city: newCity,
        state: newState,
        zipCode: newZipCode,
      })
    ).then((result) => {
      if (result.type.match(/fulfilled$/)) {
        doneEditing();
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Row className='mb-1'>
        <Col>xxxx-xxxx-xxxx-{cardNumberFinalDigits}</Col>
      </Row>
      <Row className='mb-1'>
        <Col xs={12} sm={3} md={12} lg={4} xl={3}>
          <label htmlFor='#billingName' className='text-nowrap'>
            Billing name
          </label>
        </Col>
        <Col>
          <input
            type='text'
            name='billingName'
            id='billingName'
            value={newBillingName}
            onChange={(evt) => {
              setNewBillingName(evt.target.value);
            }}
            className='w-100'
          />
        </Col>
      </Row>
      <Row className='mb-1'>
        <Col xs={12} sm={3} md={12} lg={4} xl={3}>
          <label htmlFor='#streetAddress' className='text-nowrap'>
            Street address
          </label>
        </Col>
        <Col>
          <input
            type='text'
            name='streetAddress'
            id='streetAddress'
            value={newStreetAddress}
            onChange={(evt) => {
              setNewStreetAddress(evt.target.value);
            }}
            className='w-100'
          />
        </Col>
      </Row>
      <Row className='mb-1'>
        <Col xs={12} sm={3} md={12} lg={4} xl={3}>
          <label htmlFor='#city' className='text-nowrap'>
            City
          </label>
        </Col>
        <Col>
          <input
            type='text'
            name='city'
            id='city'
            value={newCity}
            onChange={(evt) => {
              setNewCity(evt.target.value);
            }}
            className='w-100'
          />
        </Col>
      </Row>
      <Row className='mb-1'>
        <Col xs={12} sm={3} md={12} lg={4} xl={3}>
          <label htmlFor='#state' className='text-nowrap'>
            State
          </label>
        </Col>
        <Col>
          <input
            type='text'
            name='state'
            id='state'
            value={newState}
            onChange={(evt) => {
              setNewState(evt.target.value);
            }}
            className='w-100'
          />
        </Col>
      </Row>
      <Row className='mb-1'>
        <Col xs={12} sm={3} md={12} lg={4} xl={3}>
          <label htmlFor='#zipCode' className='text-nowrap'>
            Zip code
          </label>
        </Col>
        <Col>
          <input
            type='text'
            name='zipCode'
            id='zipCode'
            value={newZipCode}
            onChange={(evt) => {
              setNewZipCode(evt.target.value);
            }}
            className='w-100'
          />
        </Col>
      </Row>
      <div className='d-flex justify-content-center mb-1'>
        <Button type='submit' variant='primary' className='py-1 px-2'>
          Submit changes
        </Button>
      </div>
    </form>
  );
};

export default EditPaymentForm;
