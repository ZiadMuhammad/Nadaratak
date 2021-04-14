require('dotenv').config();

export const config firebaseConfig = {
        apiKey: process.env.API_KEY,
        authDomain: process.env.AUTH_NAME,
        projectId: process.env.PROJECT_ID,
        storageBucket: process.env.STORAGE_BUCKET,
        messagingSenderId: process.env.MESSAGING_SENDER_ID,
        appId: process.env.APP_ID
};