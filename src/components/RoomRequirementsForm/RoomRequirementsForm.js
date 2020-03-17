import React from 'react';
import {
  object,
  func,
} from 'prop-types';
import Button from '../../layout/Button';
import Select from '../../layout/Select';
import { DEFAULT_VIEW } from '../App/appActions';
import RoomTypeSelect from './RoomTypeSelect';

const RoomRequirementsForm = ({
  touched,
  dictionary,
  setEditView,
  roomRequirements: {
    adults,
    children,
    type,
  },
  handleSubmit,
  handleBlur,
  handleChange,
  values,
  setFieldValue,
}) => {
  /**
   * @function handleFamilyRoom
   * @description Set field value to Family when there are more than 1 child.
   */
  const handleFamilyRoom = ({ target: { value } }) => {
    if (value > 0) {
      setFieldValue('type', 'FAM');
    }
    setFieldValue('children', value);
  };

  /**
   * @function hasMultipleAdults
   * @description Set field value to Double when there are multiple adults.
   */
  const hasMultipleAdults = ({ target: { value } }) => {
    if (value > 1) {
      setFieldValue('type', 'DB');
    }
    setFieldValue('adults', value);
  };

  return (
    <form
      data-test="room-requirements-form"
      name="room-requirements-form"
      onSubmit={handleSubmit}
    >
      <Select
        onBlur={handleBlur}
        onChange={hasMultipleAdults}
        defaultValue={values.adults}
        name="adults"
        id="adults"
        label={dictionary['roomrequirements.adults.label']}
        touched={touched.adults}
      >
        {
          adults.map(adult => (
            <option
              key={adult}
              value={adult}
            >
              {adult}
            </option>
          ))
        }
      </Select>
      <Select
        onBlur={handleBlur}
        onChange={handleFamilyRoom}
        defaultValue={values.children}
        name="children"
        id="children"
        label={dictionary['roomrequirements.children.label']}
        touched={touched.children}
      >
        {
          children.map(child => (
            <option
              key={child}
              value={child}
            >
              {child}
            </option>
          ))
        }
      </Select>
      <Select
        onBlur={handleBlur}
        onChange={handleChange}
        defaultValue={values.cotRequired}
        name="cotRequired"
        id="cotRequired"
        label={dictionary['roomrequirements.cot.label']}
        touched={touched.cotRequired}
      >
        <option key={dictionary['roomrequirements.cotrequired.true']} value="true">{dictionary['roomrequirements.cotrequired.true']}</option>
        <option key={dictionary['roomrequirements.cotrequired.false']} value="false">{dictionary['roomrequirements.cotrequired.false']}</option>
      </Select>
      <RoomTypeSelect
        type={type}
        dictionary={dictionary}
        hasChildren={parseInt(values.children, 10) > 0}
        hasMultipleAdults={parseInt(values.adults, 10) > 1}
        onBlur={handleBlur}
        onChange={handleChange}
        defaultValue={values.type}
        name="type"
        id="type"
        label={dictionary['roomrequirements.roomType.label']}
        touched={touched.type}
      />
      <Button
        className="wb-push--bottom"
        id="save-changed"
        color="primary"
        type="submit"
      >
        {dictionary['roomrequirements.button.save']}
      </Button>
      <Button
        data-test="closeForm"
        color="default"
        variant="text"
        className="underline block"
        fullWidth
        onClick={() => setEditView(DEFAULT_VIEW)}
      >
        {dictionary['roomrequirements.button.cancel']}
      </Button>
    </form>
  );
};

RoomRequirementsForm.propTypes = {
  touched: object.isRequired,
  handleBlur: func.isRequired,
  handleChange: func.isRequired,
  roomRequirements: object.isRequired,
  dictionary: object.isRequired,
  setEditView: func.isRequired,
  values: object.isRequired,
  handleSubmit: func.isRequired,
  setFieldValue: func.isRequired,
};

export default RoomRequirementsForm;
