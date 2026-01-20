import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Show } from './definitions';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getPopularShows(): Show[] {
  return [
    {
      id: 2316,
      name: 'The Office',
      backdrop_path: '/bY2J2Jq8rSrKm5xCFtzYzqFh44o.jpg',
    },
    {
      id: 1668,
      name: 'Friends',
      backdrop_path: '/l0qVZIpXtIo7km9u5Yqh0nKPOr5.jpg',
    },
    {
      id: 8592,
      name: 'Parks and Recreation',
      backdrop_path: '/frwl2zBNAl5ZbFDJGoJv0mYo0rF.jpg',
    },
    {
      id: 4589,
      name: 'Arrested Development',
      backdrop_path: '/8qn0u64JXSgnGKe2KkKqrfH7V84.jpg',
    },
    {
      id: 48891,
      name: 'Brooklyn Nine-Nine',
      backdrop_path: '/wyspZaGs7CXceV3Ct7NJhcKNDkn.jpg',
    },
    {
      id: 1400,
      name: 'Seinfeld',
      backdrop_path: '/tMRdEsMg9MyXAkcufK9YJEeIaNW.jpg',
    },
    {
      id: 4556,
      name: 'Scrubs',
      backdrop_path: '/z6fUdAWIqSenjIYsPmRltaGHcTq.jpg',
    },
    {
      id: 52,
      name: "That '70s Show",
      backdrop_path: '/rf2uHKzPniVL5LvSVxg5ACxv4cS.jpg',
    },
    {
      id: 32726,
      name: "Bob's Burgers",
      backdrop_path: '/xnU9b4IehJ08Ikz3sweABtY5IwU.jpg',
    },
  ];
}
