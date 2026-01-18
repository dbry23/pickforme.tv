'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getEpisode } from '@/lib/apiService';
import { getShowIds } from '@/lib/localStorageService';
import { Episode } from '@/lib/definitions';
import { Button } from '@/components/ui/button';

export default function Page() {
  const [episode, setEpisode] = useState<Episode | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const getRandomEpisode = async () => {
    setEpisode(null);
    setErrorMessage('');
    try {
      const showsIds = getShowIds();
      const response = await getEpisode(showsIds);
      setEpisode(response);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(`Failed to fetch episode: ${error.message}`);
        console.error('Failed to fetch episode', error);
      }
    }
  };

  useEffect(() => {
    (async () => {
      await getRandomEpisode();
    })();
  }, []);

  const getImagePath = (): string => {
    if (!episode) return '';

    const tmdbImgBase = 'https://image.tmdb.org/t/p/';
    return `${tmdbImgBase}${getImageWidth()}${episode.still_path}`;
  };

  const getImageWidth = (): string => {
    const viewportWidth = Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    );
    const imageWidths = ['w300', 'w780', 'w1280'];

    for (const width of imageWidths) {
      if (parseInt(width.replace('w', '')) > viewportWidth) {
        return width;
      }
    }
    return 'original';
  };

  return (
    <>
      <h1>Random episode</h1>
      {errorMessage && <p>{errorMessage}</p>}
      {episode && (
        <>
          <h2>{episode.show.name}</h2>
          <h3>{episode.name}</h3>
          <h4>
            Season: {episode.season_number} Episode: {episode.episode_number}
          </h4>
          <h5>Air date: {episode.air_date}</h5>
          <div style={{ maxWidth: '80%' }}>
            <Image
              src={getImagePath()}
              alt="Scene from episode"
              width={512}
              height={0}
              sizes="512px 256px 128px"
              style={{ height: 'auto' }}
            />
          </div>
          <Button size="lg" onClick={getRandomEpisode}>Pick another episode</Button>
        </>
      )}
    </>
  );
}
