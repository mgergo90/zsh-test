import {
  transformMovie,
  genereteWikiSearchUrl,
  generateOmdbSearchUrl,
} from '../utils';

const testMovie = {
  id: 'test',
  title: 'test',
  year: 'test',
  image: 'test',
  type: 'test',
};

describe('HomePage utils', () => {
  it('should transform api response to Movie object', () => {
    const response = {
      imdbID: 'test',
      Title: 'test',
      Poster: 'test',
      Year: 'test',
      Type: 'test',
    };
    expect(transformMovie(response)).toEqual(testMovie);
  });

  it('should generare wiki search url', () => {
    expect(genereteWikiSearchUrl(null)).toEqual('');
    expect(genereteWikiSearchUrl(testMovie).indexOf('test')).not.toEqual(-1);
  });

  it('should generare omdb search url', () => {
    expect(generateOmdbSearchUrl('test').indexOf('test')).not.toEqual(-1);
  });
});
