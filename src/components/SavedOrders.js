import { useSelector } from 'react-redux';
import { Accordion, Container } from 'react-bootstrap';
import SavedOrderAccordionItem from './SavedOrderAccordionItem';

export default function SavedOrders() {
  const savedOrders = useSelector((state) => state.user?.savedOrders);

  return (
    <Container as='section' id='orders'>
      <h2>Saved orders</h2>
      {!savedOrders.length ? (
        <p>You haven't saved any orders yet!</p>
      ) : (
        <Accordion>
          {savedOrders.map((savedOrder) => (
            <SavedOrderAccordionItem
              key={savedOrder._id}
              orderId={savedOrder._id}
            />
          ))}
        </Accordion>
      )}
    </Container>
  );
}
