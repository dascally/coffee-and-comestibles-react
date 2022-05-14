import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Collapse, Row } from 'react-bootstrap';
import { addSavedPayment } from '../features/user/userSlice';

const AddSavedPayment = () => {
  const dispatch = useDispatch();
  const jwt = useSelector((state) => state.user?.token);
  const userId = useSelector((state) => state.user?.id);
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cardNumber, setCardNumber] = useState('1234-5678-8765-4321');
  const [securityCode, setSecurityCode] = useState('');
  const [billingName, setBillingName] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setIsSubmitting(true);
    dispatch(
      addSavedPayment({
        jwt,
        userId,
        cardNumber,
        securityCode,
        billingName,
        streetAddress,
        city,
        state,
        zipCode,
      })
    ).then((result) => {
      if (result.type.match(/fulfilled$/)) {
        setSecurityCode('');
        setBillingName('');
        setStreetAddress('');
        setCity('');
        setState('');
        setZipCode('');
      }

      setIsSubmitting(false);
    });
  };

  return (
    <>
      <Button
        onClick={() => {
          setOpen(!open);
        }}
        variant='secondary'
        size='sm'
      >
        {!open ? 'Add a new payment method' : 'Cancel'}
      </Button>
      <Collapse in={open} className='mt-2'>
        <form onSubmit={handleSubmit}>
          <fieldset className='border rounded p-2'>
            <legend className='px-2 float-none' style={{ width: 'revert' }}>
              <h5>Add a new payment method</h5>
            </legend>
            <Row className='mb-1'>
              <Col xs={5} sm={4} md={3} lg={2}>
                <label htmlFor='cardNumber' className='text-nowrap'>
                  Card number
                </label>
              </Col>
              <Col xs={7} sm={8} md={9} lg={10}>
                <input
                  type='text'
                  id='cardNumber'
                  name='cardNumber'
                  value={cardNumber}
                  onChange={(evt) => {
                    setCardNumber(evt.target.value);
                  }}
                  required
                  disabled
                />
              </Col>
            </Row>
            <Row className='mb-1'>
              <Col xs={5} sm={4} md={3} lg={2}>
                <label htmlFor='securityCode' className='text-nowrap'>
                  Security code
                </label>
              </Col>
              <Col xs={7} sm={8} md={9} lg={10}>
                <input
                  type='password'
                  id='securityCode'
                  name='securityCode'
                  value={securityCode}
                  onChange={(evt) => {
                    setSecurityCode(evt.target.value);
                  }}
                  pattern='\d{3}'
                  title='3 digits'
                  required
                />
              </Col>
            </Row>
            <Row className='mb-1'>
              <Col xs={5} sm={4} md={3} lg={2}>
                <label htmlFor='billingName' className='text-nowrap'>
                  Billing name
                </label>
              </Col>
              <Col xs={7} sm={8} md={9} lg={10}>
                <input
                  type='text'
                  id='billingName'
                  name='billingName'
                  value={billingName}
                  onChange={(evt) => {
                    setBillingName(evt.target.value);
                  }}
                  required
                />
              </Col>
            </Row>
            <Row className='mb-1'>
              <Col xs={5} sm={4} md={3} lg={2}>
                <label htmlFor='streetAddress' className='text-nowrap'>
                  Street address
                </label>
              </Col>
              <Col xs={7} sm={8} md={9} lg={10}>
                <input
                  type='text'
                  id='streetAddress'
                  name='streetAddress'
                  value={streetAddress}
                  onChange={(evt) => {
                    setStreetAddress(evt.target.value);
                  }}
                  required
                />
              </Col>
            </Row>
            <Row className='mb-1'>
              <Col xs={5} sm={4} md={3} lg={2}>
                <label htmlFor='city' className='text-nowrap'>
                  City
                </label>
              </Col>
              <Col xs={7} sm={8} md={9} lg={10}>
                <input
                  type='text'
                  id='city'
                  name='city'
                  value={city}
                  onChange={(evt) => {
                    setCity(evt.target.value);
                  }}
                  required
                />
              </Col>
            </Row>
            <Row className='mb-1'>
              <Col xs={5} sm={4} md={3} lg={2}>
                <label htmlFor='state' className='text-nowrap'>
                  State
                </label>
              </Col>
              <Col xs={7} sm={8} md={9} lg={10}>
                <input
                  type='text'
                  id='state'
                  name='state'
                  value={state}
                  onChange={(evt) => {
                    setState(evt.target.value);
                  }}
                  required
                />
              </Col>
            </Row>
            <Row className='mb-1'>
              <Col xs={5} sm={4} md={3} lg={2}>
                <label htmlFor='zipCode' className='text-nowrap'>
                  Zip code
                </label>
              </Col>
              <Col xs={7} sm={8} md={9} lg={10}>
                <input
                  type='text'
                  id='zipCode'
                  name='zipCode'
                  value={zipCode}
                  onChange={(evt) => {
                    setZipCode(evt.target.value);
                  }}
                  pattern='\d{5,}'
                  title='5 or more digits'
                  required
                />
              </Col>
            </Row>
            <Button variant='primary' type='submit' disabled={isSubmitting}>
              Submit
            </Button>
          </fieldset>
        </form>
      </Collapse>
    </>
  );
};

export default AddSavedPayment;
