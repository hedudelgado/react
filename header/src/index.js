import headerConfig from './config';

const header = new window.Header(headerConfig);
document.body.appendChild(header.element);

const storage = {
  set: (key, item) => sessionStorage.setItem(key, JSON.stringify(item)),
  get: key => JSON.parse(sessionStorage.getItem(key)),
  remove: key => sessionStorage.removeItem(key),
};

const handleMessage = ({ data }) => {
  const {
    action,
    idToken,
    isBusiness = false,
    email,
  } = data;

  if (action === 'authentication') {
    storage.set('id_token', idToken);
    storage.set('email', email);
    fetch(`${headerConfig.config.authentication.microserviceUri}/customers/hotels/${email}?business=${isBusiness}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(response);
        } else return response.json();
      })
      .then((profile) => {
        storage.set('profile', profile);
        window.parent.postMessage({
          action: 'userLoggedIn',
          profile: JSON.stringify(profile),
          isBusiness,
        }, '*');
      })
      .catch(e => console.log(e)); // eslint-disable-line no-console
  }
  if (action === 'logout') {
    storage.remove('id_token');
    storage.remove('profile');
  }
};

window.addEventListener('message', handleMessage, false);

const decodeToken = token => JSON.parse(token.split('.').map(piece => piece.replace(/-/g, '+')).map(piece => piece.replace(/_/g, '/')).map(atob)[1]);

document.addEventListener('DOMContentLoaded', () => {
  const idToken = storage.get('id_token');
  if (idToken) {
    const { isBusiness, exp } = decodeToken(idToken);
    if (new Date(exp * 1000) > new Date()) {
      window.parent.postMessage({
        action: 'userLoggedIn',
        profile: JSON.stringify(storage.get('profile')),
        isBusiness: isBusiness || false,
      }, '*');
    }
  }
});
