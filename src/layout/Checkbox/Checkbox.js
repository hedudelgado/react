import React from 'react';
import { bool, object, string } from 'prop-types';
import classnames from 'classnames';

const Checkbox = ({
  label,
  field,
  id,
  sessioncamhide,
  ...props
}) => {
  const classes = classnames({
    sessioncamhidetext: sessioncamhide,
  });
  return (
    <div className="wb-form-item wb-checkbox wb-checkbox__white wb-form-item--clean mb3">
      <input
        type="checkbox"
        id={id}
        className={classes}
        {...field}
        {...props}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

Checkbox.propTypes = {
  label: string.isRequired,
  field: object.isRequired,
  id: string.isRequired,
  /**
    Sessioncam field masking.
  */
  sessioncamhide: bool,
};

export default Checkbox;
