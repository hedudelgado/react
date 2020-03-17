import React from 'react';
import { func, object } from 'prop-types';
import Typography from '../../layout/Typography';
import { ComponentTogglerContainer } from '../ComponentToggler';
import {
  REGULAR_GUESTS_VIEW,
  ADD_GUEST_VIEW,
  REGULAR_GUESTS_ERROR,
} from '../App/appActions';
import RegularGuest from './RegularGuest';
import AddRegularGuest from '../AddRegularGuest';
import RegularGuestsForm from '../RegularGuestsForm';
import Notification from '../../layout/Notification';

const MAX_REGULAR_GUESTS = 6;

const RegularGuests = ({
  profile: {
    additionalGuests = [],
  },
  dictionary,
  app: { notificationMessage },
  openModal,
  closeModal,
  setEditView,
  hideSuccessMessage,
}) => {
  const userHasGuests = additionalGuests && additionalGuests.length;

  return (
    <section className="component-container">
      {notificationMessage === REGULAR_GUESTS_ERROR && (
        <Notification data-test="error-notification" priority={2} variant="error" ariaLive="polite" show>
          {dictionary['generic.error']}
        </Notification>
      )}
      {notificationMessage === REGULAR_GUESTS_VIEW && (
        <Notification data-test="success-message" priority={2} variant="success" ariaLive="polite" show>
          {dictionary['guests.notification.text']}
        </Notification>
      )}
      <Typography component="h4" className="pi-color-greyscale-darkest">
        {dictionary['guests.title']}
      </Typography>
      {!userHasGuests && (
      <Typography mb="3" data-test="no-guests-message">
        {dictionary['guests.noGuests']}
      </Typography>
      )}
      {
          !!userHasGuests
          && additionalGuests.map((guest, i) => (
            <ComponentTogglerContainer
              key={guest.email}
              viewName={`${REGULAR_GUESTS_VIEW}_${i}`}
              view={RegularGuest}
              edit={RegularGuestsForm}
              {...guest}
              index={i}
              setEditView={setEditView}
              hideSuccessMessage={hideSuccessMessage}
              openModal={openModal}
              closeModal={closeModal}
            />
          ))
      }
      { additionalGuests.length < MAX_REGULAR_GUESTS && (
        <ComponentTogglerContainer
          viewName={ADD_GUEST_VIEW}
          view={AddRegularGuest}
          edit={RegularGuestsForm}
        />
      )}
    </section>
  );
};

RegularGuests.propTypes = {
  app: object.isRequired,
  profile: object.isRequired,
  dictionary: object.isRequired,
  hideSuccessMessage: func.isRequired,
  openModal: func.isRequired,
  closeModal: func.isRequired,
  setEditView: func.isRequired,
};

export default RegularGuests;
