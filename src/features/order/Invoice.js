import { useSelector } from 'react-redux';
import { Col, Row, Table } from 'react-bootstrap';
import OrderItemTableRow from '../../components/OrderItemTableRow';

export default function Invoice({ id }) {
  const invoice = useSelector((state) =>
    state.user?.invoices.find((invoice) => invoice._id === id)
  );

  if (!invoice) return <p>Invoice not found.</p>;

  return (
    <>
      <Row className='gy-2 mb-2'>
        <Col>
          <div>
            <p className='mb-0 text-nowrap'>
              <b>Billing info:</b>
            </p>
            <p className='mb-0 ms-3 text-nowrap'>
              xxxx-xxxx-xxxx-{invoice.ccInfo.cardNumberFinalDigits}
            </p>
            <p className='mb-0 ms-3 text-nowrap'>
              {invoice.ccInfo.billingName}
            </p>
            <p className='mb-0 ms-3 text-nowrap'>
              {invoice.ccInfo.streetAddress}
            </p>
            <p className='mb-0 ms-3 text-nowrap'>
              {invoice.ccInfo.city}, {invoice.ccInfo.state}{' '}
              {invoice.ccInfo.zipCode}
            </p>
          </div>
        </Col>
        <Col>
          <div>
            <p className='mb-0 text-nowrap'>
              <b>Contact info:</b>
            </p>
            <p className='mb-0 ms-3 text-nowrap'>Name: {invoice.contactName}</p>
            <p className='mb-0 ms-3 text-nowrap'>
              Phone: {invoice.contactPhone}
            </p>
          </div>
        </Col>
      </Row>
      <Table striped>
        <thead>
          <tr>
            <th>Item</th>
            <th style={{ width: '5em' }}>Price</th>
          </tr>
        </thead>
        <tbody>
          {invoice.orderList.map((orderItem) => {
            return (
              <OrderItemTableRow orderItem={orderItem} key={orderItem._id} />
            );
          })}
        </tbody>
        <tbody>
          <tr>
            <td className='align-middle'>Total</td>
            <td className='align-middle'>
              {(
                invoice.orderList.reduce(
                  (sum, orderItem) => sum + orderItem.menuItem.price,
                  0
                ) / 100
              ).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}
