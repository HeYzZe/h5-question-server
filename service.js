const fetch = require('node-fetch-commonjs');

const baseUrl = 'http://api.letspayfast.com'

const options = {
  'Content-Type': 'application/x-www-form-urlencoded',
  method: 'POST'
}

exports.http = (url, opt) => {
  const newOptions = {
    ...options,
    ...opt,
  }
  return fetch(`${baseUrl}/${url}`, newOptions).then((response) => {
    return response.json()
  }).catch((err) => {
    console.error(err, "error!!!", new Date().toLocaleString())
    return err;
  })
}
