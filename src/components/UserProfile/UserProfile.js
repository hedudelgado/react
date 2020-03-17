import React, { Fragment } from 'react';
import { array, func, object } from 'prop-types';
import Button from '../../layout/Button';
import Notification from '../../layout/Notification';
import { DEFAULT_VIEW, USER_DETAILS_VIEW } from '../App/appActions';

const UserProfile = ({
  profile: {
    contactDetail,
    contactDetail: {
      address: {
        companyName,
      },
    },
  },
  countries,
  dictionary,
  app,
  setEditView,
  setNotificationMessage,
}) => {
  const addressLines = Object.keys(contactDetail.address)
    .filter(key => /^line/.test(key) && contactDetail.address[key]);

  const renderAddressLines = addressLines.map(line => (
    <div key={line}>
      {contactDetail.address[line]}
    </div>
  ));

  const { countryLegend } = countries
    .find(country => country.countryCode === contactDetail.address.countryCode);

  const showEditMode = () => {
    setEditView(USER_DETAILS_VIEW);
    setNotificationMessage(DEFAULT_VIEW);
  };

  return (
    <section className="component-container">
      {app.notificationMessage === USER_DETAILS_VIEW && (
        <Notification data-test="success-notification" priority={2} variant="success" ariaLive="polite" show>
          {dictionary['update.success.message']}
        </Notification>
      )}
      <h4 className="wb-heading--h4 pi-color-greyscale-darkest">
        {dictionary['profile.title']}
      </h4>
      <address className="basic-spacer">
        <div>
          {companyName && (
            <Fragment>
              {companyName}
              <br />
            </Fragment>
          )}
          {`${contactDetail.title} ${contactDetail.firstName} ${contactDetail.lastName}`}
          <br />
          {contactDetail.mobile}
          <br />
          {contactDetail.email}
          <br />
        </div>
        <div className="capitalize">
          {renderAddressLines}
          <span className="uppercase">{contactDetail.address.postCode}</span>
          <br />
          {countryLegend}
        </div>
      </address>
      <Button id="edit-profile" color="quaternary" onClick={showEditMode}>
        {dictionary['profile.button.edit']}
      </Button>
    </section>
  );
};

UserProfile.propTypes = {
  app: object.isRequired,
  profile: object.isRequired,
  countries: array.isRequired,
  dictionary: object.isRequired,
  setEditView: func.isRequired,
  setNotificationMessage: func.isRequired,
};

export default UserProfile;
