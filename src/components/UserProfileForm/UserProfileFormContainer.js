import React, { Component } from 'react';
import {
  object,
  func,
  array,
} from 'prop-types';
import { Formik } from 'formik';
import BaseStyle from '../../layout/BaseStyle';
import Typography from '../../layout/Typography';
import Notification from '../../layout/Notification';
import UserProfileForm from './UserProfileForm';
import {
  validateFirstName,
  validateLastName,
  validatePhoneNumber,
  validatePostCode,
  validateCompanyName,
  validateAddressLine,
} from '../../utils/validations';
import { matchDialingCode } from '../../utils/matchDialingCode';
import { DEFAULT_VIEW, USER_DETAILS_VIEW, USER_DETAILS_ERROR } from '../App/appActions';
import { BUSINESS } from '../../config.json';

const validateUserProfileForm = ({
  firstName,
  lastName,
  mobile,
  telephone,
  line1,
  line2,
  line3,
  line4,
  postCode,
  countryCode,
  companyName,
  type,
}) => {
  const errors = {};

  errors.firstName = validateFirstName(firstName);
  errors.lastName = validateLastName(lastName);
  errors.postCode = validatePostCode(postCode, countryCode);
  errors.line1 = validateAddressLine(line1, true);
  errors.line2 = validateAddressLine(line2, false);
  errors.line3 = validateAddressLine(line3, false);
  errors.line4 = validateAddressLine(line4, false);

  if (!mobile && !telephone) {
    errors.mobile = 'profile.error.missingPhoneNumber';
    errors.telephone = 'profile.error.missingPhoneNumber';
  } else if (mobile && !telephone) {
    errors.mobile = validatePhoneNumber(mobile, 'profile.error.mobile');
  } else if (!mobile && telephone) {
    errors.telephone = validatePhoneNumber(telephone, 'profile.error.telephone');
  } else {
    errors.telephone = validatePhoneNumber(telephone, 'profile.error.telephone');
    errors.mobile = validatePhoneNumber(mobile, 'profile.error.mobile');
  }

  if (type === 'BUSINESS') {
    errors.companyName = validateCompanyName(companyName);
  }

  Object.keys(errors).forEach((error) => {
    if (errors[error] === undefined) delete errors[error];
  });

  return errors;
};

const processPhoneNumbers = (countries, profile) => {
  const {
    contactDetail: {
      telephone,
      mobile,
      address: { countryCode },
    },
  } = profile;

  let dialingCountryCode = '';

  let mobileProcessed = '';
  if (mobile) {
    const matchedDialingCountry = matchDialingCode(mobile, countries, countryCode);

    mobileProcessed = mobile;
    dialingCountryCode = matchedDialingCountry.countryCode;

    if (mobile.startsWith((matchedDialingCountry.dialingCode))) {
      mobileProcessed = mobile.replace(matchedDialingCountry.dialingCode, '');
    }
  }

  let telephoneProcessed = '';
  if (telephone) {
    const matchedDialingCountry = matchDialingCode(telephone, countries, countryCode);

    telephoneProcessed = telephone;
    dialingCountryCode = matchedDialingCountry.countryCode;

    if (telephone.startsWith((matchedDialingCountry.dialingCode))) {
      telephoneProcessed = telephone.replace(matchedDialingCountry.dialingCode, '');
    }
  }

  return {
    dialingCountryCode,
    mobile: mobileProcessed,
    telephone: telephoneProcessed,
  };
};

export default class UserProfileFormContainer extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);

    const { profile, countries } = props;

    const { mobile, telephone, dialingCountryCode } = processPhoneNumbers(countries, profile);

    this.mobile = mobile;
    this.telephone = telephone;
    this.dialingCountryCode = dialingCountryCode;
  }

  handleSubmit(values, actions) {
    const {
      setEditView, setNotificationMessage, updateProfileStore, updateProfile,
    } = this.props;
    const payload = this.createPayload(values);

    updateProfile(payload)
      .then(() => {
        setEditView(DEFAULT_VIEW);
        setNotificationMessage(USER_DETAILS_VIEW);
        actions.setSubmitting(false);
        updateProfileStore(payload);
      })
      .catch(() => {
        setNotificationMessage(USER_DETAILS_ERROR);
      });
  }

  createPayload(values) {
    const {
      title,
      firstName,
      lastName,
      dialingCountryCode,
      line1,
      line2,
      line3,
      line4,
      type,
      postCode,
      countryCode,
      companyName,
    } = values;

    const {
      profile,
      countries,
    } = this.props;

    const { dialingCode } = countries.find(country => (
      dialingCountryCode === country.countryCode));

    let mobile = '';
    if (values.mobile) {
      mobile = `${dialingCode}${values.mobile}`;
    }

    let telephone = '';
    if (values.telephone) {
      telephone = `${dialingCode}${values.telephone}`;
    }

    return {
      ...profile,
      contactDetail: {
        ...profile.contactDetail,
        title,
        firstName,
        lastName,
        mobile,
        telephone,
        address: {
          ...profile.contactDetail.address,
          line1,
          line2,
          line3,
          line4,
          postCode,
          countryCode,
          type,
          companyName: type === BUSINESS ? companyName : null,
        },
      },
    };
  }

  render() {
    const {
      dictionary,
      profile,
      setEditView,
      countries,
      app: { notificationMessage },
    } = this.props;

    const {
      title,
      firstName,
      lastName,
      email,
      address: {
        line1,
        line2,
        line3,
        line4,
        postCode,
        countryCode,
        type,
        companyName,
      },
    } = profile.contactDetail;


    const { mobile, telephone, dialingCountryCode } = this;

    return (
      <BaseStyle component="section" className="component-container">
        {notificationMessage === USER_DETAILS_ERROR && (
          <Notification data-test="error-notification" priority={2} variant="error" ariaLive="polite" show>
            {dictionary['generic.error']}
          </Notification>
        )}
        <Typography component="h4" className="pi-color-greyscale-darkest">
          {dictionary['profile.edit.title']}
        </Typography>
        <Typography component="h5" className="regular">
          {email}
        </Typography>

        <Formik
          data-test="user-profile-form-wrapper"
          onSubmit={this.handleSubmit}
          initialValues={{
            title,
            firstName,
            lastName,
            email,
            dialingCountryCode,
            mobile,
            telephone,
            countryCode,
            line1,
            line2,
            line3,
            line4,
            postCode,
            type,
            companyName,
            businessAddress: `${(type === BUSINESS)}`,
          }}
          validate={validateUserProfileForm}
          render={formikProps => (
            <UserProfileForm
              {...formikProps}
              dictionary={dictionary}
              setEditView={setEditView}
              profile={profile}
              countries={countries}
            />
          )}
        />
      </BaseStyle>
    );
  }
}

UserProfileFormContainer.propTypes = {
  setNotificationMessage: func.isRequired,
  app: object.isRequired,
  updateProfileStore: func.isRequired,
  dictionary: object.isRequired,
  profile: object.isRequired,
  countries: array.isRequired,
  setEditView: func.isRequired,
  updateProfile: func.isRequired,
};
