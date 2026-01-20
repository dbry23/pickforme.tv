import { Show, Season, Episode } from '@/lib/definitions';
import { type NextRequest } from 'next/server';

const baseUrl = 'https://api.themoviedb.org/3';
const tmdbHeaders = new Headers();
tmdbHeaders.append('Content-Type', 'application/json');
tmdbHeaders.append('Authorization', `Bearer ${process.env.TMDB_API_KEY}`);

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const shows: number[] = JSON.parse(searchParams.get('shows') as string);
  const randomShowIndex = Math.floor(Math.random() * shows.length);
  const showId = shows[randomShowIndex];

  // get show details
  let tmdbUrl = `${baseUrl}/tv/${showId}`;
  const responseShow = await fetch(tmdbUrl, {
    headers: tmdbHeaders,
  });
  if (!responseShow.ok) {
    throw new Error(
      `Error occurred retrieving show from data source. ShowId: ${showId}, Status: ${responseShow.status}`
    );
  }

  const showData: Show = await responseShow.json();

  // pick random season and episode
  if (!showData.seasons) {
    throw new Error(
      `Error occurred, season data unavailable for show. ShowId: ${showId}`
    );
  }

  const seasons = showData.seasons.filter((s: Season) => {
    return s.season_number !== 0; // specials are classified as season 0
  });
  const randomSeasonIndex = Math.floor(Math.random() * seasons.length);
  const season = seasons[randomSeasonIndex];

  const episode_count = season.episode_count;
  const randomEpisodeNumber = Math.floor(Math.random() * episode_count) + 1;

  // get episode details
  tmdbUrl =
    tmdbUrl + `/season/${season.season_number}/episode/${randomEpisodeNumber}`;
  const responseEpisode = await fetch(tmdbUrl, {
    headers: tmdbHeaders,
  });
  if (!responseEpisode.ok) {
    throw new Error(
      `Error occurred retrieving episode from data source. ShowId: ${showId}, Season Number: ${season.season_number}, Episode Number: ${randomEpisodeNumber}, Status: ${responseEpisode.status}`
    );
  }

  const episodeData: Episode = await responseEpisode.json();
  episodeData.show = showData;
  const trimmedEpisodeData = trimEpisodeResponse(episodeData);
  return Response.json(trimmedEpisodeData);
}

/**
 * Trim a Episode object to include only essential properties.
 * @param fullEpisode - The Episode object to trim
 * @returns A trimmed Episode object containing only id, name, season_number, episode_number, still_path, air_date, overview
 */
function trimEpisodeResponse(fullEpisode: Episode): Episode {
  const { id, name, season_number, episode_number, still_path, air_date, overview, show: fullShow } = fullEpisode;
  const show = trimShowResponse(fullShow);
  return { id, name, season_number, episode_number, still_path, air_date, overview, show };
}

/**
 * Trim a Show object to include only essential properties.
 * @param full_show - The Show object to trim
 * @returns A trimmed Show object containing only id, name, backdrop_path
 */
function trimShowResponse(full_show: Show): Show {
  const { id, name, backdrop_path } = full_show;
  return { id, name, backdrop_path };
}
