# PI Account Settings

The Account Settings is part of the PI Account product. It is the group of pages which contain the customer’s personal booking preferences as groups of forms. The selected values of these forms will be used as defaults during the customer’s booking journey when they are logged in on the website.

## Netlify URLs 

Every time we merge a Pull Request to either `develop` or `master` branches, the following respected URL is updated with the latest merged code.

`master`: https://pi-account-settings.netlify.com/en

`develop`: https://develop--pi-account-settings.netlify.com/en

## Instructions

Clone this project

```bash
git clone git@github.com:whitbread-eos/pi-account-settings.git <projectName>
```

Install dependencies

```bash
npm install
```

Start local server at http://localhost:3000

```bash
npm start
```

Build production ready build

```bash
npm run build
npm run serve
```

Run tests (with and without coverage)

```bash
npm test
npm run test:coverage
```

Run e2e tests (headless and with ui)

```bash
npm run e2e
npm run e2e:ui
```

Run linting checks

```bash
npm run lint
```

See the supported browser list

```bash
npx browserslist
```

Create new component

```bash
npm run create-component <componentName>
```

AEM Package Creation
```bash
npm run aem-build
```

## Storybook

Launch storybook server at http://localhost:9009

```bash
npm run storybook
```

## Contribution guidelines

Please adhere to the following guidelines when contributing to this repository.

- Create feature branch from `develop`
- Pull request to merge back to `develop`
- Requires approval on the PR from at least one developer before merging
- Merge `develop` to feature branch often to resolve conflicts
- Edit `CHANGELOG.md` with a description of changes / additions
  - Ensure JIRA ticket reference is included in change log updates
- Increment `package.json` version according to semver rules
