import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { placeOrder } from '../features/order/orderSlice';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import OrderItemTableRow from '../components/OrderItemTableRow';

export default function Checkout() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user?.id);
  const orderList = useSelector((state) => state.order);
  const [contactPhone, setContactPhone] = useState('');
  const [contactName, setContactName] = useState('');
  const [ccInfo, setCcInfo] = useState('');

  const handlePlaceOrderClick = (evt) => {
    dispatch(
      placeOrder({
        userId,
        orderList,
        contactPhone: '123-456-7890',
        contactName: 'Test Name',
        ccInfo: '624e03e794fc037e048e5c69',
      })
    );
  };

  return (
    <Container>
      <h1>Checkout</h1>
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
                orderItemId={orderItem.id}
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
            <div className='mb-3'>
              <label htmlFor='payment-method' style={{ width: '15ch' }}>
                Payment method
              </label>
              {/* Choose payment method or enter new one and checkbox to save */}
              {/* Will have to get payment methods now, or else change to get them with the rest of user data */}
              <select
                id='payment-method'
                required
                value={ccInfo}
                onChange={(evt) => {
                  setCcInfo(evt.target.value);
                }}
              >
                <option value='' label='Choose a card' />
              </select>
            </div>
            <Button type='submit'>Place order</Button>
          </form>
        </Col>
      </Row>
    </Container>
  );
}
