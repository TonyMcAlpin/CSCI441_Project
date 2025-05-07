import notificationService from "../services/notificationService.js";
import cron from 'node-cron';

//Run once everyday at midnight to check for appointments that day
cron.schedule('0 * * * *', async () => {
    console.log('Running Appointment Check...');

    const appointments = await notificationService.getAppointmentsInNext24Hours();

    for (const appointment of appointments) {

        const standardTime = convertToStandardTime(appointment.app_time);

        await notificationService.sendEmail(
            appointment.user_email,
            'Appointment Reminder',
            `Hello ${appointment.user_name},\n\n\tYou have an appointment today with ${appointment.provider_name}`
            + ` at ${standardTime}.`
        );

    }

    console.log('Reminders Sent');

});



//////////Convert Time Function//////////
function convertToStandardTime(militaryTime) {
    const [hour, minute] = militaryTime.split(':').map(Number);
    const date = new Date();
    date.setHours(hour, minute);

    return new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    }).format(date);
}