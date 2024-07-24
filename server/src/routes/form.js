import express from 'express';
import ExcelJS from 'exceljs';
import axios from 'axios';
import sendMail from '../utils/mail.js';
import checkAuth from '../middlewares/auth.js';
import { regActive } from '../middlewares/regActive.js';
import getResponses from '../utils/getResponses.js';
import getISTDateString from '../utils/getDate.js';
import { formSchema } from '../utils/zodSchemas.js';

const router = express.Router();

router.post('/form', regActive, async (req, res) => {
    try {
        const response = formSchema.parse(req.body);

        const findUrl = process.env.DATA_API_URL + 'findOne';
        const insertUrl = process.env.DATA_API_URL + 'insertOne';
        const apiKey = process.env.DATA_API_KEY;
        
        const findData = {
            dataSource: 'mlscCluster',
            database: 'website',
            collection: 'responses',
            filter: {
                $or: [
                    { email: response.email },
                    { phoneNumber: response.phoneNumber }
                ]
            }
        };

        const findResponse = await axios.post(findUrl, findData, {
            headers: {
                'Content-Type': 'application/ejson',
                'Accept': 'application/json',
                'apiKey': apiKey
            }
        });

        if (findResponse?.data.document) {
            console.log("Already submitted");
            return res.redirect('/?flash=Form%20already%20submitted%20with%20this%20email%20or%20phone%20number#forms');
        } else {
            console.log('No document matches the provided query.');
        }

        response.timeStamp = getISTDateString();

        const insertData = {
            dataSource: 'mlscCluster',
            database: 'website',
            collection: 'responses',
            document: response
        };

        axios.post(insertUrl, insertData, {
            headers: {
                'Content-Type': 'application/ejson',
                'Accept': 'application/json',
                'apiKey': apiKey
            }
        });
        const options = { name: response.name, email: response.email, phoneNumber: response.phoneNumber, department: response.department };
        await sendMail(options);

        return res.redirect('/?flash=Form%20submitted%20successfully#forms');
    } catch (error) {
        console.error(error);
        return res.redirect(`/?flash=${encodeURIComponent(error.errors[0].message)}#forms`);
    }
});

router.get('/download-excel', checkAuth, async (req, res) => {
    if(!req.user) {
        return res.redirect('/ambani/login');
    }
    try {
        const responses = await getResponses();

        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet('Responses');

        sheet.columns = [
            { header: 'Name', key: 'name', width: 20 },
            { header: 'Email', key: 'email', width: 30 },
            { header: 'Phone Number', key: 'phoneNumber', width: 15 },
            { header: 'Department', key: 'department', width: 20 },
            { header: 'Future Vision', key: 'futureVision', width: 60 },
            { header: 'Project Links', key: 'projectLinks', width: 60 },
            { header: 'Video Game Character', key: 'videoGame', width: 60 },
            { header: 'Submit Time', key: 'timeStamp', width: 30 }
        ];

        responses.forEach(response => {
            const row = sheet.addRow(response);
            row.height = 60;
        });

        const buffer = await workbook.xlsx.writeBuffer();

        res.setHeader('Content-Disposition', 'attachment; filename="Registrations.xlsx"');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

        res.send(buffer);
    } catch (error) {
        console.error('Failed to generate Excel file', error);
        res.status(500).send('Internal Server Error');
    }
});

export default router;
