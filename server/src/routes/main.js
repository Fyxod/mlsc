import express from 'express';
import checkAuth from '../middlewares/auth.js';
import Form from '../models/forms.js';

const router = express.Router();

router.get('/team', (req, res) => {
    res.render('team');
});

router.get('/event', (req, res) => {
    res.render('events');
});

router.get('/admin', checkAuth, async (req, res) => {
    if (!req.user) {
        res.redirect('/admin/login');
    }
    const responses = await Form.find();
    res.render('admin', { error: null, responses });
});

export default router;
