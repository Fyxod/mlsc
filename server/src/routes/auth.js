import bcrypt from 'bcrypt';
import Admin from '../models/user.js';
import { setUser } from '../services/jwtfuncs.js';
import { z } from 'zod';
import express from 'express';

const adminSchema = z.object({
    username: z.string().min(3, { message: 'Username must be at least 3 characters long.' }).max(50, { message: 'Username must be at most 50 characters long.' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long.' }),
});

const router = express.Router();

router.get('/tempreg', (req, res) => {
    res.render('register', { error: null });
});

router.post('/tempreg', async (req, res) => {
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
        });
        await admin.save();
        console.log('Admin registered successfully');
        res.redirect('/admin/login');
    } catch (error) {
        res.render('register', { error: error.errors[0].message });
    }
});

router.get('/admin/login', (req, res) => {
    res.render('login', { error: null });
});

router.post('/admin/login', async (req, res) => {
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
        const token = setUser({ id: admin._id, username: admin.username });

        res.cookie('token', token, { httpOnly: true });
        res.redirect('/admin');
    } catch (error) {
        console.log(error);
        res.render('login', { error: error.errors[0].message });
    }
});

router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/admin/login');
});

export default router;
