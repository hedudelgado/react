import NewsletterDefault from '../Newsletter';
import Newsletter, { NewsletterContainer } from '../index';
import NewsletterContainerDefault from '../NewsletterContainer';

jest.mock('../Newsletter', () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock('../NewsletterContainer', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('Newsletter Component interface', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });
  it('Should export the main component', () => {
    NewsletterDefault();
    expect(Newsletter).toHaveBeenCalled();
  });
  it('Should export the container', () => {
    NewsletterContainerDefault();
    expect(NewsletterContainer).toHaveBeenCalled();
  });
});
