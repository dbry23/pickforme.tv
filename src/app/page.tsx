'use client';
import ShowList from './ui/showList/showList';
import { getShows } from '@/lib/localStorageService';

export default function Home() {
  return (
    <div>
      <h1>Welcome to Pick For Me TV</h1>
      <p>
        This is just placeholder filler text for now.
      </p>
      <hr />
      <ShowList shows={getShows()} />
    </div>
  );
}
