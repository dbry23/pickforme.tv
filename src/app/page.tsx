'use client';
import ShowList from './ui/showList/showList';
import { getPopularShows } from '@/lib/utils';

export default function Home() {
  const popularShows = getPopularShows();

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-white mb-4">
            Pick For Me TV
          </h1>
          <p className="text-xl sm:text-2xl text-slate-300 font-light">
            Discover your next favorite show, effortlessly
          </p>
        </div>
        <h2 className="text-3xl font-bold text-white mb-8 mt-12 border-t-solid border-t-2 pt-2 text-center">
          Popular shows
        </h2>
        <ShowList shows={popularShows} />
      </div>
    </div>
  );
}
