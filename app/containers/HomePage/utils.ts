import { Movie } from './types';

export const transformMovie = (response: any): Movie => ({
  id: response.imdbID,
  title: response.Title,
  image: response.Poster,
  year: response.Year,
  type: response.Type,
});

export const genereteWikiSearchUrl = (item: Movie | null) => {
  if (!item) {
    return '';
  }
  const searchParam = encodeURI([item.title, item.type].join(' '));
  return `https://en.wikipedia.org/w/api.php?origin=*&action=query&list=search&srsearch=${searchParam}&utf8=&format=json`;
};

export const generateOmdbSearchUrl = (term: string) =>
  `http://www.omdbapi.com/?s=${encodeURI(term)}&apikey=7a4a45a0`;
