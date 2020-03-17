import React from 'react';
import { shallow } from 'enzyme';
import Typography from '../index';

jest.mock('../Typography', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('Typography interface', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });
  it('Should export the Typography component', () => {
    shallow(<Typography />);
    expect(Typography).toHaveBeenCalled();
  });
});
