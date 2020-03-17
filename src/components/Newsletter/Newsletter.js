import React, { Component } from 'react';
import {
  array,
  object,
  func,
} from 'prop-types';
import Typography from '../../layout/Typography';
import BaseStyle from '../../layout/BaseStyle';
import Button from '../../layout/Button';
import Notification from '../../layout/Notification';
import { updateNewsletter } from '../../utils/api';
import { NEWSLETTER_ERROR, NEWSLETTER_VIEW } from '../App/appActions';
import { marketingRegions } from '../../config.json';

class Newsletter extends Component {
  constructor(props) {
    super(props);

    const { newsletter: { regionSubscriptions } } = props;

    const regionsSubscribed = regionSubscriptions.reduce((rSubscribed, region) => {
      if (region.subscribed) {
        rSubscribed.push(+region.regionId);
      }
      return rSubscribed;
    }, []);

    this.state = {
      regionSubscriptions,
      regionsSubscribed,
    };

    this.handleNewsletterSubmit = this.handleNewsletterSubmit.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }

  handleCheckboxChange(e) {
    const { regionSubscriptions } = this.state;
    // The checkbox indicates the user NOT wanting to receive emails,
    // so when checked subscribed should be false
    const subscribed = !e.target.checked;
    const regionId = +e.target.attributes.region.value;
    const index = regionSubscriptions.findIndex(i => +i.regionId === regionId);

    regionSubscriptions[index] = {
      regionId,
      subscribed,
    };

    this.setState({ regionSubscriptions });
  }

  handleNewsletterSubmit(e) {
    e.preventDefault();

    const {
      contactDetails: {
        email: emailAddress,
        address: {
          countryCode: countryCodeFromProfile,
        },
        firstName: firstNameFromProfile,
        lastName: lastNameFromProfile,
      },
      newsletter: {
        countryCode = countryCodeFromProfile,
        firstName = firstNameFromProfile,
        lastName = lastNameFromProfile,
        sessionId,
      },
      updateNewsletterStore,
      setNotificationMessage,
    } = this.props;

    const { regionSubscriptions } = this.state;

    const payload = {
      emailAddress,
      regionSubscriptions,
      sessionId,
      firstName,
      lastName,
      countryCode,
    };

    updateNewsletter(payload)
      .then(() => {
        setNotificationMessage(NEWSLETTER_VIEW);
        updateNewsletterStore(payload);
      }).catch(() => {
        setNotificationMessage(NEWSLETTER_ERROR);
      });
  }

  render() {
    const {
      app: {
        notificationMessage,
      },
      dictionary,
      regions,
    } = this.props;

    const { regionsSubscribed } = this.state;

    const newsletterOptions = regions
      .filter((region) => {
        const currentId = +region.id;
        return marketingRegions.includes(currentId);
      })
      .map((region) => {
        const currentId = +region.id;
        const regionIdSelector = `newsletter-region-${currentId}`;

        return (
          <BaseStyle
            key={region.id}
            component="div"
            data-test={regionIdSelector}
            className="wb-checkbox wb-checkbox__white mb2"
          >
            <input
              id={regionIdSelector}
              name={regionIdSelector}
              region={currentId}
              type="checkbox"
              // The checkbox indicates the user NOT wanting to receive emails,
              // so it should display the opposite of subscribed status
              defaultChecked={!regionsSubscribed.includes(currentId)}
              onChange={this.handleCheckboxChange}
            />
            <label htmlFor={regionIdSelector} className="font-size--base">
              {dictionary[`newsletter.region.${currentId}`]}
            </label>
          </BaseStyle>
        );
      });

    return (
      <BaseStyle data-test="newsletter-component" component="section" className="component-container">
        {notificationMessage === NEWSLETTER_ERROR && (
          <Notification data-test="error-notification" priority={2} variant="error" ariaLive="polite" show>
            {dictionary['generic.error']}
          </Notification>
        )}
        {notificationMessage === NEWSLETTER_VIEW && (
          <Notification data-test="success-message" priority={2} variant="success" ariaLive="polite" show>
            {dictionary['update.success.message']}
          </Notification>
        )}
        <Typography component="h4" className="pi-color-greyscale-darkest">
          {dictionary['newsletter.title']}
        </Typography>
        <Typography mb="2" dangerouslySetInnerHTML={{ __html: dictionary['newsletter.body'] }} />
        <form name="newsletter-form" onSubmit={this.handleNewsletterSubmit}>
          <BaseStyle component="section" mb="3">
            {newsletterOptions}
          </BaseStyle>
          <Button data-test="update-newsletter" color="secondary" mt="2" type="submit" fullWidth>
            {dictionary['newsletter.button.save']}
          </Button>
        </form>
      </BaseStyle>
    );
  }
}

Newsletter.propTypes = {
  contactDetails: object.isRequired,
  app: object.isRequired,
  dictionary: object.isRequired,
  regions: array.isRequired,
  newsletter: object.isRequired,
  updateNewsletterStore: func.isRequired,
  setNotificationMessage: func.isRequired,
};

export default Newsletter;
