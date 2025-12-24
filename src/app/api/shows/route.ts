import { type NextRequest } from 'next/server';

const baseUrl = 'https://api.themoviedb.org/3';
const tmdbHeaders = new Headers();
tmdbHeaders.append("Content-Type", "application/json");
tmdbHeaders.append('Authorization', `Bearer ${process.env.TMDB_API_KEY}`);

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const show_name = searchParams.get('show_name');

  const response = await fetch(`${baseUrl}/search/tv?query=${show_name}`, {
    headers: tmdbHeaders
  });

  if (!response.ok) {
    throw new Error(`Error occurred retrieving shows from data source. Status: ${response.status}`);
  }

  const shows = await response.json();
  return Response.json(shows);
}
