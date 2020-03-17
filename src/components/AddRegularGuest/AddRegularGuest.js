import React from 'react';
import { object, func } from 'prop-types';
import Button from '../../layout/Button';
import BaseStyle from '../../layout/BaseStyle';
import { DEFAULT_VIEW, ADD_GUEST_VIEW } from '../App/appActions';

const AddRegularGuest = ({
  dictionary,
  setEditView,
  setNotificationMessage,
}) => {
  const showEditMode = () => {
    setEditView(ADD_GUEST_VIEW);
    setNotificationMessage(DEFAULT_VIEW);
  };

  return (
    <BaseStyle component="div">
      <Button id="add-guest" color="secondary" fullWidth onClick={showEditMode}>
        {dictionary['guests.button.add']}
      </Button>
    </BaseStyle>
  );
};

AddRegularGuest.propTypes = {
  dictionary: object.isRequired,
  setEditView: func.isRequired,
  setNotificationMessage: func.isRequired,
};

export default AddRegularGuest;
