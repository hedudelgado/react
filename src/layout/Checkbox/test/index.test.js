import React from 'react';
import { shallow } from 'enzyme';
import CheckboxDefault from '../Checkbox';
import Checkbox from '../index';

jest.mock('../Checkbox', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('checkbox Component interface', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });
  it('Should export the main component', () => {
    shallow(<Checkbox />);
    expect(CheckboxDefault).toHaveBeenCalled();
  });
});
