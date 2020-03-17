import {
  validateCompanyName,
  validatePostCode,
  validateAddressLine,
  validateTitle,
  validateFirstName,
  validateLastName,
  validateFullName,
  validatePhoneNumber,
  validateCurrentPassword,
  validateNewPassword,
  validateConfirmPassword,
  validateCardNumber,
  validateExpiryDate,
  validateEmail,
  validatePassportNumber,
  validateMemorableWord,
} from '../validationFunctions';

const dictionaryErrors = {
  different: 'password.error.different',
  invalid: 'password.error.invalid',
  empty: 'password.error.empty',
  same: 'password.error.same',
  nameFormat: 'profile.error.name',
  titleExists: 'guests.error.title.empty',
  firstNameFormat: 'profile.error.firstname',
  lastNameFormat: 'profile.error.lastname',
  mobile: 'profile.error.mobile',
  telephone: 'profile.error.telephone',
  postCode: 'profile.error.postcode',
  companyName: 'profile.error.companyname',
  emailValid: 'guests.error.email.valid',
  emailMax: 'guests.error.email.max',
  emailExists: 'guests.error.email.exists',
  passport: 'guests.error.passport',
  memorableWord: 'memorable.word.error',
};

describe('Validations', () => {
  describe('AddressForm validations', () => {
    it('should accept a correct GB postcode', () => {
      expect(validatePostCode('NW2 3AN', 'GB')).toBe(undefined);
      expect(validatePostCode('TW11NH', 'GB')).toBe(undefined);
      expect(validatePostCode('ec1n2td', 'GB')).toBe(undefined);
    });

    it('should accept a correct D postcode', () => {
      expect(validatePostCode('1265', 'D')).toBe(undefined);
      expect(validatePostCode('96300', 'D')).toBe(undefined);
    });

    it('should reject an incorrect GB postcode', () => {
      expect(validatePostCode('1234', 'GB')).toBe(dictionaryErrors.postCode);
      expect(validatePostCode('123 465', 'GB')).toBe(dictionaryErrors.postCode);
      expect(validatePostCode('NW10@PO', 'GB')).toBe(dictionaryErrors.postCode);
    });

    it('should reject an incorrect D postcode', () => {
      expect(validatePostCode('12349999', 'D')).toBe(dictionaryErrors.postCode);
      expect(validatePostCode('123A 465', 'D')).toBe(dictionaryErrors.postCode);
      expect(validatePostCode('NW10@PO', 'D')).toBe(dictionaryErrors.postCode);
    });

    it('should accept any postcode for any country not GB or D', () => {
      expect(validatePostCode('1234', 'GR')).toBe(undefined);
      expect(validatePostCode('123 465', 'PT')).toBe(undefined);
      expect(validatePostCode('NW10@PO', 'PL')).toBe(undefined);
    });

    it('should accept a valid first address line', () => {
      expect(validateAddressLine('37 Chichele')).toBe(undefined);
      expect(validateAddressLine('120 Hoborn')).toBe(undefined);
      expect(validateAddressLine('28 October 1940')).toBe(undefined);
    });

    it('should reject a line with illegal characters', () => {
      expect(validateAddressLine('@#$')).toBe('profile.error.address.invalid');
    });

    it('should accept a line with dash and apostrophe characters', () => {
      expect(validateAddressLine('London\'s Great-Eastern Road')).toBe(undefined);
    });

    it('should reject an empty first address line', () => {
      expect(validateAddressLine('')).toBe('profile.error.address.firstline');
    });

    it('should not reject an empty first address line if not required', () => {
      expect(validateAddressLine('', false)).toBe(undefined);
    });

    it('should reject a very long first address line', () => {
      expect(validateAddressLine('This is an oustastingly long first line address, I mean seriously, why do we test this?'))
        .toBe('profile.error.address.max');
    });

    it('should reject a very long first address line even if not required', () => {
      expect(validateAddressLine('This is an oustastingly long first line address, I mean seriously, why do we test this?', false))
        .toBe('profile.error.address.max');
    });

    it('should accept a correct company name', () => {
      expect(validateCompanyName('Whitbread plc')).toBe(undefined);
      expect(validateCompanyName('Bet365')).toBe(undefined);
      expect(validateCompanyName('Marks & Spencer')).toBe(undefined);
      expect(validateCompanyName('K-21')).toBe(undefined);
      expect(validateCompanyName('Veröffentlichungspflichtigen GmbH')).toBe(undefined);
    });

    it('should reject an incorrect company name', () => {
      expect(validateCompanyName('Whitbre@d plc'))
        .toBe(dictionaryErrors.companyName);
      expect(validateCompanyName('This is a company name with more than 40 characters. Just wow.'))
        .toBe(dictionaryErrors.companyName);
    });
  });

  describe('UserProfileForm Validation', () => {
    [
      'v',
      'This is a name with more than 20 characters',
      '4444333322221110',
    ].forEach((firstName) => {
      it(`should return a string with error message for the incorrect first name ${firstName}`, () => {
        expect(validateFirstName(firstName)).toMatch(dictionaryErrors.firstNameFormat);
      });
    });

    it('should return undefined if correct name format provided', () => {
      expect(validateFirstName('Ivan')).toBe(undefined);
    });

    [
      'v',
      'This is a name with more than 30 characters at the beach under the sun',
      '4444333322221110',
    ].forEach((lastName) => {
      it(`should return a string with error message for the incorrect last name ${lastName}`, () => {
        expect(validateLastName(lastName)).toMatch(dictionaryErrors.lastNameFormat);
      });
    });

    it('should return undefined if correct last name format provided', () => {
      expect(validateLastName('Papadopoulos')).toBe(undefined);
    });

    [
      'v',
      'This is a name with more than 51 characters at the beach under the sun. It is like this to cover First Name, a space and then the last name',
      '4444333322221110',
    ].forEach((fullName) => {
      it(`should return a string with error message for the incorrect last name ${fullName}`, () => {
        expect(validateFullName(fullName)).toMatch(dictionaryErrors.nameFormat);
      });
    });

    it('should return undefined if correct full name format provided', () => {
      expect(validateFullName('Kyriakos Papadopoulos')).toBe(undefined);
    });

    it('should return undefiend if title exists', () => {
      expect(validateTitle('Mr')).toBe(undefined);
    });

    it('should return a string with error message if title is not selected', () => {
      expect(validateTitle('')).toMatch('guests.error.title.empty');
    });

    it('should return a string with error message if incorrect phone format provided', () => {
      expect(validatePhoneNumber('1111111111111a', 'PhoneError')).toMatch('PhoneError');
      expect(validatePhoneNumber('a4awreszfdfsdfzg4', 'PhoneError')).toMatch('PhoneError');
      expect(validatePhoneNumber('!2@£stgdf84', 'PhoneError')).toMatch('PhoneError');
      expect(validatePhoneNumber('12345', 'PhoneError')).toMatch('PhoneError');
      expect(validatePhoneNumber('1234567890123456', 'PhoneError')).toMatch('PhoneError');
    });

    it('should return undefined if correct phone format provided', () => {
      expect(validatePhoneNumber('02074851459', 'PhoneError')).toBe(undefined);
      expect(validatePhoneNumber('495361949015', 'PhoneError')).toBe(undefined);
      expect(validatePhoneNumber('6616781490', 'PhoneError')).toBe(undefined);
      expect(validatePhoneNumber('661678149011111', 'PhoneError')).toBe(undefined);
    });
  });

  describe('Password validations', () => {
    it('should return error if currentPassword is empty', () => {
      const password = '';
      expect(validateCurrentPassword(password)).toMatch(dictionaryErrors.empty);
    });

    it('should return undefined if currentPassword is not empty', () => {
      const password = 'a';
      expect(validateCurrentPassword(password)).toBe(undefined);
    });

    it('should return undefined if newPassword is valid', () => {
      expect(validateNewPassword({ newPassword: 'Password1' })).toBe(undefined);
    });

    it('should return error if newPassword doesn\'t match regex', () => {
      expect(validateNewPassword({ newPassword: 'password' })).toBe(dictionaryErrors.invalid);
      expect(validateNewPassword({ newPassword: '11111111' })).toBe(dictionaryErrors.invalid);
      expect(validateNewPassword({ newPassword: 'a' })).toBe(dictionaryErrors.invalid);
      expect(validateNewPassword({ newPassword: '[]=[;#3131;dwa' })).toBe(dictionaryErrors.invalid);
      expect(validateNewPassword({ newPassword: 'dwad[]-=3131' })).toBe(dictionaryErrors.invalid);
    });

    it('should return error if passwords do not match', () => {
      expect(validateConfirmPassword({ newPassword: 'Password1', confirmPassword: 'Password2' })).toBe(dictionaryErrors.different);
    });

    it('should return error if passwords match but they doesn\'t match regex', () => {
      expect(validateConfirmPassword({ newPassword: 'password', confirmPassword: 'password' })).toBe(dictionaryErrors.invalid);
      expect(validateConfirmPassword({ newPassword: '11111111', confirmPassword: '11111111' })).toBe(dictionaryErrors.invalid);
      expect(validateConfirmPassword({ newPassword: 'a', confirmPassword: 'a' })).toBe(dictionaryErrors.invalid);
      expect(validateConfirmPassword({ newPassword: '[]=[;#3131;dwa', confirmPassword: '[]=[;#3131;dwa' })).toBe(dictionaryErrors.invalid);
      expect(validateConfirmPassword({ newPassword: 'dwad[]-=3131', confirmPassword: 'dwad[]-=3131' })).toBe(dictionaryErrors.invalid);
    });

    it('should return error if the new password matches the current password', () => {
      expect(validateNewPassword({ currentPassword: 'Password1', newPassword: 'Password1' })).toBe(dictionaryErrors.same);
    });

    it('should return an error if the confirmation input does not match the new password', () => {
      const values = { newPassword: 'Premier1', confirmPassword: 'Premier2' };
      expect(validateConfirmPassword(values)).toBe(dictionaryErrors.different);
    });

    it('should return an error for an empty new password and valid password confirmation', () => {
      const values = { newPassword: '', confirmPassword: 'Premier2' };
      expect(validateNewPassword(values)).toBe(dictionaryErrors.invalid);
      expect(validateConfirmPassword(values)).toBe(undefined);
    });
  });

  describe('RegularGuestsForm Validation', () => {
    it('should return a string with error message if incorrect email format provided', () => {
      expect(validateEmail('1111111111111a@')).toMatch(dictionaryErrors.emailValid);
      expect(validateEmail('a4awreszfdfsdfzg4@.')).toMatch(dictionaryErrors.emailValid);
    });

    it('should return string with error message if email is 50 characters or more', () => {
      expect(validateEmail('thisismyextremelyveryabsurdlylengthyemailaddressthatihavejustcreated111@mailinator.com'))
        .toMatch(dictionaryErrors.emailMax);
    });

    it('should return undefined if correct email format provided', () => {
      expect(validateEmail('test@mailinator.com')).toBe(undefined);
      expect(validateEmail('whit111@mailinator.com')).toBe(undefined);
      expect(validateEmail('bbtester@y0pmail.com')).toBe(undefined);
    });

    it('should check email against exising guests emails', () => {
      const existingGuestsEmails = [
        'test@mailinator.com',
        'mrtest@mailinator.com',
        'happytester@mailinator.com',
      ];

      expect(validateEmail('test@mailinator.com', existingGuestsEmails, true)).toMatch(dictionaryErrors.emailExists);
      expect(validateEmail('notsohappytester@mailinator.com', existingGuestsEmails)).toBe(undefined);
    });

    it('should return a string with error message if incorrect passport number format provided', () => {
      expect(validatePassportNumber('1234567yr')).toMatch(dictionaryErrors.passport);
      expect(validatePassportNumber('')).toMatch(dictionaryErrors.passport);
    });

    it('should return undefined if correct passport number format provided', () => {
      expect(validatePassportNumber('123456789')).toBe(undefined);
      expect(validatePassportNumber('925665416')).toBe(undefined);
      expect(validatePassportNumber('927765418')).toBe(undefined);
    });
  });

  describe('PaymentCard validations', () => {
    [
      '4444333',
      'testing',
      '4444333322221110',
      '4444333322221111$',
      '!@*£&!@£ Jasdkjhs',
    ].forEach((cardNumber) => {
      it(`should return error for card number: ${cardNumber}`, () => {
        expect(validateCardNumber(cardNumber)).toBe('payment.error.invalidcard');
      });
    });

    it('should not accept empty cardNumber', () => {
      expect(validateCardNumber('')).toBe('payment.error.entercard');
    });

    [
      '4444333322221111',
      '3434 34200 0000 05',
      '3707 7777 0000 771 ',
      '1000 05000 00011',
      '3078 90123 45676',
      '5001 6300 1001321',
      '51207 9000 0000 026',
      '55734 8000 0000 034',
      '4582 6200 0000 0037',
      '4937 3700 0000 0015',
      '4508 7500 0000 0017',
      '3089 5001 0004 5005041',
      '3089500100045005041'].forEach((cardNumber) => {
      it(`should accept the ${cardNumber} card number`, () => {
        expect(validateCardNumber(cardNumber)).toBe(undefined);
      });
    });

    [{ year: '2017', month: '12' },
      { year: '2019', month: '1' },
      { year: '2018', month: '10' },
      { year: '1900', month: '9' },
    ].forEach(({ year, month }) => {
      it('should return error if expiry date is in the past', () => {
        expect(validateExpiryDate(year, month)).toBe('payment.error.past');
      });
    });

    [{ year: '2017', month: '123' },
      { year: '2019', month: 'a' },
      { year: '2018', month: undefined },
      { year: '1900', month: [] },
    ].forEach(({ year, month }) => {
      it('should not accept an expiry date with a valid month', () => {
        expect(validateExpiryDate(year, month)).toBe('payment.error.month');
      });
    });

    [{ year: '2017123', month: '12' },
      { year: 'Eleos', month: '12' },
      { year: undefined, month: '12' },
      { year: [], month: '12' },
    ].forEach(({ year, month }) => {
      it('should not accept an expiry date with a valid year', () => {
        expect(validateExpiryDate(year, month)).toBe('payment.error.year');
      });
    });

    it('should return undefined if expiry date is in the future or same month', () => {
      const current = new Date();
      const future = new Date();
      future.setDate(50);
      expect(validateExpiryDate(current.getFullYear(), current.getMonth() + 1)).toBe(undefined);
      expect(validateExpiryDate(future.getFullYear(), future.getMonth() + 1)).toBe(undefined);
    });
  });

  describe('MemorableWord validations', () => {
    it('should return error if memorable word doesn\'t pass the regex', () => {
      expect(validateMemorableWord('aaaaaaaaaaaaaa')).toBe(dictionaryErrors.memorableWord);
      expect(validateMemorableWord('111111111111')).toBe(dictionaryErrors.memorableWord);
      expect(validateMemorableWord('Password1dwa@')).toBe(dictionaryErrors.memorableWord);
      expect(validateMemorableWord('@~{}£!£(>><:~@')).toBe(dictionaryErrors.memorableWord);
      expect(validateMemorableWord('12345aP')).toBe(dictionaryErrors.memorableWord);
      expect(validateMemorableWord('1234567')).toBe(dictionaryErrors.memorableWord);
      expect(validateMemorableWord(null)).toBe(dictionaryErrors.memorableWord);
      expect(validateMemorableWord(undefined)).toBe(dictionaryErrors.memorableWord);
    });

    it('should return undefined if memorable word passes the regex', () => {
      expect(validateMemorableWord('Password1')).toBe(undefined);
    });
  });
});
