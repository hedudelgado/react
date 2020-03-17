import React from 'react';

export const dialingCodeOptions = (code, countries) => countries.map((country) => {
  const label = code === country.countryCode ? country.dialingCode : `${country.countryLegend} (${country.dialingCode})`;
  return (
    <option
      label={label}
      value={country.countryCode}
      key={country.countryCode}
    >
      {label}
    </option>
  );
});
