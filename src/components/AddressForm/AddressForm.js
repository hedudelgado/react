import React, { Fragment, Component } from 'react';
import { object, array, func } from 'prop-types';
import Input from '../../layout/Input';
import Select from '../../layout/Select';
import Button from '../../layout/Button';
import Typography from '../../layout/Typography';
import RadioGroup, { RadioItem } from '../../layout/RadioGroup';
import { getAddressList } from '../../utils/api';
import { selectedFlagImage } from '../../utils/selectedFlagImage';
import { BUSINESS, LEISURE } from '../../config.json';

class AddressForm extends Component {
  constructor(props) {
    super(props);

    const countryOptions = props.countries.map(country => (
      <option
        label={country.countryLegend}
        value={country.countryCode}
        key={country.countryCode}
      >
        {country.countryLegend}
      </option>
    ));

    this.state = {
      countryOptions,
      addressList: [],
      addressListOptions: [],
      disableSelectDefault: false,
    };

    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleAddressList = this.handleAddressList.bind(this);
  }

  handleAddressChange(event) {
    if (event.target.value !== 'default') {
      const {
        setFieldValue,
      } = this.props;
      const { addressList } = this.state;
      const address = addressList[event.target.value];

      this.setState({
        disableSelectDefault: true,
      });

      ['line1', 'line2', 'line3', 'line4'].forEach((field) => {
        setFieldValue(field, address[field] ? address[field] : '');
      });

      setFieldValue('postCode', address.postcode);
      setFieldValue('countryCode', address.country);
      setFieldValue('companyName', address.companyName ? address.companyName : '');
      setFieldValue('type', address.companyName ? BUSINESS : LEISURE);
    }
  }

  handleAddressList(postcode) {
    getAddressList(postcode).then((response) => {
      this.setState({
        addressList: response,
        addressListOptions: response.map((address, key) => (
          <option
            label={address.label}
            value={key}
            key={address.label}
          >
            {address.label}
          </option>
        )),
        disableSelectDefault: false,
      });
    });
  }

  render() {
    const {
      dictionary,
      values: {
        postCode,
        type,
        countryCode,
        line1,
        line2,
        line3,
        line4,
        companyName,
      },
      errors,
      touched,
      handleBlur,
      handleChange,
      countries,
    } = this.props;

    const {
      countryOptions,
      addressList,
      addressListOptions,
      disableSelectDefault,
    } = this.state;

    return (
      <Fragment>
        <Typography component="h6" className="pi-color-greyscale-darkest mt0 mb1">
          {dictionary['profile.postCodeTitle']}
        </Typography>
        <Input
          type="text"
          name="postCode"
          id="postCode"
          value={postCode}
          placeholder={dictionary['profile.form.postcodeuk']}
          onChange={handleChange}
          onBlur={handleBlur}
          error={dictionary[errors.postCode]}
          touched={touched.postCode}
        />
        <Button
          data-test="find-postcode"
          color="secondary"
          onClick={() => this.handleAddressList(postCode)}
          className="wb-push--bottom wb-btn--full-width"
        >
          {dictionary['profile.button.findpostcode']}
        </Button>
        {!!addressList.length && (
          <Select
            name="addressList"
            id="addressList"
            onBlur={handleBlur}
            onChange={this.handleAddressChange}
            sessioncamhide
          >
            <option key="default" value="default" defaultValue disabled={disableSelectDefault}>
              {dictionary['profile.placeholder.address']}
            </option>
            {addressListOptions}
          </Select>
        )}
        <RadioGroup>
          <RadioItem
            field={{
              name: 'type',
              value: type,
              onBlur: handleBlur,
              onChange: handleChange,
            }}
            label={dictionary['profile.radio.address.home']}
            name="type"
            id="homeAddress"
            value={LEISURE}
            sessioncamhide
          />
          <RadioItem
            field={{
              name: 'type',
              value: type,
              onBlur: handleBlur,
              onChange: handleChange,
            }}
            label={dictionary['profile.radio.address.business']}
            name="type"
            id="businessAddress"
            value={BUSINESS}
            sessioncamhide
          />
        </RadioGroup>
        {type === BUSINESS && (
          <Input
            type="text"
            name="companyName"
            id="companyName"
            value={companyName}
            placeholder={dictionary['profile.form.companyname']}
            onChange={handleChange}
            onBlur={handleBlur}
            error={dictionary[errors.companyName]}
            touched={touched.companyName}
          />
        )}
        <Input
          type="text"
          name="line1"
          id="line1"
          value={line1}
          placeholder={dictionary['profile.form.address.line1']}
          onChange={handleChange}
          onBlur={handleBlur}
          error={dictionary[errors.line1]}
          touched={touched.line1}
          required
        />
        <Input
          type="text"
          name="line2"
          id="line2"
          value={line2}
          placeholder={dictionary['profile.form.address.line2']}
          onChange={handleChange}
          onBlur={handleBlur}
          error={dictionary[errors.line2]}
          touched={touched.line2}
        />
        <Input
          type="text"
          name="line3"
          id="line3"
          value={line3}
          placeholder={dictionary['profile.form.address.line3']}
          onChange={handleChange}
          onBlur={handleBlur}
          error={dictionary[errors.line3]}
          touched={touched.line3}
        />
        <Input
          type="text"
          name="line4"
          id="line4"
          value={line4}
          placeholder={dictionary['profile.form.address.line4']}
          onChange={handleChange}
          onBlur={handleBlur}
          error={dictionary[errors.line4]}
          touched={touched.line4}
        />
        <Input
          type="text"
          name="postCode"
          id="postCode"
          value={postCode}
          placeholder={dictionary['profile.form.postcode']}
          onChange={handleChange}
          onBlur={handleBlur}
          error={dictionary[errors.postCode]}
          touched={touched.postCode}
        />
        <Select
          onBlur={handleBlur}
          onChange={handleChange}
          value={countryCode}
          name="countryCode"
          id="countryCode"
          flagImg={selectedFlagImage(countryCode, countries)}
          touched={touched.countryCode}
          sessioncamhide
        >
          {countryOptions}
        </Select>
      </Fragment>
    );
  }
}

AddressForm.propTypes = {
  dictionary: object.isRequired,
  countries: array.isRequired,
  values: object.isRequired,
  setFieldValue: func.isRequired,
  handleBlur: func.isRequired,
  handleChange: func.isRequired,
  errors: object.isRequired,
  touched: object.isRequired,
};

export default AddressForm;
