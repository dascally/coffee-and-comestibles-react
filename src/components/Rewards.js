import { useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';

export default function Rewards() {
  const rewards = useSelector((state) => state.user?.rewards);
  return (
    <Container as='section' id='rewards'>
      <h2>Rewards</h2>
      <p>
        You have <b className='fs-6'>{rewards}</b> rewards points!
      </p>
      <p>
        Every 100 rewards points are equivalent to $1. Apply them when you check
        out!
      </p>
    </Container>
  );
}
