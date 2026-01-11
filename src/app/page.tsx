'use client';
import { useState, useEffect } from 'react';
import ShowList from './ui/showList/showList';
import { getShows } from '@/lib/localStorageService';

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This is recommended per Next.js docs to fix React Hydration issues when using browser APIs like `window`
    // https://nextjs.org/docs/messages/react-hydration-error#solution-1-using-useeffect-to-run-on-the-client-only
    // need to disable the lint rule for calling setState synchronously within an effect
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true)
  }, [])

  return (
    <div>
      <h1>Welcome to Pick For Me TV</h1>
      <p>
        This is just placeholder filler text for now.
      </p>
      <hr />
      <ShowList shows={isClient ? getShows(): []} />
    </div>
  );
}
