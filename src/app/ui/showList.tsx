import ShowCard from './showCard/showCard';
import { Show } from '@/lib/definitions';

export default function ShowList({ shows }: { shows: Show[] }) {
  return (
    shows && shows.map((show) => {
      return <ShowCard key={show.id} show={show} />;
    })
  );
}
