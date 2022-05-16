import { useSelector } from 'react-redux';
import { selectSavedOrderById } from '../features/user/userSlice';
import { Accordion, Button, Table } from 'react-bootstrap';
import OrderItemTableRow from './OrderItemTableRow';

export default function SavedOrderAccordionItem({ id }) {
  const savedOrder = useSelector(selectSavedOrderById(id));

  return (
    <Accordion.Item eventKey={savedOrder._id} key={savedOrder._id}>
      <Accordion.Header>{savedOrder.name}</Accordion.Header>
      <Accordion.Body>
        <Table striped className='mb-2'>
          <thead>
            <tr>
              <th>Item</th>
              <th style={{ width: '5em' }}>Price</th>
            </tr>
          </thead>
          <tbody>
            {savedOrder.orderList.map((orderItem) => {
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
                  savedOrder.orderList.reduce(
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
        <Button variant='link' className='text-danger p-0' onClick={() => {}}>
          Delete
        </Button>
      </Accordion.Body>
    </Accordion.Item>
  );
}
