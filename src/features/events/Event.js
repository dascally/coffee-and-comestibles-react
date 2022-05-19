import { useSelector } from 'react-redux';
import { selectEventById } from './eventsSlice';

export default function Event({ eventId }) {
  const event = useSelector(selectEventById(eventId));

  return (
    <article className='border border-primary rounded p-3 mb-3'>
      <h2>{event.title}</h2>
      <p>
        Date:{' '}
        {new Date(event.datetime).toLocaleDateString(undefined, {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </p>
      <p className='mb-0'>{event.description}</p>
    </article>
  );
}
