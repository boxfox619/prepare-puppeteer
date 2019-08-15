import { search } from '../google-search';

describe('google-search-test', () => {
  it('search 박스여우', async () => {
    const links = await search('박스여우');
    expect(links.length).toBeGreaterThan(5);
    expect(links).toContain('박스여우 - BoxFox');
  })
});