import * as config from '../config';
const baseUrl = config.SERVICE_URL;

const register = async ({ firstName, lastName, email, password }) => {
  try {
    const newUser = { firstName, lastName, email, password };

    const res = await fetch(`${baseUrl}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    });

    if (!res.ok) {
      const body = await res.json();
      const err = new Error(body.message ?? 'Error registering new account.');
      err.status = res.status;
      throw err;
    }

    const user = await res.json();
    return user;
  } catch (err) {
    throw err;
  }
};

const deleteAccount = async (userId, jwt) => {
  try {
    const result = await fetch(`${baseUrl}/users/${userId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${jwt}` },
    });

    if (result.status !== 204 && result.status !== 404) {
      const err = new Error('Error deleting user account.');
      err.status = result.status;
      throw err;
    }
  } catch (err) {
    throw err;
  }
};

const updateAccount = async (
  userId,
  jwt,
  { firstName, lastName, email, password }
) => {
  try {
    const newUser = {};
    if (firstName) newUser.firstName = firstName;
    if (lastName) newUser.lastName = lastName;
    if (email) newUser.email = email;
    if (password) newUser.password = password;

    const res = await fetch(`${baseUrl}/users/${userId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });

    if (!res.ok) {
      const body = await res.json();
      const err = new Error(body.message ?? 'Error updating account info.');
      err.status = res.status;
      throw err;
    }

    const user = await res.json();
    return user;
  } catch (err) {
    throw err;
  }
};

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

const deleteSavedPayment = async (userId, jwt, paymentId) => {
  try {
    const result = await fetch(
      `${baseUrl}/users/${userId}/savedPayments/${paymentId}`,
      {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${jwt}` },
      }
    );

    if (result.status !== 204 && result.status !== 404) {
      const err = new Error('Error deleting saved payment.');
      err.status = result.status;
      throw err;
    }
  } catch (err) {
    throw err;
  }
};

const editSavedPayment = async (
  userId,
  jwt,
  paymentId,
  { billingName, streetAddress, city, state, zipCode }
) => {
  try {
    const newPayment = {
      billingName,
      streetAddress,
      city,
      state,
      zipCode,
    };

    const result = await fetch(
      `${baseUrl}/users/${userId}/savedPayments/${paymentId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(newPayment),
      }
    );

    if (!result.ok) {
      const err = new Error('Error editing payment.');
      err.status = result.status;
      throw err;
    }

    return result.json();
  } catch (err) {
    throw err;
  }
};

const addSavedOrder = async (userId, jwt, { name, orderList }) => {
  try {
    const order = { name, orderList };

    const result = await fetch(`${baseUrl}/users/${userId}/savedOrders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(order),
    });

    if (!result.ok) {
      const err = new Error('Error adding new saved order.');
      err.status = result.status;
      throw err;
    }

    return result.json();
  } catch (err) {
    throw err;
  }
};

const deleteSavedOrder = async (userId, jwt, orderId) => {
  try {
    const result = await fetch(
      `${baseUrl}/users/${userId}/savedOrders/${orderId}`,
      {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${jwt}` },
      }
    );

    if (result.status !== 204 && result.status !== 404) {
      const err = new Error('Error deleting saved order.');
      err.status = result.status;
      throw err;
    }
  } catch (err) {
    throw err;
  }
};

const service = {
  register,
  deleteAccount,
  updateAccount,
  getRewards,
  getSavedOrders,
  getSavedPayments,
  addSavedPayment,
  deleteSavedPayment,
  editSavedPayment,
  addSavedOrder,
  deleteSavedOrder,
};
export default service;
