'use client';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { findShows } from '@/lib/apiService';
import { ShowsResponse } from '@/lib/definitions';
import ShowList from '../ui/showList/showList';
import { Search } from 'lucide-react';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group';

export default function Page() {
  const [showName, setShowName] = useState('');
  const [shows, setShows] = useState<ShowsResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setShowName(e.target.value);
  };

  const handleClick = () => {
    showSearch();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter') {
      showSearch();
    }
  };

  const showSearch = async () => {
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
  };

  return (
    <>
      <h1>Search</h1>
      {errorMessage && <p>{errorMessage}</p>}
      <div className="flex w-full max-w-sm items-center gap-2">
        <InputGroup>
          <InputGroupInput
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            defaultValue={showName}
          />
          <InputGroupAddon align="inline-end">
            <InputGroupButton variant="ghost" size="icon-sm" onClick={handleClick}>
              <Search />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>
      {shows && (
        <>
          <hr />
          {shows.total_results === 0 ? (
            <span>No results found</span>
          ) : (
            <ShowList shows={shows.results} />
          )}
        </>
      )}
    </>
  );
}
