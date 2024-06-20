import express from 'express';
import ExcelJS from 'exceljs'
import Form from '../models/forms.js';
import sendMail from '../services/mail.js';
import z from 'zod';

const router = express.Router();

const formsSchema = z.object({
    name: z.string().min(1, { message: "Please enter your name" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    phoneNumber: z.string().min(1, { message: "Please enter your phone number" }),
    department: z.enum(['Tech', 'Design', 'Management'], { message: "Please select a department" })
});

router.get('/form', (req, res) => {
    res.render('form', { flash: null });
});

router.post('/form', async (req, res) => {
    try {
        const { name, email, phoneNumber, department } = formsSchema.parse(req.body);

        const form = new Form({
            name,
            email,
            phoneNumber,
            department
        });

        await form.save();
        const options = {
            name, email, phoneNumber, department
        }
        sendMail(options)
        res.render('form', { flash: "Form submitted successfully" });
    } catch (error) {
        res.render('form', { flash: error.errors[0].message });
    }
});

router.get('/download-excel', async (req, res) => {
    try {
        const responses = await Form.find().lean();

        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet('Responses');

        sheet.columns = [
            { header: 'Name', key: 'name', width: 20 },
            { header: 'Email', key: 'email', width: 30 },
            { header: 'Phone Number', key: 'phoneNumber', width: 15 },
            { header: 'Department', key: 'department', width: 20 }
        ];

        responses.forEach(response => {
            sheet.addRow(response);
        });

        const buffer = await workbook.xlsx.writeBuffer();

        res.setHeader('Content-Disposition', 'attachment; filename="responses.xlsx"');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

        res.send(buffer);
    } catch (error) {
        console.error('Failed to generate Excel file', error);
    }
});

export default router;
