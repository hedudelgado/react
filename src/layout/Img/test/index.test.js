import React from 'react';
import { shallow } from 'enzyme';
import Img from '../index';
import ImgDefault from '../Img';

jest.mock('../Img', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('Img Component interface', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });
  it('Should export the main component', () => {
    shallow(<Img />);
    expect(ImgDefault).toHaveBeenCalled();
  });
});
