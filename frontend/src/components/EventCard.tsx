import { useNavigate } from 'react-router-dom';
import type { Event } from '../types';
import Button from './Button';

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  const navigate = useNavigate();

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('sr-RS', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="card h-100">
      <div className="card-body">
        <h5 className="card-title">{event.title}</h5>
        <p className="card-text text-muted">{event.description}</p>
        <div className="mb-3">
          <small className="text-muted d-block">Datum: {formatDate(event.date)}</small>
          {event.category && <small className="text-muted d-block">Kategorija: {event.category.name}</small>}
          {event.location && <small className="text-muted d-block">Lokacija: {event.location.name}, {event.location.city}</small>}
          <small className="text-muted d-block">Max učesnika: {event.max_participants}</small>
        </div>
        <Button
          text="Detaljnije"
          onClick={() => navigate(`/events/${event.id}`)}
          variant="primary"
        />
      </div>
    </div>
  );
};

export default EventCard;
