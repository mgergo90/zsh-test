import { TestScheduler } from 'rxjs/testing';
import * as RxjsAjax from 'rxjs/ajax';

import * as actions from '../actions';
import * as epic from '../epic';
import { transformMovie } from '../utils';
import { ActionsObservable } from 'redux-observable';
import { setErrorMessage } from 'containers/App/actions';

jest.mock('rxjs/ajax');

const testScheduler = new TestScheduler((actual, expected) => {
  expect(actual).toEqual(expected);
});

describe('HomePage epic startSearch tests', () => {
  it('should fetch info from omdb', () => {
    testScheduler.run(({ hot, expectObservable, cold }) => {
      jest.spyOn(RxjsAjax.ajax, 'getJSON').mockReturnValueOnce(
        cold('a', {
          a: {
            Search: [
              {
                Title: 'Title',
                Year: '20020',
                imdbID: '32434',
                Type: 'movie',
                Poster: 'http://img.url',
              },
            ],
          },
        }),
      );
      const action$ = new ActionsObservable(
        hot('a', {
          a: actions.initSearch('term'),
        }),
      );
      const output$ = epic.startSearch(action$);
      expectObservable(output$).toBe(`a`, {
        a: actions.setResults([
          transformMovie({
            Title: 'Title',
            Year: '20020',
            imdbID: '32434',
            Type: 'movie',
            Poster: 'http://img.url',
          }),
        ]),
      });
    });
  });

  it('should handle no results', () => {
    testScheduler.run(({ hot, expectObservable, cold }) => {
      jest.spyOn(RxjsAjax.ajax, 'getJSON').mockReturnValueOnce(
        cold('a', {
          a: {
            Response: false,
            Error: 'Error',
          },
        }),
      );
      const action$ = new ActionsObservable(
        hot('a', {
          a: actions.initSearch('term'),
        }),
      );
      const output$ = epic.startSearch(action$);
      expectObservable(output$).toBe('(ab)', {
        a: actions.setResults([]),
        b: setErrorMessage('Error'),
      });
    });
  });

  it('should reset results for empty term', () => {
    testScheduler.run(({ hot, expectObservable, cold }) => {
      jest.spyOn(RxjsAjax.ajax, 'getJSON').mockReturnValueOnce(
        cold('a', {
          a: {},
        }),
      );
      const action$ = new ActionsObservable(
        hot('a', {
          a: actions.initSearch(''),
        }),
      );
      const output$ = epic.startSearch(action$);
      expectObservable(output$).toBe('a', {
        a: actions.setResults([]),
      });
    });
  });
});

describe('HomePage epic loadWiki tests', () => {
  const testMovie = {
    id: 'id',
    title: 'title',
    year: '2020',
    image: 'image',
    type: 'movie',
  };
  it('should fetch info from wikipedia', () => {
    testScheduler.run(({ hot, expectObservable, cold }) => {
      jest.spyOn(RxjsAjax.ajax, 'getJSON').mockReturnValueOnce(
        cold('a', {
          a: {
            query: {
              search: [
                {
                  pageid: '20',
                  snippet: 'snippet',
                },
              ],
            },
          },
        }),
      );
      const action$ = new ActionsObservable(
        hot('a', {
          a: actions.setSelected(testMovie),
        }),
      );
      const output$ = epic.loadWiki(action$);
      expectObservable(output$).toBe('a', {
        a: actions.updateResult({
          ...testMovie,
          wiki: '20',
          description: 'snippet',
        }),
      });
    });
  });

  it('should handle no results', () => {
    testScheduler.run(({ hot, expectObservable, cold }) => {
      jest.spyOn(RxjsAjax.ajax, 'getJSON').mockReturnValueOnce(
        cold('a', {
          a: {
            query: {
              search: [],
            },
          },
        }),
      );
      const action$ = new ActionsObservable(
        hot('a', {
          a: actions.setSelected(testMovie),
        }),
      );
      const output$ = epic.loadWiki(action$);
      expectObservable(output$).toBe('a', {
        a: actions.setWikiError('Search yielded no result'),
      });
    });
  });

  it('should not call wiki url for existing info', () => {
    testScheduler.run(({ hot, expectObservable, cold }) => {
      jest.spyOn(RxjsAjax.ajax, 'getJSON').mockReturnValueOnce(
        cold('a', {
          a: {
            query: {
              search: [
                {
                  pageid: '20',
                  snippet: 'snippet',
                },
              ],
            },
          },
        }),
      );
      const action$ = new ActionsObservable(
        hot('a', {
          a: actions.setSelected({
            ...testMovie,
            wiki: '20',
            description: 'snippet',
          }),
        }),
      );
      const output$ = epic.loadWiki(action$);
      expectObservable(output$).toBe('a', {
        a: actions.setWikiError(''),
      });
    });
  });
});
