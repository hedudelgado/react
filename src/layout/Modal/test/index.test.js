import React from 'react';
import { shallow } from 'enzyme';
import Modal from '../index';

jest.mock('../Modal', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('Modal Component interface', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });
  it('Should export the main component', () => {
    shallow(<Modal />);
    expect(Modal).toHaveBeenCalled();
  });
});
