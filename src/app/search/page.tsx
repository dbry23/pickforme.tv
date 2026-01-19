'use client';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { findShows } from '@/lib/apiService';
import { ShowsResponse } from '@/lib/definitions';
import ShowList from '../ui/showList/showList';
import { Search, AlertCircleIcon } from 'lucide-react';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';

export default function Page() {
  const [showName, setShowName] = useState('');
  const [searchedName, setSearchedName] = useState('');
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
    setSearchedName(showName);
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
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-white mb-8">
          Search
        </h1>
        <Separator className="mb-8" />

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

        <div className="mb-12">
          <InputGroup className="max-w-md">
            <InputGroupInput
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              defaultValue={showName}
              placeholder="Search for a show..."
              className="text-white placeholder:text-slate-500"
            />
            <InputGroupAddon align="inline-end">
              <InputGroupButton variant="ghost" size="icon-sm" className="hover:rounded-sm" onClick={handleClick}>
                <Search className="h-4 w-4" />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </div>

        {shows && (
          <>
            {shows.total_results === 0 ? (
              <div className="text-center py-12">
                <p className="text-slate-400 text-lg">No results found for &quot;{searchedName}&quot;</p>
              </div>
            ) : (
              <>
                <h2 className="text-3xl font-bold text-white mb-8">
                  Results ({shows.total_results})
                </h2>
                <ShowList shows={shows.results} />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
