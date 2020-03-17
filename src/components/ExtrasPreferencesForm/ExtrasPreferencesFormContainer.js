import React, { PureComponent } from 'react';
import { func, object } from 'prop-types';
import { Formik } from 'formik';
import BaseStyle from '../../layout/BaseStyle';
import Typography from '../../layout/Typography';
import ExtrasPreferencesForm from './ExtrasPreferencesForm';
import {
  DEFAULT_VIEW,
  EXTRAS_PREFERENCES_ERROR,
  EXTRAS_PREFERENCES_VIEW,
} from '../App/appActions';
import Notification from '../../layout/Notification';

export default class ExtrasPreferencesFormContainer extends PureComponent {
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
        setNotificationMessage(EXTRAS_PREFERENCES_VIEW);
        setEditView(DEFAULT_VIEW);
        actions.setSubmitting(false);
        updateProfileStore(payload);
      }).catch(() => {
        setNotificationMessage(EXTRAS_PREFERENCES_ERROR);
      });
  }

  createPayload(values) {
    const { profile } = this.props;
    const payload = {
      ...profile,
      bookingPreference: {
        ...profile.bookingPreference,
        foodPreference: +values.mealOptions,
        preselectWifi: values.wifiOptions === 'true',
      },
      paymentPreference: {
        ...profile.paymentPreference,
        electronicInvoiceRequired: values.invoiceOptions === 'true',
      },
    };

    return payload;
  }

  render() {
    const {
      app: { notificationMessage },
      dictionary,
      setEditView,
      profile,
    } = this.props;

    const {
      bookingPreference: {
        foodPreference = 0,
        preselectWifi = false,
      } = {},
      paymentPreference: {
        electronicInvoiceRequired = false,
      } = {},
    } = profile;

    return (
      <BaseStyle component="div" className="component-container">
        {notificationMessage === EXTRAS_PREFERENCES_ERROR && (
          <Notification data-test="error-notification" priority={2} variant="error" ariaLive="polite" show>
            {dictionary['generic.error']}
          </Notification>
        )}
        <Typography component="h4" className="pi-color-greyscale-darkest">
          {dictionary['extraspreferences.edit.title']}
        </Typography>
        <Typography component="p" mb="3">
          {dictionary['extraspreferences.edit.description']}
        </Typography>

        <Formik
          data-test="extras-preferences-form-wrapper"
          onSubmit={this.handleSubmit}
          initialValues={{
            mealOptions: `${foodPreference}`,
            wifiOptions: `${preselectWifi}`,
            invoiceOptions: `${electronicInvoiceRequired}`,
          }}
          render={formikProps => (
            <ExtrasPreferencesForm
              {...formikProps}
              dictionary={dictionary}
              setEditView={setEditView}
              profile={profile}
            />
          )
          }
        />
      </BaseStyle>
    );
  }
}

ExtrasPreferencesFormContainer.propTypes = {
  app: object.isRequired,
  profile: object.isRequired,
  dictionary: object.isRequired,
  setEditView: func.isRequired,
  setNotificationMessage: func.isRequired,
  updateProfileStore: func.isRequired,
  updateProfile: func.isRequired,
};
