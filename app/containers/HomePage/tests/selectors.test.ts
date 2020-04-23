import * as selectors from '../selectors';

const testMovie = {
  id: 'id',
  title: 'title',
  year: '2020',
  image: 'image',
  type: 'movie',
};

describe('homepage selectors', () => {
  const homePage = {
    result: [testMovie],
    loading: true,
    selected: testMovie,
    selectedLoading: true,
  };
  const mockedState: any = {
    homePage,
  };
  it('should select the results ids', () => {
    expect(selectors.selectResultsId(mockedState)).toEqual([testMovie.id]);
  });
  it('should select one result item', () => {
    expect(selectors.makeSelectResultItem(testMovie.id)(mockedState)).toEqual(
      testMovie,
    );
  });

  it('should select loading value', () => {
    expect(selectors.selectLoading(mockedState)).toEqual(true);
  });

  it('should select wiki call loading value', () => {
    expect(selectors.selectWikiLoading(mockedState)).toEqual(true);
  });
});
