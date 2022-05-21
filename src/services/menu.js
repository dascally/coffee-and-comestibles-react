import * as config from '../config';
const baseUrl = config.SERVICE_URL;
console.log('url', baseUrl);

const getMenu = async () => {
  try {
    const menu = await fetch(`${baseUrl}/menu`);
    return menu.json();
  } catch (err) {
    throw err;
  }
};

const service = { getMenu };
export default service;
