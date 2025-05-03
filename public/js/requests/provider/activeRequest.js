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

            tableBody.innerHTML = "";

            for(const request of data) {

                if(request.accepted != 2){
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



                row.appendChild(nameCell);
                row.appendChild(statusCell);
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

                if(request.accepted != 1 || request.closed == 1){
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
                const viewButton = document.createElement('button');
                viewButton.textContent = 'View';
                viewButton.classList.add('btn', 'btn-primary');
                viewButton.setAttribute('data-bs-toggle', 'modal');
                viewButton.setAttribute('data-bs-target', '#patientModal');
                statusCell.appendChild(viewButton);
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
                row.appendChild(statusCell);
                tableBody.appendChild(row);

            }
        }
    }
    catch(err){
        console.log("Internal Server Error: ", err);
        alert("Internal Server Error: " + err);
    }

});