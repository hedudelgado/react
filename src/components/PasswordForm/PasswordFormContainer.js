import React, { PureComponent, createRef } from 'react';
import { func, object } from 'prop-types';
import { Formik } from 'formik';
import BaseStyle from '../../layout/BaseStyle';
import Typography from '../../layout/Typography';
import PasswordForm from './PasswordForm';
import Notification from '../../layout/Notification';
import { validateCurrentPassword, validateNewPassword, validateConfirmPassword } from '../../utils/validations';
import {
  DEFAULT_VIEW,
  PASSWORD_ERROR,
  PASSWORD_VIEW,
} from '../App/appActions';
import { apiErrorCodes } from '../../config.json';

const validatePasswordForm = (values) => {
  const errors = {};

  errors.currentPassword = validateCurrentPassword(values.currentPassword);
  errors.newPassword = validateNewPassword(values);
  errors.confirmPassword = validateConfirmPassword(values);

  Object.keys(errors).forEach((error) => {
    if (errors[error] === undefined) delete errors[error];
  });

  return errors;
};

export default class PasswordFormContainer extends PureComponent {
  constructor(props) {
    super(props);

    this.form = createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values, actions) {
    const {
      profile,
      setNotificationMessage,
      setEditView,
      updateProfile,
    } = this.props;
    const {
      newPassword,
      currentPassword: password,
    } = values;
    const profileRequest = { ...profile, password, newPassword };

    updateProfile(profileRequest).then(() => {
      setNotificationMessage(PASSWORD_VIEW);
      setEditView(DEFAULT_VIEW);
      actions.setSubmitting(false);
    }).catch(({ code }) => {
      const { INCORRECT_PASSWORD } = apiErrorCodes;
      if (code === INCORRECT_PASSWORD) {
        actions.setFieldError('currentPassword', 'password.error.incorrect');
      } else {
        setNotificationMessage(PASSWORD_ERROR);
      }
    });
  }

  render() {
    const {
      setEditView,
      dictionary,
      app: { notificationMessage },
    } = this.props;

    return (
      <BaseStyle component="section" className="component-container">
        {notificationMessage === PASSWORD_ERROR && (
          <Notification data-test="error-notification" priority={2} variant="error" ariaLive="polite" show>
            {dictionary['generic.error']}
          </Notification>
        )}
        <Typography component="h4" className="pi-color-greyscale-darkest">
          {dictionary['password.changepassword.title']}
        </Typography>

        <Formik
          data-test="password-form-wrapper"
          ref={this.form}
          initialValues={{ currentPassword: '', newPassword: '', confirmPassword: '' }}
          validate={validatePasswordForm}
          onSubmit={this.handleSubmit}
          render={formikProps => (
            <PasswordForm
              {...formikProps}
              data-test="password-form"
              dictionary={dictionary}
              setEditView={setEditView}
            />
          )}
        />
      </BaseStyle>
    );
  }
}

PasswordFormContainer.propTypes = {
  dictionary: object.isRequired,
  setEditView: func.isRequired,
  profile: object.isRequired,
  app: object.isRequired,
  setNotificationMessage: func.isRequired,
  updateProfile: func.isRequired,
};
