import React from 'react';
import { shallow } from 'enzyme';
import Select from '../index';

jest.mock('../Select', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('Select Component interface', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });
  it('Should export the main component', () => {
    shallow(<Select />);
    expect(Select).toHaveBeenCalled();
  });
});
