import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import Event from '../features/events/Event';

export default function Events() {
  const events = useSelector((state) => state.events);
  const sortedEvents = useMemo(
    () =>
      events
        .slice()
        .sort(
          (a, b) =>
            new Date(a.datetime).getTime() - new Date(b.datetime).getTime()
        ),
    [events]
  );

  return (
    <Container as='section'>
      <h1>Events</h1>
      {sortedEvents.map((event) => (
        <Event eventId={event._id} key={event._id} />
      ))}
    </Container>
  );
}
