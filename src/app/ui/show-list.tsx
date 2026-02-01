import dynamic from 'next/dynamic';
const ShowCard = dynamic(() => import('./show-card'), { ssr: false }); // to disable SSR and prevent rehydration and localStorage issues
import { Show } from '@/lib/definitions';

export default function ShowList({ shows }: { shows: Show[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full h-full px-8 pt-8">
      {shows &&
        shows.map((show) => {
          return <ShowCard key={show.id} show={show} />;
        })}
    </div>
  );
}
