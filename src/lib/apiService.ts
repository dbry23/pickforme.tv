import { ShowsResponse, Episode } from './definitions';

const baseUrl = '/api';

export async function findShows(show_name: string): Promise<ShowsResponse> {
  const response = await fetch(`${baseUrl}/shows?show_name=${show_name}`);

  if (!response.ok) {
    throw new Error('Error retrieving shows from API');
  }

  const shows: ShowsResponse = await response.json();
  return shows;
}

export async function getEpisode(showsIds: number[]): Promise<Episode> {
  const shows = JSON.stringify(showsIds);
  const unixTime = Date.now() / 1000;
  const response = await fetch(`${baseUrl}/episode?shows=${shows}&c=${unixTime}`);

  if (!response.ok) {
    throw new Error('Error retrieving episode from API');
  }

  const episode: Episode = await response.json();
  return episode;
}
