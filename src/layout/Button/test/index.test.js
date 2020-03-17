import React from 'react';
import { shallow } from 'enzyme';
import Button from '../index';

jest.mock('../Button', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('Example Component interface', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });
  it('Should export the main component', () => {
    shallow(<Button />);
    expect(Button).toHaveBeenCalled();
  });
});
