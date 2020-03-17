import React from 'react';
import { shallow } from 'enzyme';
import RadioGroup from '../index';

jest.mock('../RadioGroup', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('RadioGroup Component interface', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });
  it('Should export the main component', () => {
    shallow(<RadioGroup />);
    expect(RadioGroup).toHaveBeenCalled();
  });
});
