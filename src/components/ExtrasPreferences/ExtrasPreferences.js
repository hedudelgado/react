import React from 'react';
import { object, func } from 'prop-types';
import BaseStyle from '../../layout/BaseStyle';
import Typography from '../../layout/Typography';
import Button from '../../layout/Button';
import Notification from '../../layout/Notification';
import { DEFAULT_VIEW, EXTRAS_PREFERENCES_VIEW } from '../App/appActions';

const ExtrasPreferences = ({
  app: {
    notificationMessage,
  },
  dictionary,
  setEditView,
  setNotificationMessage,
}) => {
  const showEditMode = () => {
    setEditView(EXTRAS_PREFERENCES_VIEW);
    setNotificationMessage(DEFAULT_VIEW);
  };

  return (
    <BaseStyle component="div" className="component-container">
      {notificationMessage === EXTRAS_PREFERENCES_VIEW && (
        <Notification data-test="success-message" priority={2} variant="success" ariaLive="polite" show>
          {dictionary['extraspreferences.notification.success']}
        </Notification>
      )}
      <Typography component="h4" className="pi-color-greyscale-darkest">
        {dictionary['extraspreferences.title']}
      </Typography>
      <Typography component="p" mb="3">
        {dictionary['extraspreferences.description']}
      </Typography>
      <Button data-test="edit-extras-preferences" color="quaternary" onClick={showEditMode}>
        {dictionary['extraspreferences.button.edit']}
      </Button>
    </BaseStyle>
  );
};

ExtrasPreferences.propTypes = {
  app: object.isRequired,
  dictionary: object.isRequired,
  setEditView: func.isRequired,
  setNotificationMessage: func.isRequired,
};

export default ExtrasPreferences;
