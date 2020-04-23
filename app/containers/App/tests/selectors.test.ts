import { makeSelectLocation, selectPath, selectSearchTerm } from '../selectors';

describe('makeSelectLocation', () => {
  it('should select the location', () => {
    const locationStateSelector = makeSelectLocation();
    const router = {
      location: { pathname: '/foo' },
    };
    const mockedState: any = {
      router,
    };
    expect(locationStateSelector(mockedState)).toEqual(router.location);
  });
  it('should select location path', () => {
    const router = {
      location: { pathname: '/foo' },
    };
    const mockedState: any = {
      router,
    };
    expect(selectPath(mockedState)).toEqual('/foo');
  });

  it('should select serch term', () => {
    const mockedState: any = {
      global: { term: 'foo' },
    };
    expect(selectSearchTerm(mockedState)).toEqual('foo');
  });
});
