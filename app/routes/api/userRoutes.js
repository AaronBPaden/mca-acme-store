import express from 'express';
const router = express.Router();

import { UserDao as dao } from '../../daos/dao.js';

router.post('/register', (req, res) => {
  dao.create(req, res);
});

export default router;
