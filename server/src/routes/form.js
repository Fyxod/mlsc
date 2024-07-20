import express from 'express';
import ExcelJS from 'exceljs'
// import Form from '../models/forms.js';
import sendMail from '../services/mail.js';
import z from 'zod';
import checkAuth from '../middlewares/auth.js';
import axios from 'axios';
import { regActive } from '../middlewares/regActive.js';

const router = express.Router();

const formsSchema = z.object({
    name: z.string().min(1, { message: "Please enter your name" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    phoneNumber: z.string().min(10, { message: "Please enter your phone number" }),
    department: z.enum(['Tech', 'Design', 'Management'], { message: "Please select a department" }),
    futureVision: z.string().min(1, { message: "Please answer all the questions" }),
    projectLinks: z.string().min(1, { message: "Please answer all the questions" }),
    videoGame: z.string().min(1, { message: "Please answer all the questions" }),
});


router.post('/form', regActive, async (req, res) => {
    try {
        const response = formsSchema.parse(req.body);


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
        })

        if (findResponse?.data.document) {
            console.log("Already submitted");
            return res.redirect('/?flash=Form%20already%20submitted%20with%20this%20email%20or%20phone%20number#forms');
        } else {
            console.log('No document matches the provided query.');
        }


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
        })
            .then(response => {
                console.log('Document inserted:', response.data);
            })
            .catch(error => {
                console.error('Error inserting document:', error);
            });


        const options = { name: response.name, email: response.email, phoneNumber: response.phoneNumber, department: response.department };
        await sendMail(options);

        return res.redirect('/?flash=Form%20submitted%20successfully#forms');
    } catch (error) {
        console.log(error)
        return res.redirect(`/?flash=${encodeURIComponent(error.errors[0].message)}#forms`);
    }
});


// router.get('/download-excel', checkAuth, async (req, res) => {
//     try {
//         const responses = await Form.find().lean();

//         const workbook = new ExcelJS.Workbook();
//         const sheet = workbook.addWorksheet('Responses');

//         sheet.columns = [
//             { header: 'Name', key: 'name', width: 20 },
//             { header: 'Email', key: 'email', width: 30 },
//             { header: 'Phone Number', key: 'phoneNumber', width: 15 },
//             { header: 'Department', key: 'department', width: 20 }
//         ];

//         responses.forEach(response => {
//             sheet.addRow(response);
//         });

//         const buffer = await workbook.xlsx.writeBuffer();

//         res.setHeader('Content-Disposition', 'attachment; filename="responses.xlsx"');
//         res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

//         res.send(buffer);
//     } catch (error) {
//         console.error('Failed to generate Excel file', error);
//     }
// });

export default router;
