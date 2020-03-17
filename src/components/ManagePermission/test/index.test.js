import React from 'react';
import { shallow } from 'enzyme';
import ManagePermission from '../index';

jest.mock('../ManagePermission', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('ManagePermission Component interface', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('Should export the main component', () => {
    shallow(<ManagePermission />);
    expect(ManagePermission).toHaveBeenCalled();
  });
});
