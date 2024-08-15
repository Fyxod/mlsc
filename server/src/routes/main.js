import express from 'express';
import checkAuth from '../middlewares/auth.js';
import Form from '../models/forms.js';
import Admin from '../models/user.js';

const router = express.Router();

router.route('/ambani')
    .get(checkAuth, async (req, res) => {
        if (!req.user) {
            return res.redirect('/ambani/login');
        }
        try {
            const admin = await Admin.findById(req.user._id);
            if (!admin) {
                res.clearCookie('token');
                return res.redirect('/ambani/login');
            }
            const responses = await Form.find();

            return res.render('admin', { error: null, responses, regActive: admin.regActive });


        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    })

    .post(checkAuth, async (req, res) => {
        if (!req.user) {
            return res.redirect('/ambani/login');
        }
        try {

            let { regActive } = req.body;

            if (!regActive) {
                regActive = false;
            }
            const admin = await Admin.findById(req.user._id);
            admin.regActive = regActive;
            await admin.save();
            return res.redirect('/ambani');
        } catch (error) {
            console.error(error);
            return res.status(500).send('Internal Server Error' );
        }
    });

router.route('/ambani/response/:_id')
    .get(checkAuth, async (req, res) => {
        if (!req.user) {
            return res.redirect('/ambani/login');
        }
        try {
            const response = await Form.findById(req.params._id);
            if (!response) {
                return res.status(404).send('Response not found');
            }
            return res.render('response', { response });
        } catch (error) {
            console.error(error);
            return res.status(500).send('Internal Server Error' );
        }
    })

    .delete(checkAuth, async (req, res) => {
        if (!req.user) {
            return res.redirect('/ambani/login');
        }
        try {
            const response = await Form.findByIdAndDelete(req.params._id);
            if (!response) {
                return res.status(404).send('Response not found');
            }
            return res.redirect('/ambani');
        } catch (error) {
            console.error(error);
            return res.status(500).send('Internal Server Error');
        }
    });

export default router;