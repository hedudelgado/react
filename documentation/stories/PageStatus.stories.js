import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { text, select, withKnobs } from '@storybook/addon-knobs';
import PageStatus from '../../src/layout/PageStatus';

storiesOf('Page Status', module)
  .addDecorator(withKnobs)
  .add('Preview', () => (
    <Fragment>
      <h1 className="mt4">Page Status</h1>
      {
        ['Warning', 'Error'].map(variant => (
          <Fragment key={variant}>
            <h3 className="mt3">{variant}</h3>
            <PageStatus
              ariaLive="off"
              variant={variant.toLowerCase()}
              title="Error, oh dear..."
            >
              Something went wrong when we tried to load the results.
            </PageStatus>
          </Fragment>
        ))
      }
    </Fragment>
  ))
  .add('PageStatus', () => {
    const variants = ['warning', 'error'];
    const variant = select('variant*', variants, variants[0]);
    const ariaLiveValues = ['off', 'polite', 'assertive'];
    const ariaLive = select('ariaLive*', ariaLiveValues, ariaLiveValues[0]);
    const title = text('title', 'Error, oh dear...');
    const children = text('children (body)', 'Something went wrong when we tried to load the results.');

    return (
      <PageStatus
        ariaLive={ariaLive}
        variant={variant}
        title={title}
      >
        {children}
      </PageStatus>
    );
  });
