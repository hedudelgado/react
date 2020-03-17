import React from 'react';
import {
  string,
  bool,
  func,
  object,
  array,
} from 'prop-types';
import classnames from 'classnames';

const Select = ({
  placeholder,
  field,
  sessioncamhide,
  touched,
  error,
  id,
  label,
  children,
  flagImg,
  halfWidth,
  hideIcon,
  hideMessage,
  ...props
}) => {
  const showError = error && touched;
  const showValid = !error && touched;
  const selectClassNames = classnames({
    sessioncamhidetext: sessioncamhide,
    'error-field': showError,
  });
  const wrapperClassNames = classnames(
    'wb-form-item',
    { 'wb-push-middle--bottom': !halfWidth },
    { 'wb-native-dropdown-offset-flag': flagImg },
    { 'col mr2': halfWidth },
  );
  const childWrapperClassNames = classnames(
    'wb-form-item__field',
    { 'wb-form-item__field__full': !halfWidth },
    { 'wb-form-item__field__half': halfWidth },
  );
  const flagStyle = {};

  if (flagImg) {
    flagStyle.backgroundImage = `url(https://www.premierinn.com${flagImg})`;
  }

  return (
    <div className={wrapperClassNames}>
      {label && <label className="wb-strong" htmlFor={id}>{label}</label>}
      <div className={childWrapperClassNames}>
        <select
          className={selectClassNames}
          id={id}
          label={label}
          {...field}
          {...props}
        >
          {children}
        </select>
        <div className="wb-icon_arrow-down" />
        {flagImg && <span className="wb-native-dropdown--flag" style={flagStyle} />}
        {!hideIcon && showError && <span className="form-item-msg__error-icon wb-icon_disc-info-filled" />}
        {!hideIcon && showValid && <span className="form-item-msg__info-icon wb-icon_disc-checked-fill" />}
      </div>
      {!hideMessage && showError && <span className="form-item-msg form-item-msg--error">{error}</span>}
    </div>
  );
};

Select.propTypes = {
  /**
    HTML id attribute.
  */
  id: string.isRequired,
  /**
    HTML placeholder attribute.
  */
  placeholder: string,
  /**
    HTML value attribute.
  */
  value: string,
  /**
    Select label. Not displayed if empty.
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
    Function to be run on select change.
  */
  onChange: func,
  field: object,
  touched: bool,
  children: array,
  flagImg: string,
  halfWidth: bool,
  hideIcon: bool,
  hideMessage: bool,
};

Select.defaultProps = {
  placeholder: '',
  halfWidth: false,
  hideIcon: false,
  hideMessage: false,
};

export default Select;
