import React from 'react';
import {
  shallow,
} from 'enzyme';
import App from '../App';
import profile from '../../../../__mocks__/profile.json';
import config from '../../../config.json';

const getSettings = jest.fn();
const dictionary = {
  test: 'test',
  'logged.out.error.heading': 'heading',
  'logged.out.error.body': 'body',
};
const displayModal = false;
const handleModalClose = jest.fn();
const countries = [{
  countryCode: 'GB',
  countryCodeISO: 'GB',
  countryLegend: 'United Kingdom (the)',
  passportRequired: false,
  dialingCode: '+44',
  flagImg: '/content/dam/global/flags/United-Kingdom.png',
}];

const application = {
  language: 'en',
};

const regions = [{
  id: '1',
  description: 'UK & Ireland',
  active: true,
}];
const newsletter = {
  regionSubscriptions: [],
};
const defaultProps = {
  getSettings,
  dictionary,
  newsletter,
  regions,
  countries,
  profile,
  application,
  displayModal,
  handleModalClose,
  userDataReceived: true,
};

describe('App shell', () => {
  describe('Layout', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<App {...defaultProps} />);
    });

    it('should render the Account Settings application', () => {
      expect(wrapper).toMatchSelector('[data-test="AccountSettings"]');
      expect(wrapper).toContainMatchingElement('.app-container');
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should not render the Modal component by default', () => {
      expect(wrapper).not.toContainMatchingElement('[data-test="Modal"]');
    });

    it('should render the Modal component', () => {
      defaultProps.displayModal = true;
      wrapper.setProps(defaultProps);
      expect(wrapper).toContainMatchingElement('[data-test="Modal"]');
    });

    it('should not show app container if the user data is not received', () => {
      wrapper.setProps({
        userDataReceived: false,
      });
      expect(wrapper.find('.app-container')).not.toExist();
    });

    it('should not show app container if showEmailPreferences is enabled but regions are not received', () => {
      wrapper.setProps({
        userDataReceived: true,
        application: {
          showEmailPreferences: true,
        },
        regions: [],
      });
      expect(wrapper.find('.app-container')).not.toExist();
    });

    it('should not show app container if showEmailPreferences is enabled but newsletter is not received', () => {
      wrapper.setProps({
        userDataReceived: true,
        application: {
          showEmailPreferences: true,
        },
        regions: [1],
        newsletter: {},
      });
      expect(wrapper.find('.app-container')).not.toExist();
    });

    it('should show delete profile option if user is not a business user', () => {
      wrapper.setProps({
        profile: {
          business: undefined,
        },
      });

      expect(wrapper.find('Connect(DeleteCustomer)')).toExist();
    });

    it('should not show delete profile button if user is a business user', () => {
      wrapper.setProps({
        profile: {
          business: {
            accessLevel: config.BOOKER,
          },
        },
      });

      expect(wrapper.find('Connect(DeleteCustomer)')).not.toExist();
    });

    it('should not show Newsletter if showEmailPreferences is not enabled', () => {
      wrapper.setProps({
        userDataReceived: true,
        application: {
          showEmailPreferences: false,
        },
        regions: [1],
        newsletter: { someProp: 'someVal' },
      });
      expect(wrapper.find('Connect(Newsletter)')).not.toExist();
    });

    it('should show Newsletter if showEmailPreferences is enabled', () => {
      wrapper.setProps({
        userDataReceived: true,
        application: {
          showEmailPreferences: true,
        },
        regions: [1],
        newsletter: { someProp: 'someVal' },
      });
      expect(wrapper.find('Connect(Newsletter)')).toExist();
    });

    it('should show Manage Permissions component when managePermissionFlag is true', () => {
      config.managePermissionFlag = true;
      wrapper = shallow(<App {...defaultProps} />);
      expect(wrapper).toContainExactlyOneMatchingElement('ManagePermission');
    });

    it('should not show Manage Permissions component when managePermissionFlag is false', () => {
      config.managePermissionFlag = false;
      wrapper = shallow(<App {...defaultProps} />);
      expect(wrapper).not.toContainMatchingElement('ManagePermission');
    });

    it('should show Memorable Word component when guid is defined', () => {
      const newProfile = {
        contactDetail: {
          email: 'test@mailinator.com',
        },
        business: {
          tetheredGuid: 'aaa',
        },
      };
      wrapper.setProps({
        profile: newProfile,
      });
      expect(wrapper).toContainExactlyOneMatchingElement('Connect(MemorableWord)');
    });

    it('should render the MoveAccount component for non tethered business accounts', () => {
      const newProfile = {
        contactDetail: {
          email: 'test@mailinator.com',
        },
        business: {
          somethingElse: 'aaa',
        },
      };
      wrapper.setProps({
        profile: newProfile,
      });
      expect(wrapper).toContainExactlyOneMatchingElement('Connect(MoveAccount)');
    });
  });

  describe('app behaviour', () => {
    let wrapper;
    beforeEach(() => {
      jest.clearAllMocks();
      wrapper = shallow(<App {...defaultProps} />);
    });

    it('should remove userLoggedIn event listener on unmount', () => {
      window.removeEventListener = jest.fn();
      wrapper.unmount();
      expect(window.removeEventListener).toHaveBeenCalled();
    });

    it('should call getSettings on userLoggedIn ', async () => {
      const map = {};
      window.addEventListener = jest.fn((event, cb) => {
        map[event] = cb;
      });
      shallow(<App
        {
          ...defaultProps
        }
      />);
      await map.message({
        data: {
          action: 'userLoggedIn',
          profile: JSON.stringify(profile),
        },
      }); expect(getSettings).toHaveBeenCalledWith('some_email@email.com', 'b7o4HMeLxWQn8YzG', false);
    });

    it('should not call getSettings when the message action is not userLoggedIn', async () => {
      const map = {};
      window.addEventListener = jest.fn((event, cb) => {
        map[event] = cb;
      });
      shallow(<App
        {
          ...defaultProps
        }
      />);
      await map.message({
        data: {
          action: 'otherAction',
          profile: JSON.stringify(profile),
        },
      }); expect(getSettings).not.toHaveBeenCalled();
    });
  });
});
