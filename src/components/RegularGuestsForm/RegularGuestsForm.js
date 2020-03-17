import React from 'react';
import {
  object,
  func,
  array,
  bool,
} from 'prop-types';
import Select from '../../layout/Select';
import Input from '../../layout/Input';
import Button from '../../layout/Button';
import { selectedFlagImage } from '../../utils/selectedFlagImage';
import { countryOptions } from '../../utils/countryOptions';
import { dialingCodeOptions } from '../../utils/dialingCodeOptions';
import { DEFAULT_VIEW } from '../App/appActions';


const RegularGuestsForm = ({
  dictionary,
  countries,
  values: {
    title,
    firstName,
    lastName,
    nationality,
    email,
    dialingCountryCode,
    mobile,
  },
  touched,
  errors,
  handleBlur,
  handleSubmit,
  handleChange,
  setEditView,
  passportRequired,
  isPassportRequired,
  disableSelectDefaults,
}) => {
  const guestTitleOptions = dictionary['profile.form.guesttitle.list']
    .split(',')
    .map(guestTitle => (
      <option key={guestTitle} value={guestTitle}>{guestTitle}</option>
    ));

  return (
    <form
      data-test="regular-guests-form"
      name="regular-guests-form"
      onSubmit={handleSubmit}
    >
      <Select
        onChange={handleChange}
        onBlur={handleBlur}
        value={title}
        name="title"
        id="title"
        placeholder={dictionary['guests.form.title']}
        touched={touched.title}
        sessioncamhide
      >
        <option key="guestTitle" value="" defaultValue disabled={disableSelectDefaults.title}>
          {dictionary['guests.placeholder.title']}
        </option>
        {guestTitleOptions}
      </Select>
      <Input
        onChange={handleChange}
        onBlur={handleBlur}
        value={firstName}
        name="firstName"
        id="firstName"
        type="text"
        placeholder={dictionary['guests.form.firstname']}
        error={dictionary[errors.firstName]}
        touched={touched.firstName}
      />
      <Input
        onChange={handleChange}
        onBlur={handleBlur}
        value={lastName}
        name="lastName"
        id="lastName"
        type="text"
        placeholder={dictionary['guests.form.lastname']}
        error={dictionary[errors.lastName]}
        touched={touched.lastName}
      />
      <Input
        onChange={handleChange}
        onBlur={handleBlur}
        value={email}
        type="text"
        name="email"
        id="email"
        placeholder={dictionary['guests.form.email']}
        error={dictionary[errors.email]}
        touched={touched.email}
      />
      <Select
        onChange={(e) => { isPassportRequired(e); handleChange(e); }}
        onBlur={handleBlur}
        name="nationality"
        id="nationality"
        value={nationality}
        touched={touched.nationality}
        flagImg={selectedFlagImage(nationality, countries)}
        sessioncamhide
      >
        {countryOptions(countries)}
      </Select>
      { passportRequired && (
      <Input
        onChange={handleChange}
        onBlur={handleBlur}
        name="passportNumber"
        type="text"
        id="passportNumber"
        placeholder={dictionary['guests.form.passportnumber']}
        touched={touched.passportNumber}
        error={dictionary[errors.passportNumber]}
      />
      )}
      <Select
        onChange={handleChange}
        onBlur={handleBlur}
        value={dialingCountryCode}
        name="dialingCountryCode"
        id="dialingCountryCode"
        flagImg={selectedFlagImage(dialingCountryCode, countries)}
        touched={touched.dialingCountryCode}
        sessioncamhide
      >
        {dialingCodeOptions(dialingCountryCode, countries)}
      </Select>
      <Input
        onChange={handleChange}
        onBlur={handleBlur}
        value={mobile}
        name="mobile"
        id="mobile"
        type="text"
        placeholder={dictionary['guests.form.telephone']}
        error={dictionary[errors.mobile]}
        touched={touched.mobile}
      />
      <Button
        className="mb1"
        id="save-changed"
        color="primary"
        type="submit"
        fullWidth
      >
        {dictionary['guests.button.save']}
      </Button>
      <Button
        data-test="cancel-add-guest"
        color="default"
        variant="text"
        className="underline block mb1"
        fullWidth
        onClick={() => setEditView(DEFAULT_VIEW)}
      >
        {dictionary['guests.button.cancel']}
      </Button>
    </form>
  );
};

RegularGuestsForm.propTypes = {
  dictionary: object.isRequired,
  values: object.isRequired,
  touched: object.isRequired,
  errors: object.isRequired,
  disableSelectDefaults: object.isRequired,
  countries: array.isRequired,
  handleBlur: func.isRequired,
  handleSubmit: func.isRequired,
  handleChange: func.isRequired,
  setEditView: func.isRequired,
  isPassportRequired: func.isRequired,
  passportRequired: bool,
};

export default RegularGuestsForm;
