import dotenv from "dotenv";
import Admin from "../models/user.js";

dotenv.config();
export const regActive = async (_, res, next) => {
    try {
        const admin = await Admin.findOne();
        if (!admin.regActive) {
            return res.redirect('/?flash=Registrations%20not%20open#forms')
        }
        return next();

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}