import dynamic from 'next/dynamic';
const ShowCard = dynamic(() => import('../showCard'), { ssr: false }); // to disable SSR and prevent rehydration and localStorage issues
import { Show } from '@/lib/definitions';
import styles from './showList.module.css';

export default function ShowList({ shows }: { shows: Show[] }) {
  return (
    <div className={styles.showListContainer}>
      {shows &&
        shows.map((show) => {
          return <ShowCard key={show.id} show={show} />;
        })}
    </div>
  );
}
