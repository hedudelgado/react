import React from 'react';
import { func, object } from 'prop-types';
import Button from '../../layout/Button';
import Notification from '../../layout/Notification';
import { DEFAULT_VIEW, PASSWORD_VIEW } from '../App/appActions';

const Password = ({
  app,
  dictionary,
  setEditView,
  setNotificationMessage,
}) => {
  const showEditMode = () => {
    setEditView(PASSWORD_VIEW);
    setNotificationMessage(DEFAULT_VIEW);
  };

  return (
    <section className="component-container">
      {app.notificationMessage === PASSWORD_VIEW && (
        <Notification data-test="success-message" priority={2} variant="success" ariaLive="polite" show>
          {dictionary['password.success.message']}
        </Notification>
      )}
      <h4 className="wb-heading--h4 pi-color-greyscale-darkest">
        {dictionary['password.preview.title']}
      </h4>
      <div className="basic-spacer">{dictionary['password.preview.password']}</div>
      <Button id="change-password" color="quaternary" onClick={showEditMode}>
        {dictionary['password.button.changepassword']}
      </Button>
    </section>
  );
};

Password.propTypes = {
  app: object.isRequired,
  dictionary: object.isRequired,
  setEditView: func.isRequired,
  setNotificationMessage: func.isRequired,
};

export default Password;
