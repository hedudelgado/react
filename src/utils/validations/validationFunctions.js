import luhn from 'fast-luhn';

const postcodeUKRegex = /^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})$/;
const postcodeDERegex = /^\d{4,5}$/;
const addressRegex = /^[-A-Za-z0-9À-ÖØ-ʒͰ-ͳͶ-ͷͻ-ͽvΑ-Ͽἀ-ῼЀ-ӿễấ,\s']*$/;
const nameRegex = /^[^:;~0-9]{2,}$/;
const mobileRegex = /^\+?[\d ]{6,15}$/;
const passwordRegex = /(?=^.{8,}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*[\s\W]).*$/;
const emailRegex = /^[a-zA-Z0-9À-ÖØ-ʒͰ-ͳͶ-ͷͻ-ͽvΑ-Ͽἀ-ῼЀ-ӿễấ'_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
const companyNameRegex = /^[\dA-Za-zÄÖÜäöüß&'()\- ]{1,40}$/;
const passportNumberRegex = /^[0-9]+$/;
const memorableWordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

export const validatePostCode = (postcode, countryCode) => {
  const postCodeValidations = {
    GB: postcodeUKRegex,
    D: postcodeDERegex,
  };

  switch (countryCode) {
    case 'GB':
    case 'D':
      return (
        (!postCodeValidations[countryCode].test(postcode) && 'profile.error.postcode')
        || undefined
      );
    default:
      return undefined;
  }
};

export const validateTitle = title => (
  (title === '' && 'guests.error.title.empty')
  || undefined
);

export const validateAddressLine = (address, required = true) => (
  (required && !address && 'profile.error.address.firstline')
  || (address.length > 35 && 'profile.error.address.max')
  || (!addressRegex.test(address) && 'profile.error.address.invalid')
  || undefined
);

export const validateFirstName = name => (
  ((!nameRegex.test(name) || name.length > 20) && 'profile.error.firstname')
  || undefined
);

export const validateLastName = name => (
  ((!nameRegex.test(name) || name.length > 30) && 'profile.error.lastname')
  || undefined
);

export const validateFullName = name => (
  ((!nameRegex.test(name) || name.length > 51) && 'profile.error.name')
  || undefined
);

export const validatePhoneNumber = (phoneNumber, error) => (
  (!mobileRegex.test(phoneNumber) && error)
  || undefined
);

export const validateCurrentPassword = value => (
  (value === '' && 'password.error.empty')
  || undefined
);

export const validateNewPassword = ({ newPassword, currentPassword }) => (
  (!passwordRegex.test(newPassword) && 'password.error.invalid')
  || (newPassword === currentPassword && 'password.error.same')
  || undefined
);

export const validateConfirmPassword = ({ newPassword, confirmPassword }) => (
  (!passwordRegex.test(confirmPassword) && 'password.error.invalid')
  || (newPassword !== '' && confirmPassword !== '' && newPassword !== confirmPassword && 'password.error.different')
  || undefined
);

export const validateEmail = (email, guestsEmails = [], checkExistingEmail) => (
  (!emailRegex.test(email) && 'guests.error.email.valid')
  || (email.length > 50 && 'guests.error.email.max')
  || (checkExistingEmail && guestsEmails.length && guestsEmails.includes(email) && 'guests.error.email.exists')
  || undefined
);

export const validateCompanyName = companyName => (
  (!companyNameRegex.test(companyName) && 'profile.error.companyname')
  || undefined
);

export const validateCardNumber = cardNumber => (
  (!cardNumber && 'payment.error.entercard')
  || (((cardNumber.length < 12) || !luhn(cardNumber.replace(/\s/g, ''))) && 'payment.error.invalidcard')
  || undefined
);

export const validateExpiryDate = (year, month) => {
  const now = new Date();
  const expiryDate = new Date(year, month, 0, 23, 59, 59);
  return (
    (!/^(\d{1,2}$)+$/.test(month) && 'payment.error.month')
    || (!/^(\d{4})+$/.test(year) && 'payment.error.year')
    || (expiryDate < now && 'payment.error.past')
    || undefined
  );
};

export const validatePassportNumber = passportNumber => (
  (!passportNumberRegex.test(passportNumber) && 'guests.error.passport')
  || undefined
);

export const validateMemorableWord = memorableWord => (
  (!memorableWordRegex.test(memorableWord) && 'memorable.word.error')
  || undefined
);
