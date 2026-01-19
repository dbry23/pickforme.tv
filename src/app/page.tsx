'use client';
import { useState } from 'react';
import ShowList from './ui/showList/showList';
import { getPopularShows } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

const tagLines = [
  'Channel surfing, perfected.',
  'That feeling when your show is already on.',
  'Rediscover the joy of random TV.',
  'The best part of channel surfing—without the surfing.',
  'Let TV decide for you.',
  'When you can\'t decide, we pick.',
  'Stop choosing. Start watching.',
  'Because comfort TV shouldn\'t require decisions.',
  'Your favorites—on shuffle.',
  'Less scrolling. More watching.',
  'Your shows. Zero decisions.',
];
const randomTagLineIndex = () => {
  return Math.floor(Math.random() * tagLines.length);
};

export default function Home() {
  const [tagLine, setTagLine] = useState(tagLines[randomTagLineIndex()]);
  const popularShows = getPopularShows();

  const pickNewTagLine = () => {
    setTagLine(tagLines[randomTagLineIndex()]);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-white mb-4">
            Pick For Me TV
          </h1>
          <button
            onClick={pickNewTagLine}
            className="text-xl sm:text-2xl text-slate-300 font-light cursor-default active:text-white"
          >
            {tagLine}
          </button>
        </div>
        <Separator />
        <h2 className="text-3xl font-bold text-white mb-8 mt-12 text-center">
          Popular shows
        </h2>
        <ShowList shows={popularShows} />
      </div>
    </div>
  );
}
