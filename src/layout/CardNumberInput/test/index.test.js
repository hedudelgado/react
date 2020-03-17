import React from 'react';
import { shallow } from 'enzyme';
import CardNumberInput from '../index';
import CardNumberInputDefault from '../CardNumberInput';

jest.mock('../CardNumberInput', () => ({
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
    shallow(<CardNumberInput />);
    expect(CardNumberInputDefault).toHaveBeenCalled();
  });
});
