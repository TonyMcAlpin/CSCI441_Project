/* written by: Austin Hoelscher
tested by: Austin Hoelscher
debugged by: Austin Hoelscher  */

import nodeMailer from "nodemailer";
import db from '../connections/db.js';

const transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER || 'noreplyPHER@gmail.com',
        pass: process.env.EMAIL_PASS || 'jfga nxyx zcsj pkbq ',
    },
});

const getAppointmentsInNext24Hours = async () => {
    const [result] = await db.query(
        `SELECT
            appointments.app_date,
            appointments.app_time,
            users.first_name AS user_name,
            users.email AS user_email,
            appointments.provider_name
         FROM appointments
         JOIN users ON appointments.user_id = users.id
         WHERE appointments.app_date = CURDATE();
        `
    )
    return result;
}


const sendEmail = async (to, subject, text) =>  {

    const info = await transporter.sendMail({
        from: ` "PHER" <noreplyPHER@gmail.com>`,
        to,
        subject,
        text,
    });

    console.log("Message sent: ", info.messageId);

}


export default {
    sendEmail,
    getAppointmentsInNext24Hours
}


// sendEmail('hoelscher.austin@yahoo.com','Reminder!',
//     'This is a reminder that you have an appointment today.');


// function convertToStandardTime(militaryTime) {
//     const [hour, minute] = militaryTime.split(':').map(Number);
//     const date = new Date();
//     date.setHours(hour, minute);
  
//     return new Intl.DateTimeFormat('en-US', {
//       hour: 'numeric',
//       minute: '2-digit',
//       hour12: true,
//     }).format(date);
// }

// const test = async () => {
//     const appointments = await getAppointmentsInNext24Hours();

//     for (const appointment of appointments){

//         const standardTime = convertToStandardTime(appointment.app_time);
        
//         await sendEmail(
//             appointment.user_email,
//             'Appointment Reminder',
//             `Hello ${appointment.user_name},\n\n\tYou have an appointment today with ${appointment.provider_name}` 
//             + ` at ${standardTime}.`
//         );

//     }
// }

// test();

