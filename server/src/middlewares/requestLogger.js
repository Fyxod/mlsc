import { google } from 'googleapis';
import dotenv from 'dotenv';
import getISTDateString from '../utils/getDate.js';

dotenv.config();

const googlejson = {
    "type": "service_account",
    "project_id": "mlsc-website",
    "private_key_id": process.env.GOOGLE_PRIVATE_KEY_ID,
    "private_key": process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    "client_email": process.env.GOOGLE_CLIENT_EMAIL,
    "client_id": process.env.GOOGLE_CLIENT_ID,
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": process.env.GOOGLE_CLIENT_CERT_URL,
    "universe_domain": "googleapis.com"
};

const auth = new google.auth.GoogleAuth({
    credentials: googlejson,
    scopes: ['https://www.googleapis.com/auth/documents']
});

async function writeGoogleDocs(documentId, requests) {
    try {
        const docs = google.docs({ version: 'v1', auth });

        const writer = await docs.documents.batchUpdate({
            documentId,
            requestBody: {
                requests
            }
        });
        return writer;
    } catch (error) {
        console.error('error', error);
    }
}

export default async function requestLogger(req, res, next) {
    const assetExtensions = ['.css', '.js', '.mp4', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.woff', '.woff2', '.ttf', '.eot'];
    const url = req.url.toLowerCase();

    const isAsset = assetExtensions.some(extension => url.endsWith(extension));

    if (!isAsset) {
        const writer = await writeGoogleDocs(process.env.documentId, [{
            insertText: {
                location: {
                    index: 1
                },
                text: `${getISTDateString()} | ${req.method} ${req.url} | ${req.headers['x-real-ip']} \n`
            }
        }]);
    }
    return next();
}
