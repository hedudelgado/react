import React from 'react';
import {
  oneOf,
  string,
  bool,
  func,
  object,
} from 'prop-types';
import classnames from 'classnames';

const Input = ({
  field,
  sessioncamhide,
  touched,
  error,
  id,
  label,
  mb,
  ...props
}) => {
  const showError = error && touched;
  const showValid = !error && touched;
  const cssClasses = classnames({
    sessioncamhidetext: sessioncamhide,
    'error-field': showError,
  }, 'wb-dark');
  const parentCssClasses = `wb-form-item ${mb}`;

  return (
    <div className={parentCssClasses}>
      {label && <label className="wb-strong" htmlFor={id}>{label}</label>}
      <div className="wb-form-item__field wb-form-item__field__full">
        <input
          className={cssClasses}
          id={id}
          label={label}
          {...field}
          {...props}
        />
        {showError && <span className="form-item-msg__error-icon wb-icon_disc-info-filled" />}
        {showValid && <span className="form-item-msg__info-icon wb-icon_disc-checked-fill" />}
      </div>
      {showError && <span className="form-item-msg form-item-msg--error">{error}</span>}
    </div>
  );
};

Input.propTypes = {
  /**
    HTML type attribute.
  */
  type: oneOf([
    'text',
    'email',
    'tel',
    'password',
  ]),
  id: string,
  /**
    HTML placeholder attribute.
  */
  placeholder: string,
  /**
    HTML value attribute.
  */
  value: string,
  /**
    Input label. Not displayed if empty.
  */
  label: string,
  /**
    Sessioncam field masking.
  */
  sessioncamhide: bool,
  /**
    Error message. Not displayed if empty.
  */
  error: string,
  /**
    Function to be run on input change.
  */
  onChange: func,
  field: object,
  touched: bool,
  mb: string,
};

Input.defaultProps = {
  type: 'text',
  mb: 'wb-push-middle--bottom',
  sessioncamhide: true,
};

export default Input;
