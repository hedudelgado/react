import React from 'react';
import {
  string, node, oneOf,
} from 'prop-types';
import classNames from 'classnames';

import BaseStyle from '../BaseStyle';

const weights = {
  bold: 'bold',
};

const availableSizes = {
  xxxl: 'xxxl',
  xxl: 'xxl',
  xl: 'xl',
  l: 'l',
  m: 'm',
  base: 'base',
  s: 's',
  xs: 'xs',
};

const headerComponentTypes = {
  hero: 'h1',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  subtext: 'h5',
};

const textComponentTypes = {
  p: 'p',
  span: 'span',
};

const componentTypes = {
  ...headerComponentTypes,
  ...textComponentTypes,
};

const Typography = ({
  children,
  component,
  size = availableSizes.base,
  className: classNameProp,
  weight,
  ...otherProps
}) => {
  const className = classNames(
    {
      'wb-heading': headerComponentTypes[component],
      [`wb-heading--${component}`]: headerComponentTypes[component],
      [`font-size--${size}`]: textComponentTypes[component],
      'wb-strong': weights[weight] && weight === weights.bold,
    },
    classNameProp,
  );
  return (
    <BaseStyle
      component={componentTypes[component]}
      className={className}
      {...otherProps}
    >
      {
        children
      }
    </BaseStyle>
  );
};

Typography.propTypes = {
  /**
   * Either string or react node
   */
  children: node,
  /**
   * All possible components
   */
  component: oneOf(Object.keys(componentTypes)),
  /* eslint-disable react/require-default-props */
  size: oneOf(Object.keys(availableSizes)),
  className: string,
  weight: string,
};

Typography.defaultProps = {
  component: componentTypes.p,
};

export default Typography;
