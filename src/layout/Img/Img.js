import React from 'react';
import { string } from 'prop-types';

const Img = ({ src, label, className }) => (
  <img
    className={className}
    src={src}
    alt={label}
    aria-label={label}
  />
);

Img.propTypes = {
  src: string.isRequired,
  label: string.isRequired,
  className: string,
};

export default Img;
