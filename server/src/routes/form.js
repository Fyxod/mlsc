import express from 'express';
import ExcelJS from 'exceljs';
import Form from '../models/forms.js';
import sendMail from '../utils/mail.js';
import checkAuth from '../middlewares/auth.js';
import { regActive } from '../middlewares/regActive.js';
import getISTDateString from '../utils/getDate.js';
import { formSchema } from '../utils/zodSchemas.js';
const router = express.Router();

router.post('/form', regActive, async (req, res) => {
    try {
        const { name, email, phoneNumber, department, futureVision, projectLinks, videoGame } = formSchema.parse(req.body);
        const existingForm = await Form.findOne({
            $or: [
                { email },
                { phoneNumber },
                { projectLinks }
            ]
        });

        if (existingForm) {
            return res.redirect('/?flash=Form%20already%20submitted#forms');
        }

        const form = new Form({
            name,
            email,
            phoneNumber,
            department,
            futureVision,
            projectLinks,
            videoGame,
            timeStamp: getISTDateString()
        });

        await form.save();
        const options = { name, email, phoneNumber, department };
        res.redirect('/?flash=Form%20submitted%20successfully#forms');
        // sendMail(options);

    } catch (error) {
        console.error(error);
        return res.redirect(`/?flash=${encodeURIComponent(error.errors[0].message)}#forms`);
    }
});

router.get('/download-excel', checkAuth, async (req, res) => {
    if (!req.user) {
        return res.redirect('/ambani/login');
    }
    try {
        const responses = await Form.find().lean();

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