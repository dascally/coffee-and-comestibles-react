const baseUrl = process.env.REACT_APP_SERVICE_URL;

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
