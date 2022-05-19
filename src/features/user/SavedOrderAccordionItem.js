import { useDispatch, useSelector } from 'react-redux';
import { selectSavedOrderById, deleteSavedOrder } from './userSlice';
import { Accordion, Button, Table } from 'react-bootstrap';
import OrderItemTableRow from '../../components/OrderItemTableRow';

export default function SavedOrderAccordionItem({ orderId }) {
  const dispatch = useDispatch();
  const jwt = useSelector((state) => state.user?.token);
  const userId = useSelector((state) => state.user?.id);
  const savedOrder = useSelector(selectSavedOrderById(orderId));

  const handleDeleteClick = (evt) => {
    dispatch(deleteSavedOrder({ jwt, userId, orderId }));
  };

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
        <Button
          variant='link'
          className='text-danger p-0'
          onClick={handleDeleteClick}
        >
          Delete
        </Button>
      </Accordion.Body>
    </Accordion.Item>
  );
}
