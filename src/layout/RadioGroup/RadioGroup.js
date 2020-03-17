import React from 'react';
import { array } from 'prop-types';

const RadioGroup = ({ children }) => (
  <div className="wb-form-item fixed-size mb3 wb-form-item--clean max-fit">
    <ul className="wb-radio__group">
      {children}
    </ul>
  </div>
);

RadioGroup.propTypes = {
  children: array,
};

export default RadioGroup;
