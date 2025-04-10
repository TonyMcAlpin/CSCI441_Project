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

            // Wire up the Edit button
            document.getElementById("editAppBtn").onclick = () => {
                // Pre-fill the edit form with values
                document.getElementById("editDate").value = info.event.start.toISOString().split('T')[0];
                document.getElementById("editTitle").value = info.event.title;
                document.getElementById("editProvider").value = info.event.extendedProps.provider;
                document.getElementById("editPurpose").value = info.event.extendedProps.purpose;
                document.getElementById("editPhone").value = info.event.extendedProps.phone;
                document.getElementById("editEmail").value = info.event.extendedProps.email;
                document.getElementById("editId").value = info.event.extendedProps.id;

                // Hide the view modal
                const viewModal = bootstrap.Modal.getInstance(document.getElementById('eventModal'));
                viewModal.hide();

                // Show the edit modal
                const editModal = new bootstrap.Modal(document.getElementById('appEditModal'));
                editModal.show();
            };

            // Wire up the Delete button
            document.getElementById("deleteAppBtn").onclick = async () => {
                const confirmDelete = confirm("Are you sure you want to delete this appointment?");
                if (!confirmDelete) return;

                try {
                    const appointmentId = info.event.extendedProps.id;
                    const response = await fetch(`http://localhost:5000/api/appointments/${appointmentId}`, {
                        method: 'DELETE'
                    });

                    if (response.ok) {
                        alert("Appointment deleted.");
                        info.event.remove(); //Remove from calendar
                        const viewModal = bootstrap.Modal.getInstance(document.getElementById('eventModal'));
                        viewModal.hide();
                    } else {
                        const errorText = await response.text();
                        console.error("Failed to delete:", errorText);
                        alert("Error deleting appointment: " + errorText);
                    }
                } catch (err) {
                    console.error("Error deleting:", err);
                    alert("Error deleting appointment.");
                }
            };
    
            // Show the view modal
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
                    id: appointment.id,
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