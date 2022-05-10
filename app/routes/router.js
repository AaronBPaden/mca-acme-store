import express from 'express';
const router = express.Router();

import ServerConfig from '../config/ServerConfig.js';
const URL = ServerConfig.URL;

router.use(express.static('public'));
router.use('/bootstrap', express.static('node_modules/bootstrap/dist'));

router.get('/', (req, res) => {
    res.json({
        'All Items': `${URL}/item`
    });
});

import itemRoutes from './api/itemRoutes.js';
router.use('/item', itemRoutes);

// router.get('/single-item', (req, res) => {
//     res.render('pages/single-item', {
//         title: 'Single Item Page',
//         name: 'ACME Corporation',
//     });
// });

// router.get('/about', (req, res) => {
//     res.render('pages/about', {
//         title: 'Single Item Page',
//         name: 'ACME Corporation',
//     });
// });

// router.get('/items', (req, res) => {
//     res.render('pages/items', {
//         title: 'Item Page',
//         name: 'ACME Corporation',
//     });
// });

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
