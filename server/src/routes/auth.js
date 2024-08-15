import bcrypt from 'bcrypt';
import Admin from '../models/user.js';
import checkAuth from '../middlewares/auth.js';
import { setUser } from '../utils/jwtfuncs.js';
import { adminSchema } from '../utils/zodSchemas.js';
import express from 'express';

const router = express.Router();
router.route('/tempreg')
    .get((_, res) => {
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'prod') {
            return res.redirect('/404');
        }
        return res.render('register', { error: null });
    })

    .post(async (req, res) => {
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'prod') {
            return res.redirect('/404');
        }
        try {
            const { username, password } = adminSchema.parse(req.body);
            const hash = await bcrypt.hash(password, 12);
            const adminCheck = await Admin.findOne({ username });
            if (adminCheck) {
                return res.render('register', { error: 'Admin with this name is already registered' });
            }
            const admin = new Admin({
                username,
                password: hash,
                regActive: false
            });

            await admin.save();
            console.log('Admin registered successfully');

            return res.redirect('/ambani/login');
        } catch (error) {
            res.render('register', { error: error.errors[0].message });
        }
    });

router.route('/ambani/login')
    .get(checkAuth, (req, res) => {
        if (req.user) {
            return res.redirect('/ambani');
        }
        return res.render('login', { error: null });
    })

    .post(async (req, res) => {
        try {
            const { username, password } = adminSchema.parse(req.body);
            const admin = await Admin.findOne({ username });
            if (!admin) {
                return res.render("login", { error: "Invalid username or password." });
            }
            const validPassword = await bcrypt.compare(password, admin.password);
            if (!validPassword) {
                return res.render("login", { error: "Invalid username or password." });
            }
            const token = setUser({ _id: admin._id, username: admin.username });

            res.cookie('token', token, { httpOnly: true });
            return res.redirect('/ambani');
        } catch (error) {
            console.error(error);
            return res.render('login', { error: error.errors[0].message });
        }
    });

router.post('/logout', (_, res) => {
    res.clearCookie('token');
    return res.redirect('/ambani/login');
});

export default router;