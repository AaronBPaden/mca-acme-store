import ApiConfig from '../config/ApiConfig';
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

const validate = async (cookies) => {
  if (!checkCookies(cookies)) throw new Error("Invalid cookie");
  return await postPrivate('user/validate', cookies);
}

export {
  postPrivate,
  getQuantity,
  addToCart,
  validate,
}
