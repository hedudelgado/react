import React from 'react';
import { shallow } from 'enzyme';
import HyperlinkDefault from '../Hyperlink';
import Hyperlink from '..';

jest.mock('../Hyperlink', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('Hyperlink interface', () => {
  it('Should export the Hyperlink component', () => {
    shallow(<Hyperlink />);
    expect(HyperlinkDefault).toHaveBeenCalled();
  });
});
