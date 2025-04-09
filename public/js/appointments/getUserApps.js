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

            // data.forEach(appointment => {

            //     //Generate Table Row
            //     const row = document.createElement("tr");

            //     // Create the data cells
            //     const dateCell = document.createElement("td");
            //     const date = new Date(appointment.app_date);
            //     dateCell.textContent = date.toLocaleDateString("en-US");

            //     const titleCell = document.createElement("td");
            //     titleCell.textContent = appointment.medical_title;

            //     const nameCell = document.createElement("td");
            //     nameCell.textContent = appointment.provider_name;

            //     const purposeCell = document.createElement("td");
            //     purposeCell.textContent = appointment.purpose;

            //     const phoneCell = document.createElement("td");
            //     phoneCell.textContent = appointment.phone_number;

            //     const emailCell = document.createElement("td");
            //     emailCell.textContent = appointment.provider_email;


            //     // Create Delete Button
            //     const deleteCell = document.createElement("td");
            //     const deleteButton = document.createElement("button");
            //     deleteButton.textContent = "Delete";
            //     deleteButton.classList.add("btn", "btn-danger");
            //     deleteCell.appendChild(deleteButton);
            //     deleteButton.addEventListener("click", () => {
            //         deleteAppointment(appointment.id);
            //     });

            //     // Create Edit Button
            //     const editButton = document.createElement("button");
            //     editButton.textContent = "Edit";
            //     editButton.classList.add("btn", "btn-success", "ms-1");
            //     deleteCell.appendChild(editButton);
            //     editButton.addEventListener("click", () => {
            //         document.getElementById("editId").value = appointment.id;
            //         document.getElementById("editDate").value = appointment.app_date.split('T')[0];
            //         document.getElementById("editTitle").value = appointment.medical_title;
            //         document.getElementById("editProvider").value = appointment.provider_name;
            //         document.getElementById("editPurpose").value = appointment.purpose;
            //         document.getElementById("editPhone").value = appointment.phone_number;
            //         document.getElementById("editEmail").value = appointment.provider_email;
                    
            //         const modal = new bootstrap.Modal(document.getElementById("editModal"));
            //         modal.show();
            //     });

            //     // Append data cells onto row
            //     row.appendChild(dateCell);
            //     row.appendChild(titleCell);
            //     row.appendChild(nameCell);
            //     row.appendChild(purposeCell);
            //     row.appendChild(phoneCell);
            //     row.appendChild(emailCell);
            //     row.appendChild(deleteCell);
                
            //     //Append row onto table body
            //     tableBody.appendChild(row);

            // });

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