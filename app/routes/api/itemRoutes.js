"use strict";
import express from 'express';
const router = express.Router();

import { ItemDao as dao } from '../../daos/dao.js';

router.get('/', (req, res) => {
  dao.findAll(res);
});

router.get('/anvil', (req, res) => {
  dao.categoryItems(res, 'anvil');
});

router.get('/encabulator', (req, res) => {
  dao.categoryItems(res, 'encabulator');
});

router.get('/leisure', (req, res) => {
  dao.categoryItems(res, 'leisure');
});

router.get('/medicine', (req, res) => {
  dao.categoryItems(res, 'medicine');
});

router.get('/top', (req, res) => {
  dao.topItems(res);
});

router.get('/count', (req, res) => {
  dao.countAll(res);
});

router.get('/:id', (req, res) => {
  dao.findById(res, req.params.id);
});

// router.post('/create', (req, res) => {
//   dao.create(req, res);
// });

// router.patch('/update/:id', (req, res) => {
//   dao.update(req, res);
// });

export default router;
