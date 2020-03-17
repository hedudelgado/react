import React from 'react';
import { array, bool, object } from 'prop-types';
import Select from '../../layout/Select';

const RoomTypeSelect = ({
  dictionary,
  type,
  hasChildren,
  hasMultipleAdults,
  ...fieldProps
}) => (
  <Select {...fieldProps}>
    {
      type
        .filter(({ code }) => (hasChildren ? code === 'FAM' : code !== 'FAM'))
        .filter(({ code }) => (hasMultipleAdults ? code !== 'SB' : true))
        .filter(({ code }) => (!hasMultipleAdults ? code !== 'TWIN' : true))
        .map(({ code, dictionaryKey }) => (
          <option
            key={code}
            value={code}
          >
            {dictionary[dictionaryKey]}
          </option>
        ))
    }
  </Select>
);

RoomTypeSelect.propTypes = {
  type: array.isRequired,
  hasChildren: bool,
  hasMultipleAdults: bool,
  dictionary: object.isRequired,
};

export default RoomTypeSelect;
