import React from 'react';
import { shallow } from 'enzyme';
import Grid, { Col } from '../index';

jest.mock('../Grid', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('../Col', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('Grid Component interface', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });
  it('Should export the main component', () => {
    shallow(<Grid />);
    expect(Grid).toHaveBeenCalled();
  });
  it('Should export the Col component', () => {
    shallow(<Col />);
    expect(Col).toHaveBeenCalled();
  });
});
