import React from 'react';

export const countryOptions = countries => (
  countries.map(country => (
    <option
      label={country.countryLegend}
      value={country.countryCode}
      key={country.countryCode}
    >
      {country.countryLegend}
    </option>
  )));
