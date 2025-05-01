document.addEventListener('DOMContentLoaded', function() {
    console.log("PHER Page Loaded");
});


import { requestNotificationPermission, scheduleNotification } from './notifications.js';  // Adjust path if necessary

document.addEventListener("DOMContentLoaded", async () => {
    // Request permission for notifications
    requestNotificationPermission();

    // Get user ID from local storage
    const user_id = localStorage.getItem("user_id");

    try {
        const response = await fetch(`http://localhost:5000/api/users/appointments/${user_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const appointments = await response.json();

            // Loop through appointments and schedule notifications
            appointments.forEach(appointment => {
                scheduleNotification(appointment); // Schedule notification 10 minutes before
            });

            // Your existing calendar rendering code here...

        } else {
            console.error("HTTP Error: ", response.status);
            alert("Error fetching appointments.");
        }

    } catch (err) {
        console.error("Error fetching appointments:", err);
        alert("Error fetching appointments.");
    }
});
