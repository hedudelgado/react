import AppComponentDefault from '../App';
import AppContainerDefault from '../AppContainer';
import appActionsDefault from '../appActions';
import App, { AppContainer, AppActions, modalReducer } from '../index';

jest.mock('../App', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('../AppContainer', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('../appActions', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('../modalReducer', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('App Component interface', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('Should export the main component', () => {
    AppComponentDefault();
    expect(App).toHaveBeenCalled();
  });
  it('Should export the AppContainer', () => {
    appActionsDefault();
    expect(AppActions).toHaveBeenCalled();
  });
  it('Should export appActions', () => {
    AppContainerDefault();
    expect(AppContainer).toHaveBeenCalled();
  });

  it('Should export the modal reducer', () => {
    modalReducer();
    expect(modalReducer).toHaveBeenCalled();
  });
});
