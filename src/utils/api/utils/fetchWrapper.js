export default async (url, params = {}) => {
  const { method = 'GET', ...otherParams } = params;
  const { headers = {} } = otherParams;
  const resource = await fetch(url, {
    method,
    ...otherParams,
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
  });
  const isError = !resource.ok;
  const response = await resource.json();

  if (isError) {
    return Promise.reject(response);
  }
  return Promise.resolve(response);
};
