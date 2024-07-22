import axios from 'axios';
import express from 'express';
import checkAuth from '../middlewares/auth.js';
import getAdmin from '../utils/getAdmin.js';
import getResponses from '../utils/getResponses.js';

const router = express.Router();

router.route('/ambani')
    .get(checkAuth, async (req, res) => {
        if (!req.user) {
            return res.redirect('/ambani/login');
        }
        try {
            const findAdmin = await getAdmin(req.user.username);
            if (!findAdmin) {
                res.clearCookie('token');
                return res.redirect('/ambani/login');
            }
            const responses = await getResponses();

            return res.render('admin', { error: null, responses, regActive: findAdmin.regActive });
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
            const updateUrl = process.env.DATA_API_URL + 'updateOne';
            const apiKey = process.env.DATA_API_KEY;
            const updateData = {
                dataSource: 'mlscCluster',
                database: 'website',
                collection: 'admins',
                filter: {
                    "_id": { "$oid": req.user._id }
                },
                update: {
                    $set: { regActive }
                }
            };
            const updateResponse = await axios.post(updateUrl, updateData, {
                headers: {
                    'Content-Type': 'application/ejson',
                    'Accept': 'application/json',
                    'apiKey': apiKey
                }
            });

            console.log('Document updated:', updateResponse.data);

            return res.redirect('/ambani');
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    });

router.route('/ambani/response/:_id')
    .get(checkAuth, async (req, res) => {
        if (!req.user) {
            return res.redirect('/ambani/login');
        }
        try {
            const { _id } = req.params;
            const updateUrl = process.env.DATA_API_URL + 'findOne';
            const apiKey = process.env.DATA_API_KEY;
            const updateData = {
                dataSource: 'mlscCluster',
                database: 'website',
                collection: 'responses',
                filter: {
                    "_id": { "$oid": _id }
                }
            };
            const response = await axios.post(updateUrl, updateData, {
                headers: {
                    'Content-Type': 'application/ejson',
                    'Accept': 'application/json',
                    'apiKey': apiKey
                }
            });
            console.log(response.data.document);
            if (!response?.data.document) {
                return res.send('Response not found');
            }
            return res.render('response', { response: response.data.document });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    })
    
    .delete(checkAuth, async (req, res) => {
        if (!req.user) {
            return res.redirect('/ambani/login');
        }
        try {
            const { _id } = req.params;
            const deleteUrl = process.env.DATA_API_URL + 'deleteOne';
            const apiKey = process.env.DATA_API_KEY;
            const deleteData = {
                dataSource: 'mlscCluster',
                database: 'website',
                collection: 'responses',
                filter: {
                    "_id": { "$oid": _id }
                }
            };
            await axios.post(deleteUrl, deleteData, {
                headers: {
                    'Content-Type': 'application/ejson',
                    'Accept': 'application/json',
                    'apiKey': apiKey
                }
            });
            return res.redirect('/ambani');
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    });

export default router;
