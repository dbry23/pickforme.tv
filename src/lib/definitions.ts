export type Show = {
  id: string;
  name: string;
  backdrop_path: string;
};

export type ShowsResponse = {
  page: number;
  results: Show[];
  total_pages: number;
  total_results: number;
};

