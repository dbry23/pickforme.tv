import { Show } from './definitions';

export function isShowInLibrary(id: number): boolean {
  if (!localStorage.shows) {
    localStorage.shows = JSON.stringify([]);
  }
  const shows = JSON.parse(localStorage.shows);
  return shows.some((s: Show) => s.id === id);
}

export function addRemoveShow(show: Show): void {
  if (!localStorage.shows) {
    localStorage.shows = JSON.stringify([]);
  }
  let shows = JSON.parse(localStorage.shows);

  if (shows.some((s: Show) => s.id === show.id)) {
    shows = shows.filter((s: Show) => s.id !== show.id);
  } else {
    shows.push(show);
  }

  localStorage.shows = JSON.stringify(shows);
}

export function getShowIds(): number[] {
  const shows = getShows();
  return shows.map((s: Show) => s.id);
}

export function getShows(): Show[] {
  if (!localStorage.shows) {
    localStorage.shows = JSON.stringify([]);
  }
  return JSON.parse(localStorage.shows);
}
