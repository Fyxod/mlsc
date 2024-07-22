import bcrypt from 'bcrypt';
import axios from 'axios';
import express from 'express';
import dotenv from 'dotenv';
import checkAuth from '../middlewares/auth.js';
import { setUser } from '../utils/jwtfuncs.js';
import getAdmin from '../utils/getAdmin.js';
import { adminSchema } from '../utils/zodSchemas.js';

const router = express.Router();
dotenv.config();

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

            const adminCheck = await getAdmin(username);

            if (adminCheck) {
                return res.render('register', { error: 'Admin with this name is already registered' });
            }

            const insertData = {
                dataSource: 'mlscCluster',
                database: 'website',
                collection: 'admins',
                document: {
                    username,
                    password: hash,
                    regActive: false
                }
            };

            const insertUrl = process.env.DATA_API_URL + 'insertOne';
            axios.post(insertUrl, insertData, {
                headers: {
                    'Content-Type': 'application/ejson',
                    'Accept': 'application/json',
                    'apiKey': process.env.DATA_API_KEY
                }
            })
                .then(response => {
                    console.log('Admin registered successfully', response.data);
                })
                .catch(error => {
                    console.error('Error inserting document:', error);
                });
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

            const admin = await getAdmin(username);
            if (!admin) {
                return res.render("login", { error: "Invalid username or password." });
            }
            const validPassword = await bcrypt.compare(password, admin.password);
            if (!validPassword) {
                return res.render("login", { error: "Invalid username or password." });
            }
            const token = setUser({ _id: admin._id, username: admin.username });

            res.cookie('token', token, { httpOnly: true });
            res.redirect('/ambani');
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
