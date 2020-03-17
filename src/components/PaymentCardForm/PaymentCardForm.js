import React from 'react';
import {
  array,
  bool,
  string,
  object,
  func,
} from 'prop-types';
import Typography from '../../layout/Typography';
import BaseStyle from '../../layout/BaseStyle';
import Button from '../../layout/Button';
import Input from '../../layout/Input';
import Select from '../../layout/Select';
import RadioGroup, { RadioItem } from '../../layout/RadioGroup';
import Checkbox from '../../layout/Checkbox';
import CardNumberInput from '../../layout/CardNumberInput';
import AddressForm from '../AddressForm';

const PaymentCardForm = ({
  dictionary,
  countries,
  paymentCards,
  handleCardNumberBlur,
  handleSubmit,
  setFieldTouched,
  setFieldError,
  setFieldValue,
  handleBlur,
  handleChange,
  cancel,
  errors,
  touched,
  values,
  cardType,
  domain,
  postCode,
  disableSelectDefaults,
  showExpiryDateError,
}) => {
  const months = process.env.REACT_APP_MONTHS
    .split(',')
    .map(month => <option key={month} value={parseInt(month, 10)}>{month}</option>);

  const currentYear = new Date().getFullYear();

  const years = [...Array(parseInt(process.env.REACT_APP_NUM_YEARS, 10))]
    .map((item, index) => {
      const year = index + currentYear;
      return (<option key={year} value={year}>{year}</option>);
    });

  const { usePersonalAddress, prePayment } = values;
  return (
    <form
      data-test="payment-card-form"
      name="payment-card-form"
      onSubmit={handleSubmit}
    >
      <Input
        onBlur={handleBlur}
        onChange={handleChange}
        type="text"
        placeholder={dictionary['payment.add.name']}
        id="cardHolderName"
        name="cardHolderName"
        mb="mb2"
        error={dictionary[errors.cardHolderName]}
        touched={touched.cardHolderName}
      />
      <CardNumberInput
        onChange={handleChange}
        type="tel"
        name="cardNumber"
        placeholder={dictionary['payment.add.number']}
        error={dictionary[errors.cardNumber]}
        touched={touched.cardNumber}
        card={paymentCards[cardType] && {
          src: domain + paymentCards[cardType].img,
          alt: paymentCards[cardType].name,
        }}
        onBlur={() => handleCardNumberBlur(
          values.cardNumber,
          setFieldTouched,
          setFieldError,
        )}
        sessioncamhide
      />
      <Typography size="s" weight="bold" className="pi-color-greyscale-darkest mb0 mt2 wb-push-half--bottom">
        {dictionary['payment.add.date']}
      </Typography>
      <BaseStyle className="clearfix wb-push-middle--bottom" component="div">
        <BaseStyle className="clearfix" component="div">
          <Select
            onBlur={handleBlur}
            onChange={handleChange}
            name="expiryMonth"
            id="expiryMonth"
            touched={touched.expiryYear && touched.expiryMonth}
            error={dictionary[errors.expiryMonth]}
            sessioncamhide
            halfWidth
            hideIcon
            hideMessage
          >
            <option key="month" value="" defaultValue disabled={disableSelectDefaults.month}>
              {dictionary['payment.placeholder.month']}
            </option>
            {months}
          </Select>
          <Select
            onBlur={handleBlur}
            onChange={handleChange}
            name="expiryYear"
            id="expiryYear"
            touched={touched.expiryYear && touched.expiryMonth}
            error={dictionary[errors.expiryYear]}
            sessioncamhide
            halfWidth
            hideMessage
          >
            <option key="year" value="" disabled={disableSelectDefaults.year}>
              {dictionary['payment.placeholder.year']}
            </option>
            {years}
          </Select>
        </BaseStyle>
        {showExpiryDateError && touched.expiryYear && touched.expiryMonth && (
          <Typography
            data-test="expiry-date-error"
            component="span"
            className="form-item-msg form-item-msg--error"
          >
            {dictionary[errors.expiryYear]}
          </Typography>
        )}
      </BaseStyle>
      <RadioGroup>
        <RadioItem
          field={{
            name: 'usePersonalAddress',
            value: usePersonalAddress,
            onBlur: handleBlur,
            onChange: handleChange,
          }}
          label={dictionary['payment.add.address.same']}
          name="usePersonalAddress"
          id="usePersonalAddress"
          value="true"
          subLabels={[postCode]}
          sessioncamhide
        />
        <RadioItem
          field={{
            name: 'usePersonalAddress',
            value: usePersonalAddress,
            onBlur: handleBlur,
            onChange: handleChange,
          }}
          label={dictionary['payment.add.address.different']}
          name="usePersonalAddress"
          id="useBillingAddress"
          value="false"
          sessioncamhide
        />
      </RadioGroup>
      {usePersonalAddress === 'false' && (
        <AddressForm
          dictionary={dictionary}
          countries={countries}
          values={values}
          setFieldValue={setFieldValue}
          errors={errors}
          touched={touched}
          handleBlur={handleBlur}
          handleChange={handleChange}
        />
      )}
      <Checkbox
        field={{
          name: 'prePayment',
          value: prePayment,
          onBlur: handleBlur,
          onChange: handleChange,
        }}
        name="prePayment"
        id="prePayment"
        label={dictionary['payment.add.prepay']}
        sessioncamhide
      />
      <Button
        className="wb-push--bottom"
        id="save-card"
        color="primary"
        type="submit"
      >
        {dictionary['payment.add.save']}
      </Button>
      <Button
        data-test="closeForm"
        variant="text"
        color="default"
        className="wb-text-btn--underline block wb-push--bottom"
        onClick={cancel}
      >
        {dictionary['payment.add.cancel']}
      </Button>
    </form>
  );
};

PaymentCardForm.propTypes = {
  dictionary: object.isRequired,
  countries: array.isRequired,
  errors: object.isRequired,
  touched: object.isRequired,
  values: object.isRequired,
  disableSelectDefaults: object.isRequired,
  paymentCards: object.isRequired,
  handleCardNumberBlur: func.isRequired,
  handleSubmit: func.isRequired,
  setFieldTouched: func.isRequired,
  setFieldError: func.isRequired,
  setFieldValue: func.isRequired,
  handleBlur: func.isRequired,
  cancel: func.isRequired,
  handleChange: func.isRequired,
  cardType: string.isRequired,
  domain: string.isRequired,
  postCode: string.isRequired,
  showExpiryDateError: bool.isRequired,
};

export default PaymentCardForm;
