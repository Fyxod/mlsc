import bcrypt from 'bcrypt';
import checkAuth from '../middlewares/auth.js';
import { setUser } from '../services/jwtfuncs.js';
import { z } from 'zod';
import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const adminSchema = z.object({
    username: z.string().min(3, { message: 'Username must be at least 3 characters long.' }).max(50, { message: 'Username must be at most 50 characters long.' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long.' }),
});

const router = express.Router();

router.get('/tempreg', (req, res) => {
    if(!process.env.NODE_ENV || process.env.NODE_ENV === 'prod') {
        return res.redirect('/404');
    }
    return res.render('register', { error: null });
});

router.post('/tempreg', async (req, res) => {
    if(!process.env.NODE_ENV || process.env.NODE_ENV === 'prod') {
        return res.redirect('/404');
    }
    try {
        const { username, password } = adminSchema.parse(req.body);
        const hash = await bcrypt.hash(password, 12);
        
        const findUrl = process.env.DATA_API_URL + 'findOne';
        const apiKey = process.env.DATA_API_KEY;
        const findData = {
            dataSource: 'mlscCluster',
            database: 'website',
            collection: 'admins',
            filter: { username }
        };

        const adminCheck = await axios.post(findUrl, findData, {
            headers: {
                'Content-Type': 'application/ejson',
                'Accept': 'application/json',
                'apiKey': apiKey
            }
        });

        if (adminCheck?.data.document) {
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
                'apiKey': apiKey
            }
        })
            .then(response => {
                console.log('Document inserted:', response.data);
            })
            .catch(error => {
                console.error('Error inserting document:', error);
            });

        console.log('Admin registered successfully');
        return res.redirect('/ambani/login');
    } catch (error) {
        res.render('register', { error: error.errors[0].message });
    }
});

router.get('/ambani/login', checkAuth, (req, res) => {
    if (req.user) {
        return res.redirect('/ambani')
    }
    return res.render('login', { error: null });
});

router.post('/ambani/login', async (req, res) => {
    try {
        const { username, password } = adminSchema.parse(req.body);

        const findUrl = process.env.DATA_API_URL + 'findOne';
        const apiKey = process.env.DATA_API_KEY;
        const findData = {
            dataSource: 'mlscCluster',
            database: 'website',
            collection: 'admins',
            filter: { username }
        };

        const admin = await axios.post(findUrl, findData, {
            headers: {
                'Content-Type': 'application/ejson',
                'Accept': 'application/json',
                'apiKey': apiKey
            }
        });

        if (!admin?.data.document) {
            return res.render("login", { error: "Invalid username or password." });
        }
        const validPassword = await bcrypt.compare(password, admin.data.document.password);
        if (!validPassword) {
            return res.render("login", { error: "Invalid username or password." });
        }
        const token = setUser({ id: admin._id, username: admin.username });

        res.cookie('token', token, { httpOnly: true });
        res.redirect('/ambani');
    } catch (error) {
        console.log(error);
        return res.render('login', { error: error.errors[0].message });
    }
});

router.post('/logout', (req, res) => {
    res.clearCookie('token');
    return res.redirect('/ambani/login');
});

export default router;
