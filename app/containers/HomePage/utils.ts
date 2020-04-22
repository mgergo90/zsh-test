import { Movie } from './types';

export const transformMovie = (response: any): Movie => ({
  id: response.imdbID,
  title: response.Title,
  image: response.Poster,
  year: response.Year,
  type: response.Type,
});
