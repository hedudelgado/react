const realms = {
  leisure: 'bart-users-staging',
  business: 'bb-bart-users',
};

const auth0Domain = 'wbtest.eu.auth0.com';

const handleMessage = ({ data }) => {
  const {
    action,
    username,
    password,
    isBusiness,
  } = data;
  if (action === 'login') {
    const webAuth = new window.auth0.WebAuth({
      domain: auth0Domain,
      clientID: 'trjjzDnICoHxVrIQnizPKqei9Ucmy0Ch',
      redirectUri: window.location.href,
    });
    webAuth.login({
      audience: `https://${auth0Domain}/userinfo`,
      realm: realms[isBusiness ? 'business' : 'leisure'],
      username,
      password,
      responseType: 'token id_token',
      scope: 'openid profile read:data',
    }, (error) => {
      if (error) {
        window.parent.postMessage({
          action: 'loginError',
          error,
          isBusiness,
        }, '*');
      }
    });
  }
  if (action === 'logout') {
    window.parent.postMessage({
      action: 'logout',
    });
  }
};

window.addEventListener('message', handleMessage, false);

const extractProfile = token => JSON.parse(token.split('.').map(piece => piece.replace(/-/g, '+')).map(piece => piece.replace(/_/g, '/')).map(atob)[1]);

document.addEventListener('DOMContentLoaded', () => {
  const { hash } = window.location;
  if (hash) {
    const idToken = hash
      .split('&')
      .find(param => param.indexOf('id_token=') === 0)
      .replace('id_token=', '');
    const { name: email, isBusiness } = extractProfile(idToken);
    window.parent.postMessage({
      action: 'authentication',
      idToken,
      email,
      isBusiness,
    }, '*');
  }
}, false);
