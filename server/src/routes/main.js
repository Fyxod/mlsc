import express from 'express';
const router = express.Router();

router.get('/team', (req, res) => {
    res.render('team');
});

router.get('/event', (req, res) => {
    res.render('events');
});

export default router;