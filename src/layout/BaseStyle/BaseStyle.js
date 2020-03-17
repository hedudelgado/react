import React from 'react';
import {
  string, node, oneOf,
} from 'prop-types';
import classNames from 'classnames';

const spaces = ['0', '1', '2', '3', '4'];

const auto = 'auto';

const margins = {
  m: 'm',
  mt: 'mt',
  mr: 'mr',
  mb: 'mb',
  ml: 'ml',
  mx: 'mx',
  my: 'my',
};

const paddings = {
  p: 'p',
  pt: 'pt',
  pr: 'pr',
  pb: 'pb',
  pl: 'pl',
  px: 'px',
  py: 'py',
};

const BaseStyle = ({
  component: Component,
  children,
  className: classNameProp,
  m,
  mt,
  mr,
  mb,
  ml,
  mx,
  my,
  p,
  pt,
  pr,
  pb,
  pl,
  px,
  py,
  ...attrs
}) => {
  const getSpacing = margin => (margin === auto && `-${auto}`) || margin;
  const classes = classNames(
    classNameProp,
    {
      [`${margins.m}${m}`]: m,
      [`${margins.mt}${mt}`]: mt,
      [`${margins.mr}${getSpacing(mr)}`]: mr,
      [`${margins.mb}${mb}`]: mb,
      [`${margins.ml}${getSpacing(ml)}`]: ml,
      [`${margins.mx}${getSpacing(mx)}`]: mx,
      [`${margins.my}${my}`]: my,
      [`${paddings.p}${p}`]: p,
      [`${paddings.pt}${pt}`]: pt,
      [`${paddings.pr}${pr}`]: pr,
      [`${paddings.pb}${pb}`]: pb,
      [`${paddings.pl}${pl}`]: pl,
      [`${paddings.px}${px}`]: px,
      [`${paddings.py}${py}`]: py,
    },
  );

  return <Component className={classes} {...attrs}>{children}</Component>;
};

BaseStyle.propTypes = {
  /**
   * The HTML component that has to be rendered
   */
  component: string,
  /**
   * any possible HTML node
   */
  children: node,
  /**
   * margins
   */
  m: oneOf(spaces),
  /**
   * margin-top
   */
  mt: oneOf(spaces),
  /**
   * margin-right
   */
  mr: oneOf([...spaces, auto]),
  /**
   * margin-bottom
   */
  mb: oneOf(spaces),
  /**
   * margin-left
   */
  ml: oneOf([...spaces, auto]),
  /**
   * margin-left and margin-right
   */
  mx: oneOf([...spaces, auto]),
  /**
   * margin-top and margin-bottom
   */
  my: oneOf(spaces),
  /**
   * paddings
   */
  p: oneOf(spaces),
  /**
   * padding-top
   */
  pt: oneOf(spaces),
  /**
   * padding-right
   */
  pr: oneOf(spaces),
  /**
   * padding-bottom
   */
  pb: oneOf(spaces),
  /**
   * padding-left
   */
  pl: oneOf(spaces),
  /**
   * padding-left and padding-right
   */
  px: oneOf(spaces),
  /**
   * padding-top and padding-bottom
   */
  py: oneOf(spaces),
};

BaseStyle.propTypes = {
  className: string,
};

BaseStyle.defaultProps = {
  component: 'div',
};

export default BaseStyle;
