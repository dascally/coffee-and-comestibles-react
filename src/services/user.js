const baseUrl = process.env.REACT_APP_SERVICE_URL;

const getRewards = async (userId, jwt) => {
  try {
    const result = await fetch(`${baseUrl}/users/${userId}`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });

    if (!result.ok) throw new Error('Error fetching user data.');

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

    if (!savedOrders.ok) throw new Error('Error fetching user saved orders.');

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

    if (!savedPayments.ok)
      throw new Error('Error fetching user saved payments.');

    return savedPayments.json();
  } catch (err) {
    throw err;
  }
};

const service = { getRewards, getSavedOrders, getSavedPayments };
export default service;
