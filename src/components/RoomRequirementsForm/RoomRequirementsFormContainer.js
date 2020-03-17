import React, { PureComponent } from 'react';
import { func, object } from 'prop-types';
import { Formik } from 'formik';
import BaseStyle from '../../layout/BaseStyle';
import Typography from '../../layout/Typography';
import RoomRequirementsForm from './RoomRequirementsForm';
import {
  ROOM_REQUIREMENTS_VIEW,
  DEFAULT_VIEW,
  ROOM_REQUIREMENTS_ERROR,
} from '../App/appActions';
import Notification from '../../layout/Notification';
import { roomRequirements as roomRequirementsConfig } from '../../config.json';

export default class RoomRequirementsFormContainer extends PureComponent {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values, actions) {
    const {
      setNotificationMessage,
      updateProfileStore,
      setEditView,
      updateProfile,
    } = this.props;
    const payload = this.createPayload(values);

    updateProfile(payload)
      .then(() => {
        setNotificationMessage(ROOM_REQUIREMENTS_VIEW);
        setEditView(DEFAULT_VIEW);
        actions.setSubmitting(false);
        updateProfileStore(payload);
      }).catch(() => {
        setNotificationMessage(ROOM_REQUIREMENTS_ERROR);
      });
  }

  createPayload(values) {
    const {
      adults,
      children,
      cotRequired,
      type,
    } = values;
    const { profile } = this.props;

    return {
      ...profile,
      bookingPreference: {
        ...profile.bookingPreference,
        roomRequirements: {
          adults: +adults,
          children: +children,
          cotRequired: cotRequired === 'true',
          type,
          hotelBrand: profile.bookingPreference
            && profile.bookingPreference.roomRequirements
            && profile.bookingPreference.roomRequirements.hotelBrand
            ? profile.bookingPreference.roomRequirements.hotelBrand
            : roomRequirementsConfig.defaults.hotelBrand,
        },
      },
    };
  }

  render() {
    const {
      profile,
      setEditView,
      dictionary,
      app: { notificationMessage },
    } = this.props;
    const {
      bookingPreference: {
        roomRequirements: {
          adults = roomRequirementsConfig.defaults.adults,
          children = roomRequirementsConfig.defaults.children,
          cotRequired = roomRequirementsConfig.defaults.cotRequired,
          type = roomRequirementsConfig.defaults.type,
        } = {},
      } = {},
    } = profile;

    return (
      <BaseStyle component="section" className="component-container">
        {notificationMessage === ROOM_REQUIREMENTS_ERROR && (
          <Notification data-test="error-notification" priority={2} variant="error" ariaLive="polite" show>
            {dictionary['generic.error']}
          </Notification>
        )}
        <Typography component="h4" className="pi-color-greyscale-darkest">
          {dictionary['roomrequirements.title.edit']}
        </Typography>

        <Formik
          data-test="room-requirements-form-wrapper"
          onSubmit={this.handleSubmit}
          initialValues={{
            adults,
            children,
            cotRequired,
            type,
          }}
          render={formikProps => (
            <RoomRequirementsForm
              {...formikProps}
              dictionary={dictionary}
              setEditView={setEditView}
              profile={profile}
              roomRequirements={roomRequirementsConfig}
            />
          )}
        />
      </BaseStyle>
    );
  }
}

RoomRequirementsFormContainer.propTypes = {
  app: object.isRequired,
  profile: object.isRequired,
  dictionary: object.isRequired,
  setEditView: func.isRequired,
  setNotificationMessage: func.isRequired,
  updateProfileStore: func.isRequired,
  updateProfile: func.isRequired,
};
