'use client';
import { useState } from 'react';
import { isShowInLibrary, addRemoveShow } from '@/lib/localStorageService';
import { Show } from '@/lib/definitions';
import styles from './showCard.module.css';

export default function ShowCard({ show }: { show: Show }) {
  const [isInLibrary, setIsInLibrary] = useState<boolean>(() =>
    isShowInLibrary(show.id)
  );

  const tmdbImgUrlBase = 'https://image.tmdb.org/t/p/w780';
  const backgroundStyle = show.backdrop_path
    ? { backgroundImage: `url(${tmdbImgUrlBase}${show.backdrop_path})` }
    : {};

  const toggleText = isInLibrary ? 'Remove' : 'Add';
  const toggleTextClass = isInLibrary
    ? styles.toggleTextRemove
    : styles.toggleTextAdd;

  const handleClick = () => {
    addRemoveShow(show);
    setIsInLibrary((prev) => !prev);
  };

  return (
    <div
      className={styles.card}
      style={backgroundStyle}
      onClick={handleClick}
      role="button"
    >
      <span className={styles.showName}>{show.name}</span>
      <div className={`${styles.cardToggle} ${toggleTextClass}`}>
        {toggleText}
      </div>
    </div>
  );
}
