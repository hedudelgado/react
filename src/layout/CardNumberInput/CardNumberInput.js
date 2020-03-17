import React from 'react';
import {
  string,
  bool,
  func,
  object,
} from 'prop-types';
import classnames from 'classnames';
import './CardNumberInput.scss';
import Img from '../Img';

const CardNumberInput = ({
  field,
  sessioncamhide,
  touched,
  error,
  label,
  card: {
    src,
    alt,
  },
  ...props
}) => {
  const showError = error && touched;
  const showValid = !error && touched;
  const cssClasses = classnames({
    sessioncamhidetext: sessioncamhide,
    'error-field': showError,
  });

  return (
    <div className="wb-form-item mb2">
      {label && <label className="wb-strong" htmlFor={field.name}>{label}</label>}
      <div className="wb-form-item__field wb-form-item__field__full">
        <input
          type="tel"
          className={cssClasses}
          label={label}
          {...field}
          {...props}
        />
        {src && (
          <Img
            className="card-logo mr1"
            src={src}
            label={alt}
          />
        )}
        {showError && <span className="form-item-msg__error-icon wb-icon_disc-info-filled" />}
        {showValid && <span className="form-item-msg__info-icon wb-icon_disc-checked-fill" />}
      </div>
      {showError && <span className="form-item-msg form-item-msg--error">{error}</span>}
    </div>
  );
};

CardNumberInput.propTypes = {
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
  card: object,
};

CardNumberInput.defaultProps = {
  card: {},
};

export default CardNumberInput;
