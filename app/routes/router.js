import express from 'express';
const router = express.Router();

import ServerConfig from '../config/ServerConfig.js';
const URL = ServerConfig.URL;

router.use(express.static('public'));
router.use('/bootstrap', express.static('node_modules/bootstrap/dist'));

router.get('/', (req, res) => {
  res.json({
    'All Items': `${URL}/item`,
    'All Anvils': `${URL}/item/anvil`,
    'All Encabulators': `${URL}/item/encabulator`,
    'All Leisure Items': `${URL}/item/leisure`,
    'All Miracle Remedies': `${URL}/item/medicine`,
  });
});

import itemRoutes from './api/itemRoutes.js';
router.use('/item', itemRoutes);

import userRoutes from './api/userRoutes.js';
router.use('/user', userRoutes);

router.get('*', (req, res) => {
  switch(req.url) {
    case '/favicon.ico':
      res.end();
      break;
    default:
      res.status(404).render('pages/404', {
        title: '404 Error',
        name: 'ACME Corportaion',
      });
  }
});

export default router;
