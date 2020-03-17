import React from 'react';
import { shallow } from 'enzyme';
import IconDefault from '../Icon';
import Icon from '../index';

jest.mock('../Icon', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('SingleBooking interface', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });
  it('Should export the main component', () => {
    shallow(<Icon />);
    expect(IconDefault).toHaveBeenCalled();
  });
});
