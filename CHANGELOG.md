### `CHANGELOG`
---
## 🔖 `1.1.0-dev`
### Minor Changes

### Patch
- [dev.1] [DDT-7998] No meals payload fix
- [dev.2] [DDT-8001] Business users don't have the option to delete their profile

---
## 🔖 `1.1.0`
### Minor Changes
- [rc.2] [DDT-7960] Added version stamping to distribution files
- [rc.5] [DDT-7955] Fix for analytic track events firing too many times
  
### Patch
- [rc.1] [DDT-7949] Getting fallback data from profile if user data is missing from newsletter
- [rc.3] [DDT-7950] Added correct mock dictionary keys for mobile and telephone numbers. Refactored class
- [rc.4] [DDT-7946] Redirect to homepage and log out after deleting profile
- [rc.6]  Update git user
- [rc.7] [DDT-7967] incorrectly saved/displayed email preferences
- [rc.8] Reduced allowed phone number length to match MS validation
- [rc.9] [DDT-7974] use hotelBrand from config if not available in profile
- [rc.10] [DDT-7982] Allow "twin" option in the saved booking preferences
- [rc.11] [DDT-7990] Set analyticsData.optIn data when newsletter data is received
- [rc.12] Newsletter settings feature switch

---
## 🔖 `1.0.0`
### Minor Changes
- [dev.12] [DDT-7899, DDT-7931] Add default values for missing roomRequirements values
- [dev.11] [DDT-7930] Added additional phone number field to user profile form
- [dev.8] [DDT-7920] log out the user when the session is no longer valid
- [dev.7] [DDT-7897] Components do not update when refreshing page - bug fix
- [dev.6] [PI-4826] Added Manage Permissions component
- [dev.5] [DDT-7870] Using dictionary keys for Room Type, Cot Required and Meal Options
- [dev.4] [DDT-7871] Removed page status component
- [dev.3] [DDT-7832] Move config/application settings to config
- [dev.2] [DDT-7801] Listen to header event for authentication + profile
- [dev.1] Add AEM Package Build scripts

### Patch
- [dev.10] [DDT-7883] update the style of the input fields
- [dev.9] [DDT-7922] Restored missing profile to resolve account deletion bug
- [dev.6] [DDT-7870] Fixing typo with getJsonItem('environment)

---
## 🔖 `0.9.0`
- Integrate application with AEM

---
## 🔖 `0.8.1`
- Fix `id_token` discrepancy for non-Business accounts
- Introduce Helper functions

---
## 🔖 `0.8.0`
- Initial scaffolding setup
- Simplify form validation functions
- Improve the Delete Regular Guest logic
- Fix the typo on license.txt filename
- Abstract the layout components to their own folder

---
## 🔖 `0.7.5`
- Refactoring Regular Guest Form to follow new way of using Formik

---
## 🔖 `0.7.3`
- Replacing mocked APIs with MS APIs

---
## 🔖 `0.7.0`
- Adding extras preferences functionality

---
## 🔖 `0.6.1`
- Adding delete profile redirect

---
## 🔖 `0.6.0`
- Adding room requirements functionality

---
## 🔖 `0.4.0`
- Adding edit guest functionality

---
## 🔖 `0.1.0`
- Initial scaffolding setup
