import React, { Fragment } from 'react';
import { configure } from '@storybook/react';
import { addDecorator } from '@storybook/react/dist/client/preview';
import { withOptions } from '@storybook/addon-options';
import { withPropsTable } from 'storybook-addon-react-docgen';

import requireContext from 'require-context.macro';

import { Provider } from 'react-redux';
import PaddedContainer from '../documentation/stories/utils/layout/PaddedContainer';
import WrapperWithFonts from '../documentation/stories/utils/layout/WrapperWithFonts';

import '../src/main.scss';

addDecorator(story => (
  <PaddedContainer>
    <WrapperWithFonts>{ story() }</WrapperWithFonts>
  </PaddedContainer>
));

addDecorator(withPropsTable({
  propTablesExclude: [
    Provider,
    PaddedContainer,
    WrapperWithFonts,
    Fragment,
  ]
}));

addDecorator(withOptions({ addonPanelInRight: true }))

const req = requireContext('../documentation', true, /\.stories\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
