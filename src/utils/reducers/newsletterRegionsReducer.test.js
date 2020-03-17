import reducer from './newsletterRegionsReducer';
import { REGIONS_RECEIVED } from '../../components/App/appActions';

const regions = [{
  id: '1',
  description: 'UK & Ireland',
  active: true,
}];

const defaultState = [];

describe('Regions Reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(defaultState);
  });

  it('should set the state with passed array', () => {
    expect(reducer(undefined, { type: REGIONS_RECEIVED, regions })).toEqual(regions);
  });
});
