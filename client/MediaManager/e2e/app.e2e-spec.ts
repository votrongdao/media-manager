import { MediaManagerPage } from './app.po';

describe('media-manager App', () => {
  let page: MediaManagerPage;

  beforeEach(() => {
    page = new MediaManagerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
