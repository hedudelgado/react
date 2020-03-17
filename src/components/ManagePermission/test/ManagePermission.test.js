
import React from 'react';
import { shallow } from 'enzyme';
import ManagePermission from '../ManagePermission';

jest.mock('../../../utils/session-storage', () => ({
  __esModule: true,
  getJsonItem: () => ({
    domain: 'https://www.premierinn.com.de-qa.nativ-systems.com',
  }),
}));

describe('ManagePermission Component', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      dictionary: {
        'managepermission.title': 'Contact and permissions centre',
        'managepermission.button': 'Manage permissions',
      },
      redirectToCustomerPreference: jest.fn(),
    };
    wrapper = shallow(<ManagePermission {...props} />);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should show the Manage Permission Button', () => {
    expect(wrapper).toContainExactlyOneMatchingElement('[data-test="manage-permission"]');
  });

  it('should trigger the link when clicking the Manage Permission button', () => {
    window.location.assign = jest.fn();
    wrapper.find('[data-test="manage-permission"]').simulate('click');
    expect(window.location.assign).toHaveBeenCalledWith('https://www.premierinn.com.de-qa.nativ-systems.com/gb/en/home.html');
  });
});
