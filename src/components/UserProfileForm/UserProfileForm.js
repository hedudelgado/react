import React from 'react';
import {
  func,
  object,
  array,
} from 'prop-types';
import Select from '../../layout/Select';
import Button from '../../layout/Button';
import Input from '../../layout/Input';
import { DEFAULT_VIEW } from '../App/appActions';
import { selectedFlagImage } from '../../utils/selectedFlagImage';
import AddressForm from '../AddressForm';

const UserProfileForm = ({
  profile,
  countries,
  dictionary,
  setEditView,
  handleBlur,
  handleChange,
  handleSubmit,
  touched,
  values,
  errors,
  setFieldValue,
}) => {
  const {
    title,
    firstName,
    lastName,
    email,
    dialingCountryCode,
    mobile,
    telephone,
  } = values;

  const guestTitleOptions = dictionary['profile.form.guesttitle.list']
    .split(',')
    .map(guestTitle => (
      <option key={guestTitle} value={guestTitle}>{guestTitle}</option>
    ));

  const countryOptions = code => countries.map((country) => {
    const label = code === country.countryCode ? country.dialingCode : `${country.countryLegend} (${country.dialingCode})`;
    return (
      <option
        label={label}
        value={country.countryCode}
        key={country.countryCode}
      >
        {label}
      </option>
    );
  });

  return (
    <form
      data-test="user-profile-form"
      name="user-profile-form"
      onSubmit={handleSubmit}
    >
      <Select
        onBlur={handleBlur}
        onChange={handleChange}
        value={title}
        name="title"
        id="title"
        placeholder={dictionary['profile.form.guesttitle']}
        touched={touched.title}
      >
        {guestTitleOptions}
      </Select>
      <Input
        onBlur={handleBlur}
        onChange={handleChange}
        value={firstName}
        type="text"
        name="firstName"
        id="firstName"
        placeholder={dictionary['profile.form.firstname']}
        error={dictionary[errors.firstName]}
        touched={touched.firstName}
      />
      <Input
        onBlur={handleBlur}
        onChange={handleChange}
        value={lastName}
        type="text"
        name="lastName"
        id="lastName"
        placeholder={dictionary['profile.form.lastname']}
        error={dictionary[errors.lastName]}
        touched={touched.lastName}
      />
      <Input
        value={email}
        type="text"
        name="email"
        id="email"
        placeholder={dictionary['profile.form.email']}
        disabled="disabled"
      />
      <Select
        onBlur={handleBlur}
        onChange={handleChange}
        name="dialingCountryCode"
        id="dialingCountryCode"
        value={dialingCountryCode}
        placeholder={dictionary['profile.form.dialingcode']}
        flagImg={selectedFlagImage(dialingCountryCode, countries)}
        touched={touched.dialingCountryCode}
      >
        {countryOptions(dialingCountryCode)}
      </Select>
      <Input
        onBlur={handleBlur}
        onChange={handleChange}
        value={mobile}
        type="text"
        name="mobile"
        id="mobile"
        placeholder={dictionary['profile.form.mobile']}
        error={dictionary[errors.mobile]}
        touched={touched.mobile}
      />
      <Input
        onBlur={handleBlur}
        onChange={handleChange}
        value={telephone}
        type="text"
        name="telephone"
        id="telephone"
        placeholder={dictionary['profile.form.telephone']}
        error={dictionary[errors.telephone]}
        touched={touched.telephone}
      />
      <AddressForm
        profile={profile}
        dictionary={dictionary}
        countries={countries}
        values={values}
        setFieldValue={setFieldValue}
        errors={errors}
        touched={touched}
        handleBlur={handleBlur}
        handleChange={handleChange}
      />
      <Button
        data-test="save-changes"
        className="wb-push--bottom"
        color="primary"
        type="submit"
      >
        {dictionary['profile.button.save']}
      </Button>
      <Button
        data-test="closeForm"
        color="default"
        variant="text"
        className="underline block"
        fullWidth
        onClick={() => setEditView(DEFAULT_VIEW)}
      >
        {dictionary['profile.button.cancel']}
      </Button>
    </form>
  );
};

UserProfileForm.propTypes = {
  profile: object.isRequired,
  countries: array.isRequired,
  dictionary: object.isRequired,
  setEditView: func.isRequired,
  handleBlur: func.isRequired,
  handleChange: func.isRequired,
  handleSubmit: func.isRequired,
  touched: object.isRequired,
  values: object.isRequired,
  errors: object.isRequired,
  setFieldValue: func.isRequired,
};

export default UserProfileForm;
