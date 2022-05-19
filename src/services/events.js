const baseUrl = process.env.REACT_APP_SERVICE_URL;

const getEvents = async () => {
  try {
    const events = await fetch(`${baseUrl}/events`);
    return events.json();
  } catch (err) {
    throw err;
  }
};

const service = { getEvents };
export default service;
