import * as config from '../config';
const baseUrl = config.SERVICE_URL;

const submitOrder = async (
  userId,
  { orderList, contactPhone, contactName, ccInfo }
) => {
  try {
    const invoice = {
      userId,
      orderList,
      contactPhone,
      contactName,
      ccInfo,
    };
    const result = await fetch(`${baseUrl}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(invoice),
    });

    return result.json();
  } catch (err) {
    throw err;
  }
};

const service = { submitOrder };
export default service;
