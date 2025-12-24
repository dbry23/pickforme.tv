import { ShowsResponse } from './definitions';

const baseUrl = '/api';

export async function findShows(show_name: string): Promise<ShowsResponse> {
  const response = await fetch(`${baseUrl}/shows?show_name=${show_name}`);

  if (!response.ok) {
    throw new Error('Error retrieving data from API');
  }

  const shows: ShowsResponse = await response.json();
  return shows;
}
