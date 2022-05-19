import express from 'express';
const router = express.Router();

import { UserDao as dao } from '../../daos/dao.js';

router.post('/register', (req, res) => {
  dao.create(req, res);
});

router.post('/validate', (req, res) => {
  dao.validateLogin(req, res);
});

router.post('/login', (req, res) => {
  dao.login(req, res);
});

router.post('/addCartItem', (req, res) => {
  dao.addCartItem(req, res);
});

router.post('/getItemQuantity', (req, res) => {
  dao.getItemQuantity(req, res);
});

router.post('/getUserCart', (req, res) => {
  dao.getUserCart(req, res);
});

export default router;
