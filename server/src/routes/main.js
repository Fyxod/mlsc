import express from 'express';
import checkAuth from '../middlewares/auth.js';
import Form from '../models/forms.js';

const router = express.Router();

router.get('/admin', checkAuth, async (req, res) => {
    if (!req.user) {
        return res.redirect('/admin/login');
    }
    const responses = await Form.find();
    return res.render('admin', { error: null, responses });
});

export default router;
