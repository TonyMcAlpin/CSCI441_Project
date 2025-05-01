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
            // console.log("Event clicked:", info.event);
            // console.log("Clicked event ID:", info.event.extendedProps.id);

            // Populate the modal with event details
            document.getElementById('eventDate').textContent = info.event.start.toLocaleDateString();
            document.getElementById('eventTitle').textContent = info.event.title;
            document.getElementById('eventTime').textContent = info.event.extendedProps.time;
            document.getElementById('eventProvider').textContent = info.event.extendedProps.provider;
            document.getElementById('eventPurpose').textContent = info.event.extendedProps.purpose;
            document.getElementById('eventPhone').textContent = info.event.extendedProps.phone;
            document.getElementById('eventEmail').textContent = info.event.extendedProps.email;

            // Wire up the Edit button
            document.getElementById("editAppBtn").onclick = () => {
                // Log to check if the correct event data is being passed
                // console.log("Pre-filling form for event ID:", info.event.extendedProps.id);
                // Pre-fill fields with event details
                const eventDetails = info.event.extendedProps;
                // console.log("Filling edit form with: ", eventDetails);

                 // Reset the fields before pre-filling with new data
                document.getElementById("editDate").value = "";
                document.getElementById("editMedical_Title").value = "";
                document.getElementById("editTime").value = "";
                document.getElementById("editProvider").value = "";
                document.getElementById("editPurpose").value = "";
                document.getElementById("editPhone").value = "";
                document.getElementById("editEmail").value = "";

                // Pre-fill the edit form with values
                document.getElementById("editDate").value = info.event.start.toISOString().split('T')[0];
                document.getElementById("editMedical_Title").value = info.event.title;
                document.getElementById("editTime").value = info.event.extendedProps.time?.slice(0, 5) || "";
                document.getElementById("editProvider").value = info.event.extendedProps.provider;
                document.getElementById("editPurpose").value = info.event.extendedProps.purpose;
                document.getElementById("editPhone").value = info.event.extendedProps.phone;
                document.getElementById("editEmail").value = info.event.extendedProps.email;

                // Ensure that the correct event ID is passed along for future edits (e.g., save)
                const editIdInput = document.getElementById("editId");  // Assuming you have a hidden input for the ID
                if (editIdInput) {
                    editIdInput.value = info.event.extendedProps.id;
                } else {
                    console.error("Edit ID input not found!");
                }

                // Hide the view modal
                const viewModal = bootstrap.Modal.getInstance(document.getElementById('eventModal'));
                viewModal.hide();

                // Manually destroy the modal instance before showing it again
                const editModalElement = document.getElementById('appEditModal');
                const editModal = bootstrap.Modal.getInstance(editModalElement);
                if (editModal) {
                    editModal.dispose(); // Dispose the modal instance to avoid keeping old data
                }

                // Show the edit modal
                const newEditModal = new bootstrap.Modal(document.getElementById('appEditModal'));
                newEditModal.show();
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
            headers: {
                'Content-Type': 'application/json'
            }
        });
    
        if (response.ok) {
            const data = await response.json();
    
            const events = data.map(appointment => {
    
                // Extract app_date (in ISO format) and app_time
                const appDate = appointment.app_date; // e.g. "2025-04-30T05:00:00.000Z"
                const appTime = appointment.app_time; // e.g. "13:00:00"
    
                // Create a new Date object from app_date (it’s already ISO formatted)
                const dateObj = new Date(appDate); // This will parse the ISO string
    
                // Extract the individual parts of the time
                const [hours, minutes, seconds] = appTime.split(":");
    
                // Set the time on the existing date object (keeping the date part from app_date)
                dateObj.setHours(hours);
                dateObj.setMinutes(minutes);
                dateObj.setSeconds(seconds);
    
                // If the date is still invalid, log an error and skip this event
                if (isNaN(dateObj)) {
                    console.error("Invalid combined date:", appointment);
                    return null;  // Skip invalid appointments
                }
    
                return {
                    title: appointment.medical_title,
                    start: dateObj, // Use the combined date
                    extendedProps: {
                        id: appointment.id,
                        time: appTime, // Keep app_time for display
                        provider: appointment.provider_name,
                        purpose: appointment.purpose,
                        phone: appointment.phone_number,
                        email: appointment.provider_email
                    }
                };
            }).filter(event => event !== null);  // Filter out invalid events
    
            // Add events to the calendar if there are any valid events
            if (events.length > 0) {
                events.forEach(event => calendar.addEvent(event));
            }
    
        } else {
            console.error("HTTP Error: ", response.status);
            alert("HTTP Error: " + response.status);
        }
    
    } catch (err) {
        console.log("Internal Server Error: ", err);
        alert("Internal Server Error: " + err);
    }    
})