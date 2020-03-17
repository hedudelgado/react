import React from 'react';
import { shallow } from 'enzyme';
import BaseStyle from '../index';

jest.mock('../BaseStyle', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('BaseStyle Component interface', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });
  it('Should export the main component', () => {
    shallow(<BaseStyle />);
    expect(BaseStyle).toHaveBeenCalled();
  });
});
