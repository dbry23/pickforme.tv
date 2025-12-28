export type Show = {
  id: number;
  name: string;
  backdrop_path: string;
  seasons: Season[];
};

// for search, multiple shows returned
export type ShowsResponse = {
  page: number;
  results: Show[];
  total_pages: number;
  total_results: number;
};

export type Season = {
  id: number;
  season_number: number;
  episode_count: number;
}

export type Episode = {
  id: number;
  show: Show;
  season_number: number;
  episode_number: number;
  name: string;
  still_path: string;
  air_date: string;
  overview: string;
};
