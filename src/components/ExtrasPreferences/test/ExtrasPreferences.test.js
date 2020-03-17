import React from 'react';
import { shallow } from 'enzyme';
import { DEFAULT_VIEW, EXTRAS_PREFERENCES_VIEW } from '../../App/appActions';
import ExtrasPreferences from '../ExtrasPreferences';

describe('ExtrasPreferences Component', () => {
  let wrapper;

  const props = {
    app: {},
    dictionary: {
      'extraspreferences.title': 'Extras Preferences',
      'extraspreferences.button.edit': 'Edit extras preferences',
    },
    setEditView: jest.fn(),
    setNotificationMessage: jest.fn(),
  };

  beforeEach(() => {
    wrapper = shallow(<ExtrasPreferences {...props} />);
  });

  describe('Renders ExtrasPreferences Component Elements', () => {
    it('should render the component', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should trigger setEditView when clicking the edit extras preferences button', () => {
      wrapper.find('[data-test="edit-extras-preferences"]').simulate('click');
      expect(props.setEditView).toHaveBeenCalledTimes(1);
      expect(props.setNotificationMessage).toHaveBeenCalledTimes(1);
    });

    it('should show success message when room requirements updated successfully', () => {
      const copyProps = {
        ...props,
        app: { editViewName: DEFAULT_VIEW, notificationMessage: EXTRAS_PREFERENCES_VIEW },
      };
      wrapper = shallow(<ExtrasPreferences {...copyProps} />);
      expect(wrapper).toContainExactlyOneMatchingElement('[data-test="success-message"]');
    });
  });
});
