import React from 'react';
import { object, func } from 'prop-types';
import BaseStyle from '../../layout/BaseStyle';
import Typography from '../../layout/Typography';
import Button from '../../layout/Button';
import Notification from '../../layout/Notification';
import { DEFAULT_VIEW, ROOM_REQUIREMENTS_VIEW } from '../App/appActions';

const RoomRequirements = ({
  app: { notificationMessage },
  dictionary,
  setEditView,
  setNotificationMessage,
}) => {
  const showEditMode = () => {
    setEditView(ROOM_REQUIREMENTS_VIEW);
    setNotificationMessage(DEFAULT_VIEW);
  };

  return (
    <BaseStyle component="div" className="component-container">
      {notificationMessage === ROOM_REQUIREMENTS_VIEW && (
        <Notification data-test="success-message" priority={2} variant="success" ariaLive="polite" show>
          {dictionary['roomrequirements.notification.success']}
        </Notification>
      )}
      <Typography component="h4" className="pi-color-greyscale-darkest">
        {dictionary['roomrequirements.title']}
      </Typography>
      <Typography component="p" mb="3">
        {dictionary['roomrequirements.description']}
      </Typography>
      <Button data-test="edit-roomrequirements" color="quaternary" onClick={showEditMode}>
        {dictionary['roomrequirements.button.edit']}
      </Button>
    </BaseStyle>
  );
};

RoomRequirements.propTypes = {
  app: object.isRequired,
  dictionary: object.isRequired,
  setEditView: func.isRequired,
  setNotificationMessage: func.isRequired,
};

export default RoomRequirements;
