import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { text, select, withKnobs } from '@storybook/addon-knobs';
import Hyperlink from '../../src/layout/Hyperlink';

storiesOf('Hyperlink', module)
  .addDecorator(withKnobs)
  .add('Preview', () => {
    const href = 'https://www.premierinn.com/';
    const children = 'Click here';

    return (
      <Fragment>
        <h1>Hyperlink</h1>
        {
          ['regular', 'primary', 'secondary'].map(variant => (
            <Fragment key={variant}>
              <h2 className="mt3 border-bottom">
                {`Variant ${variant}`}
              </h2>
              <Hyperlink
                variant={variant}
                href={href}
              >
                {children}
              </Hyperlink>
            </Fragment>
          ))
        }
      </Fragment>
    );
  })
  .add('Hyperlink', () => {
    const variants = ['regular', 'primary', 'secondary'];
    const variant = select('variant*', variants, variants[0]);
    const href = text('href', 'https://www.premierinn.com/');
    const children = text('children (body)', 'Click here');

    return (
      <Hyperlink
        variant={variant}
        href={href}
      >
        {children}
      </Hyperlink>
    );
  });
