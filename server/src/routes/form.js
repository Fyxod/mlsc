import express from 'express';
import Form from '../models/forms.js';
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
        res.render('form', { flash: "Form submitted successfully" });
    } catch (error) {
        res.render('form', { flash: error.errors[0].message });
    }
});

router.post('/generatexlxx', (req, res) => {
    //Working on this
});

export default router;
