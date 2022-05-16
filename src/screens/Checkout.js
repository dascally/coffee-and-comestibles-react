import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { viewSavedPayments } from '../features/user/userSlice';
import { placeOrder } from '../features/order/orderSlice';
import { Button, Col, Container, Modal, Row, Table } from 'react-bootstrap';
import OrderItemTableRow from '../components/OrderItemTableRow';
import AddSavedPayment from '../components/AddSavedPayment';

export default function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jwt = useSelector((state) => state.user?.token);
  const userId = useSelector((state) => state.user?.id);
  const firstName = useSelector((state) => state.user?.firstName);
  const lastName = useSelector((state) => state.user?.lastName);
  const orderList = useSelector((state) => state.order);
  const savedPayments = useSelector((state) => state.user?.savedPayments);
  const [contactName, setContactName] = useState(`${firstName} ${lastName}`);
  const [contactPhone, setContactPhone] = useState('');
  const [ccInfoId, setCcInfoId] = useState('');
  const selectedPayment = useSelector((state) =>
    state.user?.savedPayments.find((payment) => payment._id === ccInfoId)
  );
  const [showAddPayment, setShowAddPayment] = useState(false);

  useEffect(() => {
    if (userId) {
      dispatch(viewSavedPayments({ userId, jwt }));
    }
  }, [dispatch, userId, jwt]);

  const handlePlaceOrderClick = (evt) => {
    evt.preventDefault();

    dispatch(
      placeOrder({
        userId,
        orderList,
        contactPhone,
        contactName,
        ccInfo: ccInfoId,
      })
    )
      .unwrap()
      .then((invoice) => {
        navigate(`/order-confirmation/${invoice._id}`);
      });
  };

  return (
    <>
      <Modal
        show={showAddPayment}
        onHide={() => {
          setShowAddPayment(false);
        }}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <AddSavedPayment open={showAddPayment} setOpen={setShowAddPayment} />
        </Modal.Body>
      </Modal>

      <Container>
        <h1>Checkout</h1>
        {!userId ? (
          <p>Please log in to place an order.</p>
        ) : (
          <>
            <Table striped>
              <thead>
                <tr>
                  <th>Item</th>
                  <th style={{ width: '5em' }}>Price</th>
                </tr>
              </thead>
              <tbody>
                {orderList.map((orderItem) => {
                  return (
                    <OrderItemTableRow
                      orderItem={orderItem}
                      key={orderItem.id}
                    />
                  );
                })}
              </tbody>
            </Table>
            <Row>
              <Col>
                <form onSubmit={handlePlaceOrderClick}>
                  <div className='mb-1'>
                    <label htmlFor='contact-name' style={{ width: '15ch' }}>
                      Contact name
                    </label>
                    <input
                      type='text'
                      id='contact-name'
                      required
                      value={contactName}
                      onChange={(evt) => {
                        setContactName(evt.target.value);
                      }}
                    />
                  </div>
                  <div className='mb-1'>
                    <label htmlFor='contact-tel' style={{ width: '15ch' }}>
                      Contact phone
                    </label>
                    <input
                      type='tel'
                      id='contact-tel'
                      required
                      value={contactPhone}
                      onChange={(evt) => {
                        setContactPhone(evt.target.value);
                      }}
                    />
                  </div>
                  <div className='mb-1'>
                    <label htmlFor='payment-method' style={{ width: '15ch' }}>
                      Payment method
                    </label>
                    {/* Choose payment method or enter new one and checkbox to save */}
                    {/* Will have to get payment methods now, or else change to get them with the rest of user data */}
                    <select
                      id='payment-method'
                      required
                      value={ccInfoId}
                      onChange={(evt) => {
                        setCcInfoId(evt.target.value);
                      }}
                      className='me-2'
                    >
                      <option value='' label='Choose a card' />
                      {savedPayments.map((payment) => (
                        <option
                          key={payment._id}
                          value={payment._id}
                          label={`xxxx-xxxx-xxxx-${payment.cardNumberFinalDigits}`}
                        />
                      ))}
                    </select>
                    <br />
                    {selectedPayment ? (
                      <p
                        key={selectedPayment._id}
                        className='mb-0'
                        style={{ marginInlineStart: '16ch' }}
                      >
                        xxxx-xxxx-xxxx-{selectedPayment.cardNumberFinalDigits}
                        <br />
                        {selectedPayment.billingName}
                        <br />
                        {selectedPayment.streetAddress}
                        <br />
                        {selectedPayment.city}, {selectedPayment.state}{' '}
                        {selectedPayment.zipCode}
                      </p>
                    ) : null}
                  </div>
                  <div className='mb-2'>
                    <Button
                      type='button'
                      variant='secondary'
                      size='sm'
                      onClick={(evt) => {
                        setShowAddPayment(true);
                      }}
                    >
                      Add a new payment method
                    </Button>
                  </div>
                  <Button type='submit'>Place order</Button>
                </form>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </>
  );
}
