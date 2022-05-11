const baseUrl = process.env.REACT_APP_SERVICE_URL;

const getRewards = async (userId, jwt) => {
  try {
    const result = await fetch(`${baseUrl}/users/${userId}`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });

    if (!result.ok) {
      const err = new Error('Error fetching user data.');
      err.status = result.status;
      throw err;
    }

    const user = await result.json();
    return user.rewards;
  } catch (err) {
    throw err;
  }
};

const getSavedOrders = async (userId, jwt) => {
  try {
    const savedOrders = await fetch(`${baseUrl}/users/${userId}/savedOrders`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });

    if (!savedOrders.ok) {
      const err = new Error('Error fetching user saved orders.');
      err.status = savedOrders.status;
      throw err;
    }

    return savedOrders.json();
  } catch (err) {
    throw err;
  }
};

const getSavedPayments = async (userId, jwt) => {
  try {
    const savedPayments = await fetch(
      `${baseUrl}/users/${userId}/savedPayments`,
      {
        headers: { Authorization: `Bearer ${jwt}` },
      }
    );

    if (!savedPayments.ok) {
      const err = new Error('Error fetching user saved payments.');
      err.status = savedPayments.status;
      throw err;
    }

    return savedPayments.json();
  } catch (err) {
    throw err;
  }
};

const addSavedPayment = async (
  userId,
  jwt,
  { cardNumber, securityCode, billingName, streetAddress, city, state, zipCode }
) => {
  try {
    const newPayment = {
      cardNumber,
      securityCode,
      billingName,
      streetAddress,
      city,
      state,
      zipCode,
    };
    const result = await fetch(`${baseUrl}/users/${userId}/savedPayments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(newPayment),
    });

    if (!result.ok) {
      const err = new Error('Error adding new payment.');
      err.status = result.status;
      throw err;
    }

    return result.json();
  } catch (err) {
    throw err;
  }
};

const service = {
  getRewards,
  getSavedOrders,
  getSavedPayments,
  addSavedPayment,
};
export default service;
