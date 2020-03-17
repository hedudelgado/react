import React from 'react';
import { shallow } from 'enzyme';
import PageStatusDefault from '../PageStatus';
import PageStatus from '../index';

jest.mock('../PageStatus', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('PageStatus interface', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });
  it('Should export the PageStatus component', () => {
    shallow(<PageStatus />);
    expect(PageStatusDefault).toHaveBeenCalled();
  });
});
