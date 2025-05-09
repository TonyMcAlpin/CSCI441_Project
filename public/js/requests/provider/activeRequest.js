/* written by:  
tested by: Isaac Nevarez-Saenz
debugged by: Isaac Nevarez-Saenz */

function closeRequest(requestId) {

    if (!confirm("Are you sure you want to close this request?")) return;

    fetch(`http://localhost:5000/api/requests/close/${requestId}`, {
        method: "PUT",
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);    
        location.reload(); 
    })
    .catch(err => {
        console.error("Error closing request:", err);
        alert("Failed to close request.");
    });
}

function cancelRequest(requestId) {

    if (!confirm("Are you sure you want to cancel this request?")) return;

    fetch(`http://localhost:5000/api/requests/cancel/${requestId}`, {
        method: "PUT",
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);    
        location.reload(); 
    })
    .catch(err => {
        console.error("Error cancel request:", err);
        alert("Failed to cancel request.");
    });
}



//Pending Requests
document.addEventListener("DOMContentLoaded", async () => {

    const tableBody = document.getElementById("tableBody");
    const user_id = sessionStorage.getItem("user_id");
    try{
        const response = await fetch(`http://localhost:5000/api/users/requests/${user_id}`, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json'
            }
        });

        if(response.ok){

            const data = await response.json();    
            console.log('API Response:', data);

            tableBody.innerHTML = "";

            for(const request of data) {
                console.log('Individual request:', request);

                if(request.accept_date !== null || request.cancel_date !== null || request.close_date !== null){
                    continue;
                }

                const patient_id = request.patient_id;

                const patientRes = await fetch(`http://localhost:5000/api/users/${patient_id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const patient = await patientRes.json();

                const row = document.createElement('tr');

                const nameCell = document.createElement('td');
                nameCell.textContent = `${patient.last_name}, ${patient.first_name}`;

                const statusCell = document.createElement('td');
                statusCell.textContent = 'Pending';

                //Create button to cancel request
                const cancelCell = document.createElement("td");
                const cancelButton = document.createElement("button");
                cancelButton.textContent = "Cancel";
                cancelButton.classList.add("btn", "btn-danger");
                cancelCell.appendChild(cancelButton);
                cancelButton.addEventListener("click", () => {
                    cancelRequest(request.id); 
                });


                row.appendChild(nameCell);
                row.appendChild(statusCell);
                row.appendChild(cancelCell);
                tableBody.appendChild(row);

            }
        }
    }
    catch(err){
        console.log("Internal Server Error: ", err);
        alert("Internal Server Error: " + err);
    }

});

document.addEventListener("DOMContentLoaded", async () => {

    const tableBody = document.getElementById("acceptedBody");
    const user_id = sessionStorage.getItem("user_id");
    try{
        const response = await fetch(`http://localhost:5000/api/users/requests/${user_id}`, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json'
            }
        });

        if(response.ok){

            const data = await response.json();    

            tableBody.innerHTML = "";

            for(const request of data) {

                if(request.accept_date === null || request.cancel_date !== null || request.close_date !== null){
                    continue;
                }

                const patient_id = request.patient_id;
                const patientRes = await fetch(`http://localhost:5000/api/users/${patient_id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const patient = await patientRes.json();

                const row = document.createElement('tr');

                const nameCell = document.createElement('td');
                nameCell.textContent = `${patient.last_name}, ${patient.first_name}`;

                const viewCell = document.createElement('td');
                const viewButton = document.createElement('button');
                viewButton.textContent = 'View';
                viewButton.classList.add('btn', 'btn-primary');
                viewButton.setAttribute('data-bs-toggle', 'modal');
                viewButton.setAttribute('data-bs-target', '#patientModal');
                viewCell.appendChild(viewButton);

                //Create button to close request
                const closeCell = document.createElement("td");
                const closeButton = document.createElement("button");
                closeButton.textContent = "Close";
                closeButton.classList.add("btn", "btn-danger");
                closeCell.appendChild(closeButton);
                closeButton.addEventListener("click", () => {
                    closeRequest(request.id); 
                });

                viewButton.addEventListener('click', () => {
                    document.getElementById('modalHeader').textContent = `Record For ${patient.last_name}, ${patient.first_name}`;
                        const modalList = document.getElementById('modalList');
                        modalList.innerHTML = "";
                        const appointments = document.createElement('li');
                        const activities = document.createElement('li');
                        const medications = document.createElement('li');
                        appointments.classList.add('btn', 'btn-lg', 'mx-3'); 
                        activities.classList.add('btn', 'btn-lg', 'mx-3'); 
                        medications.classList.add('btn', 'btn-lg', 'mx-3');
                        appointments.textContent = 'Appointments';
                        activities.textContent = 'Activities';
                        medications.textContent = 'Medications';
                        modalList.appendChild(appointments);
                        modalList.appendChild(activities);
                        modalList.appendChild(medications);
                        appointments.classList.add("active");
                        getPatientAppointments(patient_id);
                        activities.addEventListener("click", () => {
                            activities.classList.add("active");
                            medications.classList.remove("active");
                            appointments.classList.remove("active");
                            getPatientActivities(patient_id);
                        });
                        medications.addEventListener("click", () => {
                            medications.classList.add("active");
                            activities.classList.remove("active");
                            appointments.classList.remove("active");
                            getPatientMedications(patient_id);
                        });
                        appointments.addEventListener("click", () => {
                            appointments.classList.add("active");
                            activities.classList.remove("active");
                            medications.classList.remove("active");
                            getPatientAppointments(patient_id);
                        });



                });

                row.appendChild(nameCell);
                row.appendChild(viewCell);
                row.appendChild(closeCell);
                tableBody.appendChild(row);

            }
        }
    }
    catch(err){
        console.log("Internal Server Error: ", err);
        alert("Internal Server Error: " + err);
    }

});