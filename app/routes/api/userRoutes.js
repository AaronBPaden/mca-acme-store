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

export default router;
