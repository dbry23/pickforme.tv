import { useState } from 'react';
import { isShowInLibrary, addRemoveShow } from '@/lib/localStorageService';
import { Show } from '@/lib/definitions';
import styles from './showCard.module.css';

export default function ShowCard({ show }: { show: Show }) {
  const [isInLibrary, setIsInLibrary] = useState(isShowInLibrary(show.id));

  const tmdbImgUrlBase = 'https://image.tmdb.org/t/p/w780';
  const backgroundStyle =
    show.backdrop_path ?
        { backgroundImage: `url(${`${tmdbImgUrlBase}${show.backdrop_path}`})` }
        : {};

  const linkClass =
    isInLibrary ? styles.linkRemove : styles.linkAdd;

  const linkText =
    isInLibrary ? "Remove" : "Add";

  const handleClick = () => {
    addRemoveShow(show);
    setIsInLibrary((prev: boolean) => !prev);
  };

  return (
    <div className={styles.card} style={backgroundStyle} onClick={handleClick}>
      <span className={styles.showName}>{ show.name }</span>
      <div className={styles.cardLinks}>
        <a className={linkClass}>{ linkText }</a>
      </div>
    </div>
  );
}
