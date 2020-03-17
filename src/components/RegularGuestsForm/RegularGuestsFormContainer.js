import React, { Component, Fragment, createRef } from 'react';
import {
  object,
  array,
  func,
  string,
  number,
} from 'prop-types';
import { Formik } from 'formik';
import Typography from '../../layout/Typography';
import BaseStyle from '../../layout/BaseStyle';
import Notification from '../../layout/Notification';
import { matchCountry } from '../../utils/matchCountry';
import { matchDialingCode } from '../../utils/matchDialingCode';
import RegularGuestsForm from './RegularGuestsForm';
import {
  REGULAR_GUESTS_VIEW,
  DEFAULT_VIEW,
  REGULAR_GUESTS_ERROR,
} from '../App/appActions';
import {
  validateTitle,
  validateFirstName,
  validateLastName,
  validateEmail,
  validatePassportNumber,
  validatePhoneNumber,

} from '../../utils/validations';
import { defaultCountry } from '../../config.json';

class RegularGuestsFormContainer extends Component {
  constructor(props) {
    super(props);

    this.form = createRef();

    const {
      mobile = '',
      nationality = defaultCountry,
      countries,
    } = this.props;

    const matchedDialingCountry = matchDialingCode(mobile, countries, nationality);

    this.state = {
      disableSelectDefaults: {
        title: false,
      },
      passportRequired: countries.find(matchCountry(nationality)).passportRequired,
      mobile,
      dialingCountryCode: matchedDialingCountry.countryCode,
    };

    if (mobile.startsWith((matchedDialingCountry.dialingCode))) {
      this.state.mobile = mobile.replace(matchedDialingCountry.dialingCode, '');
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateTitleWrapper = this.validateTitleWrapper.bind(this);
    this.validateEmailWrapper = this.validateEmailWrapper.bind(this);
    this.isPassportRequired = this.isPassportRequired.bind(this);
    this.validateRegularGuestsForm = this.validateRegularGuestsForm.bind(this);
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
        setNotificationMessage(REGULAR_GUESTS_VIEW);
        actions.setSubmitting(false);
        updateProfileStore(payload);
        setEditView(DEFAULT_VIEW);
      }).catch(() => {
        setNotificationMessage(REGULAR_GUESTS_ERROR);
      });
  }

  createPayload({
    title,
    firstName,
    lastName,
    email,
    passportNumber,
    nationality,
    dialingCountryCode,
    mobile: mobileNumber,
  }) {
    const {
      profile,
      countries,
      index,
      email: existingEmail,
    } = this.props;

    const { additionalGuests = [] } = profile;

    const { dialingCode } = countries.find(country => (
      dialingCountryCode === country.countryCode));

    const mobile = `${dialingCode}${mobileNumber}`;

    const guestDetails = {
      title,
      firstName,
      lastName,
      email,
      passportNumber,
      nationality,
      mobile,
    };

    if (existingEmail) additionalGuests.splice(index, 1, guestDetails);
    else additionalGuests.push(guestDetails);

    return {
      ...profile,
      additionalGuests,
    };
  }

  isPassportRequired(e) {
    const { value } = e.target;
    const { countries } = this.props;

    this.setState({
      passportRequired: countries.find(matchCountry(value)).passportRequired,
    });
  }

  validateEmailWrapper(email) {
    const { profile: { additionalGuests = [] } } = this.props;
    const guestsEmails = additionalGuests.map(guest => guest.email);
    const emailChanged = this.form.current.initialValues.email !== email;
    return validateEmail(email, guestsEmails, emailChanged);
  }

  validateTitleWrapper(title) {
    const { disableSelectDefaults } = this.state;
    const result = validateTitle(title);

    this.setState({
      disableSelectDefaults: {
        ...disableSelectDefaults,
        title: !!title,
      },
    });

    return result;
  }

  validateRegularGuestsForm({
    title,
    firstName,
    lastName,
    email,
    passportNumber,
    mobile,
  }) {
    const errors = {};

    const { passportRequired } = this.state;

    errors.title = this.validateTitleWrapper(title);
    errors.firstName = validateFirstName(firstName);
    errors.lastName = validateLastName(lastName);
    errors.email = this.validateEmailWrapper(email);
    errors.mobile = validatePhoneNumber(mobile, 'profile.error.telephone');

    if (passportRequired) {
      errors.passportNumber = validatePassportNumber(passportNumber);
    }

    Object.keys(errors).forEach((error) => {
      if (errors[error] === undefined) delete errors[error];
    });

    return errors;
  }

  render() {
    const {
      app: {
        editViewName,
      },
      dictionary,
      countries,
      title = '',
      firstName = '',
      lastName = '',
      email = '',
      nationality = defaultCountry,
      passportNumber = '',
      index,
      setEditView,
    } = this.props;

    const {
      mobile,
      dialingCountryCode,
      passportRequired,
      disableSelectDefaults,
    } = this.state;


    return (
      <Fragment>
        <BaseStyle component="div">
          {editViewName === `REGULAR_GUESTS_VIEW_${index}` && (
            <Typography component="h4" className="pi-color-greyscale-darkest">
              {dictionary['guests.form.title.edit']}
            </Typography>
          )}
          { editViewName === 'ADD_GUEST_VIEW' && (
            <Typography component="h4" className="pi-color-greyscale-darkest">
              {dictionary['guests.form.title.add']}
            </Typography>
          )}
          <Notification priority={3} variant="info" ariaLive="off" show className="mb2">
            {dictionary['guests.notification']}
          </Notification>
        </BaseStyle>
        <Formik
          data-test="regular-guests-form-wrapper"
          onSubmit={this.handleSubmit}
          ref={this.form}
          initialValues={{
            title,
            firstName,
            lastName,
            email,
            nationality,
            passportNumber,
            dialingCountryCode,
            mobile,
          }}
          validate={this.validateRegularGuestsForm}
          render={formikProps => (
            <RegularGuestsForm
              {...formikProps}
              dictionary={dictionary}
              countries={countries}
              setEditView={setEditView}
              passportRequired={passportRequired}
              isPassportRequired={this.isPassportRequired}
              disableSelectDefaults={disableSelectDefaults}
            />
          )}
        />
      </Fragment>
    );
  }
}

RegularGuestsFormContainer.propTypes = {
  app: object.isRequired,
  profile: object.isRequired,
  dictionary: object.isRequired,
  countries: array.isRequired,
  updateProfileStore: func.isRequired,
  setNotificationMessage: func.isRequired,
  title: string,
  firstName: string,
  lastName: string,
  email: string,
  nationality: string,
  passportNumber: string,
  mobile: string,
  index: number,
  setEditView: func,
  updateProfile: func.isRequired,
};

export default RegularGuestsFormContainer;
