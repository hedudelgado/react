import React from 'react';
import { shallow } from 'enzyme';
import AddressForm from '../index';
import AddressFormDefault from '../AddressForm';

jest.mock('../AddressForm', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('AddressForm Component interface', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('Should export the main component', () => {
    shallow(<AddressForm />);
    expect(AddressFormDefault).toHaveBeenCalled();
  });
});
