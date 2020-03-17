import React from 'react';
import {
  bool,
  string,
  array,
  object,
  oneOfType,
  number,
} from 'prop-types';
import classnames from 'classnames';

const RadioItem = ({
  label,
  subLabels,
  field: {
    name,
    onBlur,
    onChange,
    value: fieldValue,
  },
  value,
  id,
  sessioncamhide,
  ...props
}) => {
  const labels = subLabels.map(subLabel => <span key={subLabel} className="wb-radio__label__inner-info">{subLabel}</span>);
  const classes = classnames({
    sessioncamhidetext: sessioncamhide,
  });
  return (
    <li className="wb-radio__inner">
      <label htmlFor={id} className="wb-radio__label">
        <input
          type="radio"
          name={name}
          id={id}
          onBlur={onBlur}
          onChange={onChange}
          checked={value === fieldValue}
          value={value}
          className={classes}
          {...props}
        />
        <span className="wb-radio__label__inner">
          <span className="wb-radio__label__inner__title">{label}</span>
          {labels}
        </span>
      </label>
    </li>
  );
};

RadioItem.propTypes = {
  value: oneOfType([
    string,
    number,
  ]),
  label: oneOfType([
    string,
    number,
  ]),
  subLabels: array,
  field: object,
  id: oneOfType([
    string,
    number,
  ]),
  /**
    Sessioncam field masking.
  */
  sessioncamhide: bool,
};

RadioItem.defaultProps = {
  subLabels: [],
};

export default RadioItem;
