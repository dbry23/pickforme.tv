import { Show } from '@/lib/definitions';
import styles from './showCard.module.css';

export default function ShowCard({show}: {show: Show}) {
  const tmdbImgUrlBase = 'https://image.tmdb.org/t/p/w780';
  const backgroundStyle =
    show.backdrop_path ?
        { backgroundImage: `url(${`${tmdbImgUrlBase}${show.backdrop_path}`})` }
        : {};

  return (
    <div className={styles.card} style={backgroundStyle}>
      <span className={styles.showName}>{ show.name }</span>
    </div>
  );
}
