import React, { PureComponent } from 'react';
import { array, func, object } from 'prop-types';
import { Formik } from 'formik';
import { validateBin } from '../../utils/api';
import { DEFAULT_VIEW, PAYMENT_CARD_ERROR, PAYMENT_CARD_VIEW } from '../App/appActions';
import Typography from '../../layout/Typography';
import { getJsonItem } from '../../utils/session-storage';
import BaseStyle from '../../layout/BaseStyle';
import {
  validateCardNumber,
  validateExpiryDate,
  validateFullName,
  validateCompanyName,
  validateAddressLine,
  validatePostCode,
} from '../../utils/validations';
import Img from '../../layout/Img';
import Notification from '../../layout/Notification';
import PaymentCardForm from './PaymentCardForm';
import {
  BUSINESS,
  LEISURE,
  paymentCards,
} from '../../config.json';

const getDomain = () => getJsonItem('environment').domain;

const CardList = () => Object.keys(paymentCards)
  .map(card => (
    <Img
      key={paymentCards[card].name}
      src={getDomain() + paymentCards[card].img}
      label={paymentCards[card].name}
      className="mr1"
    />
  ));

export default class PaymentCardFormContainer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      cardType: '',
      showExpiryDateError: false,
      disableSelectDefaults: {
        month: false,
        year: false,
      },
    };

    this.cancel = this.cancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateExpiryDate = this.validateExpiryDate.bind(this);
    this.handleCardNumberBlur = this.handleCardNumberBlur.bind(this);
    this.validatePaymentCardForm = this.validatePaymentCardForm.bind(this);
  }

  handleSubmit(values, actions) {
    const {
      setNotificationMessage,
      setEditView,
      updateProfileStore,
      updateProfile,
    } = this.props;
    const payload = this.createPayload(values);

    updateProfile(payload)
      .then(() => {
        setNotificationMessage(PAYMENT_CARD_VIEW);
        setEditView(DEFAULT_VIEW);
        actions.setSubmitting(false);
        const { paymentPreference: { paymentCard: { cardNumber } } } = payload;
        payload.paymentPreference.paymentCard.cardNumber = `************${cardNumber.slice(cardNumber.length - 4)}`;
        updateProfileStore(payload);
      }).catch(() => {
        setNotificationMessage(PAYMENT_CARD_ERROR);
      });
  }

  createPayload(values) {
    const {
      cardNumber,
      cardHolderName,
      expiryMonth,
      expiryYear,
      prePayment,
      usePersonalAddress,
      line1,
      line2,
      line3,
      line4,
      type,
      postCode,
      countryCode,
      companyName,
    } = values;

    const { profile } = this.props;
    const { cardType } = this.state;

    const expiryDate = `${(expiryMonth < 10 ? '0' : '')}${expiryMonth}/${expiryYear % 2000}`;

    const payload = {
      ...profile,
      paymentPreference: {
        ...profile.paymentPreference,
        paymentCard: {
          cardNumber,
          cardHolderName,
          cardType,
          expiryDate,
        },
      },
      bookingPreference: {
        ...profile.bookingPreference,
        prepay: prePayment,
      },
    };

    if (usePersonalAddress === 'false') {
      payload.paymentPreference.paymentCard.billingAddress = {
        line1,
        line2,
        line3,
        line4,
        postCode,
        countryCode,
        type,
        companyName: type === BUSINESS ? companyName : null,
      };
    }
    return payload;
  }

  cancel() {
    const { setEditView, setNotificationMessage } = this.props;
    setEditView(DEFAULT_VIEW);
    setNotificationMessage(DEFAULT_VIEW);
  }

  handleCardNumberBlur(cardNumber, setFieldTouched, setFieldError) {
    const result = validateCardNumber(cardNumber);
    setFieldTouched('cardNumber', true, false);
    if (!result) {
      validateBin(cardNumber)
        .then(({ cardType }) => {
          this.setState({ cardType });
        });
    } else {
      setFieldError('cardNumber', result);
      this.setState({ cardType: '' });
    }
  }

  validateExpiryDate(year, month) {
    const { disableSelectDefaults } = this.state;
    const result = validateExpiryDate(year, month);

    this.setState({
      showExpiryDateError: !!result,
      disableSelectDefaults: {
        ...disableSelectDefaults,
        month: !!month,
        year: !!year,
      },
    });

    return result;
  }

  validatePaymentCardForm({
    cardNumber,
    cardHolderName,
    expiryMonth,
    expiryYear,
    line1,
    line2,
    line3,
    line4,
    postCode,
    countryCode,
    type,
    companyName,
    usePersonalAddress,
  }) {
    const errors = {};

    errors.cardHolderName = validateFullName(cardHolderName);
    errors.cardNumber = validateCardNumber(cardNumber);

    const errorExpiryDate = this.validateExpiryDate(expiryYear, expiryMonth);
    if (errorExpiryDate) {
      errors.expiryYear = errorExpiryDate;
      errors.expiryMonth = errorExpiryDate;
    }

    if (usePersonalAddress === 'false') {
      errors.postCode = validatePostCode(postCode, countryCode);

      if (type === 'BUSINESS') {
        errors.companyName = validateCompanyName(companyName);
      }

      errors.line1 = validateAddressLine(line1, true);
      errors.line2 = validateAddressLine(line2, false);
      errors.line3 = validateAddressLine(line3, false);
      errors.line4 = validateAddressLine(line4, false);
    }

    Object.keys(errors).forEach((error) => {
      if (errors[error] === undefined) delete errors[error];
    });

    return errors;
  }

  render() {
    const {
      dictionary,
      countries,
      profile: {
        contactDetail: {
          address: {
            postCode,
          },
        },
      },
      app: { notificationMessage },
    } = this.props;
    const {
      cardType,
      showExpiryDateError,
      disableSelectDefaults,
    } = this.state;

    return (
      <BaseStyle component="section" className="component-container">
        {notificationMessage === PAYMENT_CARD_ERROR && (
          <Notification data-test="error-notification" priority={2} variant="error" ariaLive="polite" show>
            {dictionary['generic.error']}
          </Notification>
        )}
        <Typography component="h4" className="pi-color-greyscale-darkest">
          {dictionary['payment.add.title']}
        </Typography>
        <BaseStyle data-test="payment-cards" component="div" className="mb2">
          <CardList paymentCards={paymentCards} domain={getDomain()} />
        </BaseStyle>
        <Formik
          data-test="payment-card-form-wrapper"
          onSubmit={this.handleSubmit}
          initialValues={{
            cardNumber: '',
            cardHolderName: '',
            expiryMonth: '',
            expiryYear: '',
            usePersonalAddress: 'true',
            prePayment: 'false',
            line1: '',
            line2: '',
            line3: '',
            line4: '',
            postCode: '',
            countryCode: 'GB',
            type: LEISURE,
            companyName: '',
          }}
          validate={this.validatePaymentCardForm}
          render={formikProps => (
            <PaymentCardForm
              {...formikProps}
              dictionary={dictionary}
              countries={countries}
              handleCardNumberBlur={this.handleCardNumberBlur}
              cancel={this.cancel}
              paymentCards={paymentCards}
              cardType={cardType}
              domain={getDomain()}
              postCode={postCode}
              showExpiryDateError={showExpiryDateError}
              disableSelectDefaults={disableSelectDefaults}
            />
          )}
        />
      </BaseStyle>
    );
  }
}

PaymentCardFormContainer.propTypes = {
  app: object.isRequired,
  dictionary: object.isRequired,
  setEditView: func.isRequired,
  profile: object.isRequired,
  setNotificationMessage: func.isRequired,
  updateProfileStore: func.isRequired,
  countries: array.isRequired,
  updateProfile: func.isRequired,
};
