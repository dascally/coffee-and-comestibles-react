export let SERVICE_URL;

if (process.env.NETLIFY) SERVICE_URL = process.env.REACT_APP_SERVICE_URL;
else SERVICE_URL = process.env.REACT_APP_DEV_SERVICE_URL;
