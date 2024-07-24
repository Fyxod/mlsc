import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
export const regActive = async (req, res, next) => {
    try {
        const findUrl = process.env.DATA_API_URL + 'findOne';
        const apiKey = process.env.DATA_API_KEY;
        const findData = {
            dataSource: 'mlscCluster',
            database: 'website',
            collection: 'admins',
            filter: {
                "_id": { "$oid": process.env.ADMIN_ID }
            },
        };

        const Admin = await axios.post(findUrl, findData, {
            headers: {
                'Content-Type': 'application/ejson',
                'Accept': 'application/json',
                'apiKey': apiKey
            }
        });
        if (!Admin?.data.document.regActive) {
            return res.redirect('/?flash=Registrations%20not%20open#forms')
        }
        return next();

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}