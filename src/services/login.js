const baseUrl = process.env.REACT_APP_SERVICE_URL;

const login = async (email, password) => {
  try {
    const response = await fetch(`${baseUrl}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message);
    }

    return response.json();
  } catch (err) {
    throw err;
  }
};

const service = { login };
export default service;
