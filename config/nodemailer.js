import nodemailer from 'nodemailer';
import { EMAIL, EMAIL_PASSWORD } from './env.js';

// Create a transporter object using SMTP transport
export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth : {
        user: EMAIL,
        pass: EMAIL_PASSWORD
    }
});