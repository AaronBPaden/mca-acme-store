import ApiConfig from '../config/ApiConfig';
import { getAPIAsync } from './getAPI';
import axios from 'axios';

const checkCookies = (cookies) => {
  return (cookies['acme-user'] && cookies['acme-user'].username && cookies['acme-user'].token)
}

const postPrivate = async (path, cookies = null, data = {}) => {
  return await axios.post(`${ApiConfig.URL}/${path}`, {
    username: cookies ? cookies['acme-user'].username : null,
    token: cookies ? cookies['acme-user'].token : null,
    ...data
  });
}

const getQuantity = async (cookies, item) => {
  if (!checkCookies(cookies)) return;
  let res = await postPrivate('user/getItemQuantity', cookies, {itemId: item});
  return res.data.quantity;
}

const addToCart = async (cookies, item) => {
  if (!checkCookies(cookies)) throw new Error("Invalid cookie");
  await postPrivate('user/addCartItem', cookies, {itemId: item});
}

const removeFromCart = async (cookies, item) => {
  if (!checkCookies(cookies)) throw new Error("Invalid cookie");
  await postPrivate('user/removeCartItem', cookies, {itemId: item});
}

const validate = async (cookies) => {
  if (!checkCookies(cookies)) throw new Error("Invalid cookie");
  return await postPrivate('user/validate', cookies);
}

const getUserCart = async (cookies) => {
  if (!checkCookies(cookies)) throw new Error("Invalid cookie");
  const cartIds = (await postPrivate('user/getUserCart', cookies)).data.cart;
  return await Promise.all(cartIds.map(async (el) => {
    return {
      ...(await getAPIAsync(`item/${el}`)).data,
      quantity: await getQuantity(cookies, el)
    }
  }));
};

export {
  postPrivate,
  getQuantity,
  addToCart,
  removeFromCart,
  validate,
  getUserCart,
}
