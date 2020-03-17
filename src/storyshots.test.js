import initStoryshots, { multiSnapshotWithOptions } from '@storybook/addon-storyshots';

initStoryshots({
  suite: 'Image storyshots',
  test: multiSnapshotWithOptions(),
});
