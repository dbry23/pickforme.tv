'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { isShowInLibrary, addRemoveShow } from '@/lib/localStorageService';
import { Show } from '@/lib/definitions';

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
    ? 'text-red-remove'
    : 'text-green-add';

  const handleClick = () => {
    addRemoveShow(show);
    setIsInLibrary((prev) => !prev);
  };

  return (
    <Card
      className="relative mx-auto w-full max-w-sm pt-0 gap-2 pb-0 border-2 border-gray-500 rounded-md hover:border-primary hover:border-4 hover:scale-104 transition-all duration-200 ease-linear cursor-pointer bg-center bg-cover bg-no-repeat aspect-video"
      onClick={handleClick}
      role="button"
      style={backgroundStyle}
    >
      <CardHeader>
        <CardTitle className="relative inline-flex top-4 z-50 mx-auto px-4 py-2 max-w-85 bg-gray-light border-transparent rounded-lg text-white font-bold w-fit">{show.name}</CardTitle>
      </CardHeader>
      <CardFooter className="w-full px-0 py-1 h-8 absolute bottom-0">
        <Button className={`w-full border-0 z-50 h-8 px-0 rounded-none bg-gray-dark font-bold text-base hover:bg-gray-dark ${toggleTextClass}`}>
          {toggleText}
        </Button>
      </CardFooter>
    </Card>
  );
}
