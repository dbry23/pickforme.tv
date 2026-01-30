'use client';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { findShows } from '@/lib/apiService';
import { ShowsResponse } from '@/lib/definitions';
import ShowList from '../ui/showList/showList';
import { Search, AlertCircleIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';

export default function Page() {
  const isMobile = useIsMobile();
  const [showName, setShowName] = useState('');
  const [searchedName, setSearchedName] = useState('');
  const [shows, setShows] = useState<ShowsResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setShowName(e.target.value);
  };

  const handleClick = () => {
    searchForShows();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter') {
      searchForShows();
    }
  };

  const searchForShows = async (page: number = 1) => {
    setShows(null);
    setErrorMessage('');
    setSearchedName(showName);
    setCurrentPage(page);
    try {
      const response = await findShows(showName, page);
      setShows(response);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(`Failed to fetch shows: ${error.message}`);
        console.error('Failed to fetch shows', error);
      }
    }
  };

  const handlePageChange = (newPage: number) => {
    searchForShows(newPage);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
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
              autoFocus
            />
            <InputGroupAddon align="inline-end">
              <InputGroupButton
                variant="ghost"
                size="icon-sm"
                className="hover:rounded-sm"
                onClick={handleClick}
              >
                <Search className="h-4 w-4" />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </div>

        {shows && (
          <>
            {shows.total_results === 0 ? (
              <div className="text-center py-12">
                <p className="text-slate-400 text-lg">
                  No results found for &quot;{searchedName}&quot;
                </p>
              </div>
            ) : (
              <>
                <h2 className="text-3xl font-bold text-white mb-2">
                  Results ({shows.total_results})
                </h2>
                <ShowList shows={shows.results} />

                {/* Pagination Controls */}
                {shows.total_pages > 1 && (
                  <div className="mt-12 flex items-center justify-center gap-2">
                    <Button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      variant="outline"
                      size="sm"
                      className="text-slate-800 border-slate-700 hover:bg-slate-800 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      { !isMobile && 'Previous' }
                    </Button>

                    <div className="flex items-center gap-2">
                      {/* Show first page */}
                      {currentPage > (isMobile ? 2 : 3) && (
                        <>
                          <Button
                            onClick={() => handlePageChange(1)}
                            variant="outline"
                            size="sm"
                            className="text-slate-800 border-slate-700 hover:bg-slate-800 hover:text-white min-w-10"
                          >
                            1
                          </Button>
                          {currentPage > (isMobile ? 3 : 4) && (
                            <span className="text-slate-500">...</span>
                          )}
                        </>
                      )}

                      {/* Show pages around current page */}
                      {Array.from({ length: shows.total_pages }, (_, i) => i + 1)
                        .filter(
                          (page) =>
                            page === currentPage ||
                            page === currentPage - 1 ||
                            page === currentPage + 1 ||
                            ((page === currentPage - 2) && !isMobile) ||
                            ((page === currentPage + 2) && !isMobile)
                        )
                        .map((page) => (
                          <Button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            variant={page === currentPage ? 'default' : 'outline'}
                            size="sm"
                            className={
                              page === currentPage
                                ? 'bg-slate-700 text-white hover:bg-slate-600 min-w-10'
                                : 'text-slate-800 border-slate-700 hover:bg-slate-800 hover:text-white min-w-10'
                            }
                          >
                            {page}
                          </Button>
                        ))}

                      {/* Show last page */}
                      {currentPage < (isMobile ? shows.total_pages - 1 : shows.total_pages - 2) && (
                        <>
                          {currentPage < (isMobile ? shows.total_pages - 2 : shows.total_pages - 3) && (
                            <span className="text-slate-500">...</span>
                          )}
                          <Button
                            onClick={() => handlePageChange(shows.total_pages)}
                            variant="outline"
                            size="sm"
                            className="text-slate-800 border-slate-700 hover:bg-slate-800 hover:text-white min-w-10"
                          >
                            {shows.total_pages}
                          </Button>
                        </>
                      )}
                    </div>

                    <Button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === shows.total_pages}
                      variant="outline"
                      size="sm"
                      className="text-slate-800 border-slate-700 hover:bg-slate-800 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      { !isMobile && 'Next' }
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
