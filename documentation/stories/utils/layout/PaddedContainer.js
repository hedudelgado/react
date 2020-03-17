import React from 'react';
import PropTypes from 'prop-types';

const PaddedContainer = ({ children }) => (
  <div className="wb-soft--base wb-container">{ children }</div>
);

PaddedContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PaddedContainer;
