import React from 'react';
import { object, func } from 'prop-types';
import Input from '../../layout/Input';
import Button from '../../layout/Button';
import { DEFAULT_VIEW } from '../App/appActions';

const PasswordForm = ({
  dictionary,
  errors,
  touched,
  handleSubmit,
  setEditView,
  handleChange,
  handleBlur,
}) => (
  <form
    name="password-form"
    onSubmit={handleSubmit}
  >
    <Input
      onBlur={handleBlur}
      onChange={handleChange}
      type="password"
      name="currentPassword"
      id="currentPassword"
      placeholder={dictionary['password.currentpassword']}
      error={dictionary[errors.currentPassword]}
      touched={touched.currentPassword}
    />
    <Input
      onBlur={handleBlur}
      onChange={handleChange}
      type="password"
      name="newPassword"
      id="newPassword"
      placeholder={dictionary['password.newpassword']}
      error={dictionary[errors.newPassword]}
      touched={touched.newPassword}
    />
    <Input
      onBlur={handleBlur}
      onChange={handleChange}
      type="password"
      name="confirmPassword"
      id="confirmPassword"
      placeholder={dictionary['password.confirmpassword']}
      error={dictionary[errors.confirmPassword]}
      touched={touched.confirmPassword}
    />
    <ul>
      <li>{dictionary['password.requirements.min']}</li>
      <li>{dictionary['password.requirements.number']}</li>
      <li>{dictionary['password.requirements.capital']}</li>
      <li>{dictionary['password.requirements.special']}</li>
    </ul>
    <Button
      className="wb-push--bottom wb-btn--full-width"
      id="save-changed"
      color="primary"
      type="submit"
    >
      {dictionary['password.button.update']}
    </Button>
    <Button
      data-test="closeForm"
      color="default"
      variant="text"
      className="underline block"
      fullWidth
      onClick={() => setEditView(DEFAULT_VIEW)}
    >
      {dictionary['password.button.cancel']}
    </Button>
  </form>
);

PasswordForm.propTypes = {
  dictionary: object.isRequired,
  errors: object.isRequired,
  touched: object.isRequired,
  handleSubmit: func.isRequired,
  setEditView: func.isRequired,
  handleChange: func.isRequired,
  handleBlur: func.isRequired,
};

export default PasswordForm;
