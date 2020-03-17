import React from 'react';
import { shallow } from 'enzyme';
import ComponentToggler, { ComponentTogglerContainer } from '../index';
import ComponentTogglerDefault from '../ComponentToggler';
import ComponentTogglerContainerDefault from '../ComponentTogglerContainer';

jest.mock('../ComponentToggler', () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock('../ComponentTogglerContainer', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('ComponentToggler Component interface', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });
  it('Should export the main component', () => {
    shallow(<ComponentToggler />);
    expect(ComponentTogglerDefault).toHaveBeenCalled();
  });
  it('Should export the container', () => {
    ComponentTogglerContainer();
    expect(ComponentTogglerContainerDefault).toHaveBeenCalled();
  });
});
