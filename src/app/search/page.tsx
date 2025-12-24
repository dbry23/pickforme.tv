'use client'
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { findShows } from '@/lib/apiService';
import { ShowsResponse } from '@/lib/definitions';
import ShowList from '../ui/showList';

export default function Page() {
  const [showName, setShowName] = useState('');
  const [shows, setShows] = useState<ShowsResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setShowName(e.target.value);
  }

  const handleClick = () => {
    showSearch();
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter") {
      showSearch();
    }
  }

  const showSearch = async function() {
    setShows(null);
    setErrorMessage('');
    try {
      const response = await findShows(showName);
      setShows(response);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(`Failed to fetch shows: ${error.message}`);
        console.error('Failed to fetch shows', error);
      }
    }
  }

  return (
    <>
      <h1>Search</h1>
      {errorMessage && <p>{errorMessage}</p>}
      <span>Show name: </span>
      <input
        type="text"
        name="show_name"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        defaultValue={showName}
      ></input>
      <button onClick={handleClick}>Search</button>
      {shows &&
        <>
          <hr />
          {shows.total_results === 0
            ? <span>No results found</span>
            : <ShowList shows={shows.results} />
          }
        </>
      }
    </>
  );
}
