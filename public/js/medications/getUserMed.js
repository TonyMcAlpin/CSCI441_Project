
document.addEventListener("DOMContentLoaded", async () => {

    const tableBody = document.getElementById("tableBody");

    const user_id = localStorage.getItem("user_id");

    try{
        const response = await fetch(`http://localhost:5000/api/users/medications/${user_id}`, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json'
            }
        });

        if(response.ok){

            const data = await response.json();

            // Clear the table of any existing data
            tableBody.innerHTML = "";

            data.forEach(medication => {
                
                // Create Table Row
                const row = document.createElement("tr");

                // Create Corresponding Data Cells
                const startDateCell = document.createElement("td");
                const startDate = new Date(medication.start_date);
                startDateCell.textContent = startDate.toLocaleDateString("en-US");

                const endDateCell = document.createElement("td");
                const endDate = new Date(medication.end_date);
                endDateCell.textContent = endDate.toLocaleDateString("en-US");

                const prescriberCell = document.createElement("td");
                prescriberCell.textContent = medication.prescriber;

                const medNameCell = document.createElement("td");
                medNameCell.textContent = medication.med_name;

                const quantityCell = document.createElement("td");
                quantityCell.textContent = medication.quantity;

                const unitsCell = document.createElement("td");
                unitsCell.textContent = medication.units;

                const frequencyCell = document.createElement("td");
                frequencyCell.textContent = medication.frequency;

                // Create Delete Button
                const deleteCell = document.createElement("td");
                const deleteButton = document.createElement("button");
                deleteButton.textContent = "Delete";
                deleteButton.classList.add("btn", "btn-danger");
                deleteButton.setAttribute("data-id", medication.id); 
                deleteCell.appendChild(deleteButton);
                deleteButton.addEventListener("click", () => {
                    const medicationId = deleteButton.getAttribute("data-id");
                    deleteMedication(medicationId); 
                    row.remove(); 
                });

              
                // Appending Cells to the Row
                row.appendChild(startDateCell);
                row.appendChild(endDateCell);
                row.appendChild(prescriberCell);
                row.appendChild(medNameCell);
                row.appendChild(quantityCell);
                row.appendChild(unitsCell);
                row.appendChild(frequencyCell);
                row.appendChild(deleteCell);

                // Append row to Table Body
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
