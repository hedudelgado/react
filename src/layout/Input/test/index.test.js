import React from 'react';
import { shallow } from 'enzyme';
import Input from '../index';

jest.mock('../Input', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('Input Component interface', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });
  it('Should export the main component', () => {
    shallow(<Input />);
    expect(Input).toHaveBeenCalled();
  });
});
