import express from 'express';
const router = express.Router();

router.get('/team', (req, res) => {
    res.render('team');
});

router.get('/event', (req, res) => {
    res.render('events');
});
router.get('/form', (req, res) => {
    res.render('form');
});

export default router;