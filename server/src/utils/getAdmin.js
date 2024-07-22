import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export default async function getAdmin(username) {
    try {
        const findUrl = process.env.DATA_API_URL + 'findOne';
        const apiKey = process.env.DATA_API_KEY;
        const findData = {
            dataSource: 'mlscCluster',
            database: 'website',
            collection: 'admins',
            filter: { username }
        };
        const findAdmin = await axios.post(findUrl, findData, {
            headers: {
                'Content-Type': 'application/ejson',
                'Accept': 'application/json',
                'apiKey': apiKey
            }
        });

        return findAdmin?.data.document;
    } catch (error) {
        console.error(error);
        return null;
    }
}
