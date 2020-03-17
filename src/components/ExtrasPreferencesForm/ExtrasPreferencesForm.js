import React from 'react';
import {
  func,
  object,
} from 'prop-types';
import Button from '../../layout/Button';
import Typography from '../../layout/Typography';
import { DEFAULT_VIEW } from '../App/appActions';
import RadioGroup, { RadioItem } from '../../layout/RadioGroup';
import { mealOptions } from '../../config.json';

const ExtrasPreferencesForm = ({
  profile: {
    business,
  },
  dictionary,
  setEditView,
  values,
  handleChange,
  handleBlur,
  handleSubmit,
}) => (
  <form
    data-test="extras-preferences-form"
    name="extras-preferences-form"
    onSubmit={handleSubmit}
  >
    <Typography component="h4" className="pi-color-greyscale-darkest">
      {dictionary['extraspreferences.edit.meals.title']}
    </Typography>
    <RadioGroup>
      {
        mealOptions.map(({ code, dictionaryKey }) => (
          <RadioItem
            field={{
              name: 'mealOptions',
              value: values.mealOptions,
              onBlur: handleBlur,
              onChange: handleChange,
            }}
            label={dictionary[dictionaryKey]}
            name="mealOptions"
            id={code}
            value={code}
            key={code}
          />
        ))
      }
    </RadioGroup>
    {business && (
      <div data-test="extraspreferences-wifi">
        <Typography component="h4" className="pi-color-greyscale-darkest">
          {dictionary['extraspreferences.edit.wifi.title']}
        </Typography>
        <RadioGroup>
          <RadioItem
            field={{
              name: 'wifiOptions',
              value: values.wifiOptions,
              onBlur: handleBlur,
              onChange: handleChange,
            }}
            label={dictionary['extraspreferences.edit.wifi.description.allow']}
            name="wifiOptions"
            id="allowWifi"
            value="true"
          />
          <RadioItem
            field={{
              name: 'wifiOptions',
              value: values.wifiOptions,
              onBlur: handleBlur,
              onChange: handleChange,
            }}
            label={dictionary['extraspreferences.edit.wifi.description.never']}
            name="wifiOptions"
            id="noWifi"
            value="false"
          />
        </RadioGroup>
      </div>
    )}
    <Typography component="h4" className="pi-color-greyscale-darkest">
      {dictionary['extraspreferences.edit.invoice.title']}
    </Typography>
    <RadioGroup>
      <RadioItem
        field={{
          name: 'invoiceOptions',
          value: values.invoiceOptions,
          onBlur: handleBlur,
          onChange: handleChange,
        }}
        label={dictionary['extraspreferences.edit.invoice.email']}
        name="invoiceOptions"
        id="emailInvoice"
        value="true"
      />
      <RadioItem
        field={{
          name: 'invoiceOptions',
          value: values.invoiceOptions,
          onBlur: handleBlur,
          onChange: handleChange,
        }}
        label={dictionary['extraspreferences.edit.invoice.checkin']}
        name="invoiceOptions"
        id="checkInInvoice"
        value="false"
      />
    </RadioGroup>
    <Button
      data-test="save-changes"
      className="wb-push--bottom"
      color="primary"
      type="submit"
    >
      {dictionary['extraspreferences.button.save']}
    </Button>
    <Button
      data-test="closeForm"
      color="default"
      variant="text"
      className="underline block"
      fullWidth
      onClick={() => setEditView(DEFAULT_VIEW)}
    >
      {dictionary['extraspreferences.button.cancel']}
    </Button>
  </form>
);


ExtrasPreferencesForm.propTypes = {
  profile: object.isRequired,
  dictionary: object.isRequired,
  values: object.isRequired,
  setEditView: func.isRequired,
  handleChange: func.isRequired,
  handleBlur: func.isRequired,
  handleSubmit: func.isRequired,
};

export default ExtrasPreferencesForm;
