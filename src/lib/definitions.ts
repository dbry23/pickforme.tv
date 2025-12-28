export type Show = {
  id: number;
  name: string;
  backdrop_path: string;
};

// for search, multiple shows returned
export type ShowsResponse = {
  page: number;
  results: Show[];
  total_pages: number;
  total_results: number;
};

