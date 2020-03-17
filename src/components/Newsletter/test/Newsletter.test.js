import React from 'react';
import { shallow } from 'enzyme';
import Newsletter from '../Newsletter';
import { updateNewsletter } from '../../../utils/api';
import { NEWSLETTER_ERROR, NEWSLETTER_VIEW } from '../../App/appActions';

jest.mock('../../../utils/api', () => ({
  __esModule: true,
  updateNewsletter: jest.fn(() => Promise.resolve({})),
}));

describe('Newsletter Component', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      contactDetails: {
        email: 'emailFromProfile',
        address: {
          countryCode: 'countryCodeFromProfile',
        },
        firstName: 'firstNameFromProfile',
        lastName: 'lastNameFromProfile',
      },
      app: {},
      dictionary: {
        'newsletter.title': 'Email preferences',
        'newsletter.body': 'We would like to send you news and offers. If you would prefer not to receive these, please ensure this box is ticked.',
        'newsletter.region.1': 'I don\'t want to receive email market about Premier Inn hotels',
        'newsletter.button.save': 'Save changes',
      },
      regions: [
        {
          id: '1',
          description: 'UK & Ireland',
          active: true,
        },
        {
          id: '2',
          description: 'Dubai',
          active: true,
        },
        {
          id: '3',
          description: 'India',
          active: true,
        },
        {
          id: '4',
          description: 'hub by Premier Inn',
          active: true,
        },
        {
          id: '5',
          description: 'Germany',
          active: true,
        },
      ],
      newsletter: {
        sessionId: 'sessionIdFromNewsletter',
        firstName: 'firstNameFromNewsletter',
        lastName: 'lastNameFromNewsletter',
        countryCode: 'countryCodeFromNewsletter',
        emailAddress: 'fresh@mailinator.com',
        regionSubscriptions: [
          {
            regionId: 1,
            subscribed: true,
          },
          {
            regionId: 2,
            subscribed: false,
          },
          {
            regionId: 3,
            subscribed: true,
          },
        ],
      },
      updateNewsletterStore: jest.fn(),
      setNotificationMessage: jest.fn(),
    };

    wrapper = shallow(<Newsletter {...props} />);
  });

  describe('Renders Newsletter Component Elements', () => {
    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should render the Newsletter options', () => {
      expect(wrapper.find('[data-test^="newsletter-region-"]')).toHaveLength(4);
    });

    it('should render the update newsletter options button', () => {
      expect(wrapper.find('[data-test="update-newsletter"]')).toHaveLength(1);
    });
  });

  describe('Newsletter Preferences Business logic', () => {
    it('should show checkboxes as un-checked for subscribed regions', () => {
      expect(wrapper.find('[data-test^="newsletter-region-1"]').dive().find('[name="newsletter-region-1"]')).not.toBeChecked();
    });

    it('should show checkboxes as checked for un-subscribed regions', () => {
      expect(wrapper.find('[data-test^="newsletter-region-2"]').dive().find('[name="newsletter-region-2"]')).toBeChecked();
    });
  });

  describe('Marketing newsletters form submission', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should execute Newsletter update success procedure', async () => {
      const updatedRegionValue = 1;
      const option = wrapper
        .find(`[data-test^="newsletter-region-${updatedRegionValue}"]`)
        .dive()
        .find(`[name="newsletter-region-${updatedRegionValue}"]`);

      const event = {
        target: {
          checked: true,
          attributes: {
            region: {
              value: updatedRegionValue,
            },
          },
        },
      };

      option.simulate('change', event);
      wrapper.find('[name="newsletter-form"]').simulate('submit', { preventDefault: () => {} });
      await updateNewsletter;

      expect(updateNewsletter).toHaveBeenCalledWith({
        ...props.newsletter,
        emailAddress: 'emailFromProfile',
        regionSubscriptions: [
          {
            regionId: updatedRegionValue,
            subscribed: !event.target.checked,
          },
          {
            regionId: 2,
            subscribed: false,
          },
          {
            regionId: 3,
            subscribed: true,
          },
        ],
      });
      expect(props.setNotificationMessage).toHaveBeenCalledTimes(1);
      expect(props.updateNewsletterStore).toHaveBeenCalledTimes(1);
    });

    it('should include personal details from newsletter in payload if available', async () => {
      const option = wrapper
        .find('[data-test^="newsletter-region-1"]')
        .dive()
        .find('[name="newsletter-region-1"]');

      const event = {
        target: {
          checked: true,
          attributes: {
            region: {
              value: 1,
            },
          },
        },
      };

      option.simulate('change', event);
      wrapper.find('[name="newsletter-form"]').simulate('submit', { preventDefault: () => {} });

      expect(updateNewsletter).toHaveBeenCalledWith({
        ...props.newsletter,
        emailAddress: 'emailFromProfile',
        sessionId: 'sessionIdFromNewsletter',
        countryCode: 'countryCodeFromNewsletter',
        firstName: 'firstNameFromNewsletter',
        lastName: 'lastNameFromNewsletter',
      });
    });

    it('should include personal details from profile in payload if newsletter details are not available', async () => {
      props.newsletter.firstName = undefined;
      props.newsletter.lastName = undefined;
      props.newsletter.countryCode = undefined;

      wrapper = shallow(<Newsletter {...props} />);

      const option = wrapper
        .find('[data-test^="newsletter-region-1"]')
        .dive()
        .find('[name="newsletter-region-1"]');

      const event = {
        target: {
          checked: true,
          attributes: {
            region: {
              value: 1,
            },
          },
        },
      };

      option.simulate('change', event);
      wrapper.find('[name="newsletter-form"]').simulate('submit', { preventDefault: () => {} });

      expect(updateNewsletter).toHaveBeenCalledWith({
        ...props.newsletter,
        emailAddress: 'emailFromProfile',
        sessionId: 'sessionIdFromNewsletter',
        firstName: 'firstNameFromProfile',
        lastName: 'lastNameFromProfile',
        countryCode: 'countryCodeFromProfile',
      });
    });

    it('should execute Newsletter update failure procedure', async () => {
      wrapper = shallow(<Newsletter {...props} />);
      const option = wrapper
        .find('[data-test^="newsletter-region-1"]')
        .dive()
        .find('[name="newsletter-region-1"]');

      const event = {
        target: {
          checked: true,
          attributes: {
            region: {
              value: 1,
            },
          },
        },
      };

      const error = new Error('err');
      updateNewsletter.mockImplementationOnce(() => Promise.reject(error));

      option.simulate('change', event);
      wrapper.find('[name="newsletter-form"]').simulate('submit', { preventDefault: () => {} });

      await Promise.all([updateNewsletter]).then(() => {
        expect(props.setNotificationMessage)
          .toHaveBeenCalledTimes(1)
          .toHaveBeenCalledWith(NEWSLETTER_ERROR);
        expect(props.updateNewsletterStore).not.toHaveBeenCalled();
      });
    });

    it('should display the success notification', () => {
      props.app.notificationMessage = NEWSLETTER_VIEW;
      wrapper = shallow(<Newsletter {...props} />);

      expect(wrapper.find('[data-test="newsletter-component"]').dive())
        .toContainExactlyOneMatchingElement('[data-test="success-message"]');
    });

    it('should display the error notification', () => {
      props.app.notificationMessage = NEWSLETTER_ERROR;
      wrapper = shallow(<Newsletter {...props} />);

      expect(wrapper.find('[data-test="newsletter-component"]').dive())
        .toContainExactlyOneMatchingElement('[data-test="error-notification"]');
    });
  });
});
