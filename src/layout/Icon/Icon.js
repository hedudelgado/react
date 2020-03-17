import React from 'react';
import { string, oneOf } from 'prop-types';
import classNames from 'classnames';

const alignments = {
  left: 'pl1',
  right: 'pr1',
};

const Icon = ({ icon, push, className }) => {
  const cssClasses = classNames(
    `wb-icon_${icon}`,
    alignments[push],
    className,
  );

  return (
    <i className={cssClasses} />
  );
};

Icon.propTypes = {
  icon: string.isRequired,
  push: oneOf(Object.keys(alignments)),
  className: string,
};

export default Icon;
