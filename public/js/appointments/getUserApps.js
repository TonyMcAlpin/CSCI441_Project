document.addEventListener("DOMContentLoaded", async () => {

    // Find the table
    const tableBody = document.getElementById("tableBody");

    // Get user_id from local storage
    const user_id = localStorage.getItem("user_id");


    // API Call

    try{
        const response = await fetch(`http://localhost:5000/api/users/appointments/${user_id}`, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json'
            }
        });

        if(response.ok){
            const data = await response.json();

            // Clear table of any existing data
            tableBody.innerHTML = "";

            data.forEach(appointment => {

                //Generate Table Row
                const row = document.createElement("tr");

                // Create the data cells
                const dateCell = document.createElement("td");
                const date = new Date(appointment.app_date);
                dateCell.textContent = date.toLocaleDateString("en-US");

                const titleCell = document.createElement("td");
                titleCell.textContent = appointment.medical_title;

                const nameCell = document.createElement("td");
                nameCell.textContent = appointment.provider_name;

                const purposeCell = document.createElement("td");
                purposeCell.textContent = appointment.purpose;

                const phoneCell = document.createElement("td");
                phoneCell.textContent = appointment.phone_number;

                const emailCell = document.createElement("td");
                emailCell.textContent = appointment.provider_email;


                // Create Delete Button
                const deleteCell = document.createElement("td");
                const deleteButton = document.createElement("button");
                deleteButton.textContent = "Delete";
                deleteButton.classList.add("btn", "btn-danger");
                deleteCell.appendChild(deleteButton);
                deleteButton.addEventListener("click", () => {
                    deleteAppointment(appointment.id);
                });

                // Create Edit Button
                const editButton = document.createElement("button");
                editButton.textContent = "Edit";
                editButton.classList.add("btn", "btn-success", "ms-1");
                deleteCell.appendChild(editButton);
                editButton.addEventListener("click", () => {
                    document.getElementById("editId").value = appointment.id;
                    document.getElementById("editDate").value = appointment.app_date.split('T')[0];
                    document.getElementById("editTitle").value = appointment.medical_title;
                    document.getElementById("editProvider").value = appointment.provider_name;
                    document.getElementById("editPurpose").value = appointment.purpose;
                    document.getElementById("editPhone").value = appointment.phone_number;
                    document.getElementById("editEmail").value = appointment.provider_email;
                    
                    const modal = new bootstrap.Modal(document.getElementById("editModal"));
                    modal.show();
                });

                // Append data cells onto row
                row.appendChild(dateCell);
                row.appendChild(titleCell);
                row.appendChild(nameCell);
                row.appendChild(purposeCell);
                row.appendChild(phoneCell);
                row.appendChild(emailCell);
                row.appendChild(deleteCell);
                
                //Append row onto table body
                tableBody.appendChild(row);

            });
        }
        else{   
            console.error("HTTP Error: ", response.status);
            alert("HTTP Error: " + response.status);
        }

    }
    catch(err){
        console.log("Internal Server Error: ", err);
        alert("Internal Server Error: " + err);
    }














})