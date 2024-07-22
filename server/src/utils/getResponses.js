import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export default async function getResponses() {
    try {
        const findUrl = process.env.DATA_API_URL + 'find';
        const apiKey = process.env.DATA_API_KEY;
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

        return findResponse.data.documents;
    } catch (error) {
        console.error('Error finding responses', error);
    }
}