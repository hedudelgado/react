import React, { Component } from 'react';
import {
  string,
  func,
  number,
  object,
} from 'prop-types';
import Button from '../../layout/Button';
import Typography from '../../layout/Typography';
import BaseStyle from '../../layout/BaseStyle';
import DeleteModal from '../../layout/DeleteModal';
import { REGULAR_GUESTS_ERROR, REGULAR_GUESTS_VIEW } from '../App/appActions';

class RegularGuest extends Component {
  constructor(props) {
    super(props);

    this.deleteGuest = this.deleteGuest.bind(this);
  }

  async deleteGuest() {
    const {
      profile,
      closeModal,
      setNotificationMessage,
      updateProfileStore,
      profile: { additionalGuests },
      index,
      updateProfile,
    } = this.props;

    const payload = {
      ...profile,
      additionalGuests: [
        ...additionalGuests,
      ],
    };

    payload.additionalGuests.splice(index, 1);

    await updateProfile(payload)
      .then(() => {
        updateProfileStore(payload);
        setNotificationMessage(REGULAR_GUESTS_VIEW);
      }).catch(() => {
        setNotificationMessage(REGULAR_GUESTS_ERROR);
      });

    closeModal();
  }

  showEditMode(i) {
    const { setEditView, hideSuccessMessage } = this.props;
    setEditView(`${REGULAR_GUESTS_VIEW}_${i}`);
    hideSuccessMessage();
  }

  render() {
    const {
      dictionary,
      title,
      firstName,
      lastName,
      email,
      index,
      openModal,
      closeModal,
    } = this.props;

    return (
      <BaseStyle component="address" mb="3">
        <Typography component="span">{`${title} ${firstName} ${lastName}`}</Typography>
        <Typography component="span">{email}</Typography>
        <Button
          id={`delete-guest-${index}`}
          className="wb-text-btn--underline block mt2 mb2"
          color="red"
          variant="text"
          onClick={() => openModal(
            <DeleteModal
              title={dictionary['guests.delete.title']}
              subtext={dictionary['guests.delete.subtext']}
              deleteFunc={this.deleteGuest}
              buttonLabel={dictionary['guests.delete.button.label']}
              handleClose={closeModal}
              cancelLabel={dictionary['guests.cancel.link']}
            />,
          )}
        >
          {`${dictionary['guests.delete.link']} ${index + 1}`}
        </Button>
        <Button data-test={`edit-guest-${index}`} color="quaternary" onClick={() => this.showEditMode(index)}>
          {`${dictionary['guests.edit.button']} ${index + 1}`}
        </Button>
      </BaseStyle>
    );
  }
}

RegularGuest.propTypes = {
  dictionary: object.isRequired,
  profile: object.isRequired,
  updateProfileStore: func.isRequired,
  title: string.isRequired,
  firstName: string.isRequired,
  lastName: string.isRequired,
  email: string.isRequired,
  setNotificationMessage: func.isRequired,
  index: number.isRequired,
  openModal: func.isRequired,
  closeModal: func.isRequired,
  setEditView: func.isRequired,
  hideSuccessMessage: func.isRequired,
  updateProfile: func.isRequired,
};

export default RegularGuest;
