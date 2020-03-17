import React from 'react';
import { element } from 'prop-types';

const WrapperWithFonts = ({ children }) => (
  <div className="wb-typography">
    { children }
  </div>
);

WrapperWithFonts.propTypes = {
  children: element.isRequired,
};

export default WrapperWithFonts;
