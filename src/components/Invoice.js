import { useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';
import OrderItemTableRow from './OrderItemTableRow';

export default function Invoice({ id }) {
  const invoice = useSelector((state) =>
    state.user?.invoices.find((invoice) => invoice._id === id)
  );

  // billing info
  // contact info
  // order list
  if (!invoice) return <p>Invoice not found.</p>;

  return (
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
    </Table>
  );
}
