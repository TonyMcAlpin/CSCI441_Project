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

                // Append data cells onto row
                row.appendChild(dateCell);
                row.appendChild(titleCell);
                row.appendChild(nameCell);
                row.appendChild(purposeCell);
                row.appendChild(phoneCell);
                row.appendChild(emailCell);
                
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