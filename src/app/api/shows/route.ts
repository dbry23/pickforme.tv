import { type NextRequest } from 'next/server';
import { ShowsResponse, Show } from '@/lib/definitions';

const baseUrl = 'https://api.themoviedb.org/3';
const tmdbHeaders = new Headers();
tmdbHeaders.append('Content-Type', 'application/json');
tmdbHeaders.append('Authorization', `Bearer ${process.env.TMDB_API_KEY}`);

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const show_name = searchParams.get('show_name');
  const page = searchParams.get('page') || '1';

  const response = await fetch(
    `${baseUrl}/search/tv?query=${show_name}&page=${page}`,
    {
      headers: tmdbHeaders,
    }
  );

  if (!response.ok) {
    throw new Error(
      `Error occurred retrieving shows from data source. Status: ${response.status}`
    );
  }

  const showsResponse: ShowsResponse = await response.json();

  // trim show data from TMDB API to remove unneeded properties on front end
  const trimmedShows: Show[] = [];
  showsResponse.results.map((show: Show) => {
    const trimmedShow = trimShowResponse(show);
    trimmedShows.push(trimmedShow);
  });
  showsResponse.results = trimmedShows;

  return Response.json(showsResponse);
}

/**
 * Trim a Show object to include only essential properties.
 * @param fullShow - The Show object to trim
 * @returns A trimmed Show object containing only id, name, backdrop_path
 */
function trimShowResponse(fullShow: Show): Show {
  const { id, name, backdrop_path } = fullShow;
  return { id, name, backdrop_path };
}
