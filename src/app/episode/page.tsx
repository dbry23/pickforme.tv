'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getEpisode } from '@/lib/apiService';
import { getShowIds } from '@/lib/localStorageService';
import { Episode } from '@/lib/definitions';
import { Button } from '@/components/ui/button';
import { AlertCircleIcon } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';

export default function Page() {
  const [episode, setEpisode] = useState<Episode | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [showNoEpisodeCollection, setShowNoEpisodeCollection] = useState<boolean>(false);

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
      const showsIds = getShowIds();
      if (showsIds.length === 0) {
        setShowNoEpisodeCollection(true);
      } else {
        await getRandomEpisode();
      }
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
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {errorMessage && (
          <div className="w-full max-w-2xl mb-8">
            <Alert variant="destructive">
              <AlertCircleIcon className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {errorMessage}
              </AlertDescription>
            </Alert>
          </div>
        )}
        {showNoEpisodeCollection && (
          <div className="text-center py-16">
            <p className="text-xl text-slate-400 mb-6">
              You have no shows in your library. Please add a show first.
            </p>
            <Link href='/search'>
              <Button size="lg">
                Search for Shows
              </Button>
            </Link>
          </div>
        )}

        {episode && (
          <div className="md:flex">
            <div className="md:flex-1/3">
              <p className="text-5xl text-white font-semibold mb-4 me-3">
                {episode.show.name}
              </p>
              <p className="mb-4">
                <span className="text-3xl text-slate-400 font-extralight me-3">
                  Title
                </span>
                <span className="text-4xl text-white font-semibold">
                  {episode.name}
                </span>
              </p>
              <p className="mb-4">
                <span className="text-2xl text-slate-400 font-extralight me-2">
                  Season
                </span>
                <span className="text-3xl text-white font-semibold me-4">
                  {episode.season_number}
                </span>
                <span className="text-2xl text-slate-400 font-extralight me-2">
                  Episode
                </span>
                <span className="text-3xl text-white font-semibold">
                  {episode.episode_number}
                </span>
              </p>
              <p className="mb-2">
                <span className="text-lg text-slate-400 font-extralight me-2">
                  Air date
                </span>
                <span className="text-xl text-white">
                  {episode.air_date}
                </span>
              </p>
              <p className="mb-2 text-slate-300 me-2">
                {episode.overview}
              </p>

              <Button
                onClick={getRandomEpisode}
                className="mt-4 md:mt-8 py-8 px-6 text-3xl"
              >
                Pick another episode
              </Button>
            </div>

            <Separator orientation="vertical" className="mx-4 hidden md:block" />
            <Separator orientation="horizontal" className="my-4 md:hidden" />

            <div className="md:flex-2/3">
              <Image
                src={getImagePath()}
                alt="Scene from episode"
                width={1024}
                height={0}
                sizes="1024px 512px 256px 128px"
                style={{ height: 'auto' }}
                className="rounded-lg"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
