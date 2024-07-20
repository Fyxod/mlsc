import express from 'express';
import checkAuth from '../middlewares/auth.js';
import axios from 'axios';

const router = express.Router();

router.get('/ambani', checkAuth, async (req, res) => {
    if (!req.user) {
        return res.redirect('/ambani/login');
    }try{
        const findUrl = process.env.DATA_API_URL + 'find';
        const findOneUrl = process.env.DATA_API_URL + 'findOne';
        const apiKey = process.env.DATA_API_KEY;
        const findAdminData = {
            dataSource: 'mlscCluster',
                database: 'website',
                collection: 'admins',
                filter: { _id: req.user._id }
            }

            const findAdmin = await axios.post(findOneUrl, findAdminData, {
                headers: {
                    'Content-Type': 'application/ejson',
                    'Accept': 'application/json',
                    'apiKey': apiKey
                }
            });
            if(!findAdmin.data.document){
                return res.redirect('/ambani/login');
            }
            const findData = {
                dataSource: 'mlscCluster',
                database: 'website',
                collection: 'responses'
            };

            const findResponse = await axios.post(findUrl, findData, {
                headers: {
                    'Content-Type': 'application/ejson',
                    'Accept': 'application/json',
                    'apiKey': apiKey
                }
            });
            const responses = findResponse.data.documents;

            return res.render('admin', { error: null, responses, regActive: findAdmin.data.document.regActive });
        } catch (error) {
            // Handle the error here
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    });


router.post('/ambani', checkAuth, async (req, res) => {
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
            filter: { _id: req.user._id },
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

export default router;
