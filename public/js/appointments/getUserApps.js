document.addEventListener("DOMContentLoaded", async () => {

    // Find the calendar
    const calendarElement = document.getElementById("calendar");

    // Get user_id from local storage
    const user_id = localStorage.getItem("user_id");

    const calendar = new FullCalendar.Calendar(calendarElement, {
        initialView: 'dayGridMonth',
        themeSystem: 'bootstrap5',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,listWeek'
        }, 
        events: [], // push appointments here

        eventClick: function(info) {
            // Log to check if data is being retrieved correctly
            console.log("Event clicked:", info.event);

            // Populate the modal with event details
            document.getElementById('eventDate').textContent = info.event.start.toLocaleString();
            document.getElementById('eventTitle').textContent = info.event.title;
            document.getElementById('eventProvider').textContent = info.event.extendedProps.provider;
            document.getElementById('eventPurpose').textContent = info.event.extendedProps.purpose;
            document.getElementById('eventPhone').textContent = info.event.extendedProps.phone;
            document.getElementById('eventEmail').textContent = info.event.extendedProps.email;
    
            // Show the modal
            var modal = new bootstrap.Modal(document.getElementById('eventModal'));
            modal.show();
        }
    });

    calendar.render();

    // API Call

    try {
        const response = await fetch(`http://localhost:5000/api/users/appointments/${user_id}`, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();

            const events = data.map(appointment => ({
                title: appointment.medical_title,
                start: appointment.app_date, 
                extendedProps: {
                    provider: appointment.provider_name,
                    purpose: appointment.purpose,
                    phone: appointment.phone_number,
                    email: appointment.provider_email
                }
            }));

            events.forEach(event => calendar.addEvent(event));
        }
        else {   
            console.error("HTTP Error: ", response.status);
            alert("HTTP Error: " + response.status);
        }

    }
    catch(err){
        console.log("Internal Server Error: ", err);
        alert("Internal Server Error: " + err);
    }
});