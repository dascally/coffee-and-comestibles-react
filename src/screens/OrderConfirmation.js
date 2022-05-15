import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Invoice from '../components/Invoice';

export default function Checkout() {
  const params = useParams();

  return (
    <Container>
      <h1>Order Confirmation</h1>
      <Invoice id={params.invoiceId} />
    </Container>
  );
}
