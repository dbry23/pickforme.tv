'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import ShowList from '../ui/show-list';
import { getShows } from '@/lib/localStorageService';
import { Show } from '@/lib/definitions';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function Page() {
  const [shows, setShows] = useState<Show[]>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShows(getShows());
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-white mb-8">
          My Library
        </h1>
        <Separator className="mb-8" />

        {shows.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-slate-400 mb-6">
              Your library is empty. Start by adding your favorite shows!
            </p>
            <Link href="/search">
              <Button size="lg">
                Search for Shows
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <p className="text-lg text-slate-300 mb-2">
              You have <span className="font-bold text-white">{shows.length}</span> show{shows.length !== 1 ? 's' : ''} in your library
            </p>
            <ShowList shows={shows} />
          </>
        )}
      </div>
    </div>
  );
}
