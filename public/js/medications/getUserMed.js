
document.addEventListener("DOMContentLoaded", async () => {

    const tableBody = document.getElementById("tableBody");

    const user_id = sessionStorage.getItem("user_id");

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
                if(medication.end_date){
                    const endDate = new Date(medication.end_date);
                    endDateCell.textContent = endDate.toLocaleDateString("en-US");
                }
                else{
                    endDateCell.textContent = "";
                }

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

                const commentsCell = document.createElement("td");
                commentsCell.textContent = medication.comments;

                // Create Delete Button
                const deleteCell = document.createElement("td");
                const deleteButton = document.createElement("button");
                deleteButton.textContent = "Delete";
                deleteButton.classList.add("btn", "btn-danger");
                deleteCell.appendChild(deleteButton);
                deleteButton.addEventListener("click", () => {
                    deleteMedication(medication.id); 
                });

                // Create Edit Button
                const editButton = document.createElement("button");
                editButton.textContent = "Edit";
                editButton.classList.add("btn", "btn-success", "ms-1");
                deleteCell.appendChild(editButton);
                editButton.addEventListener("click", () => {
                    document.getElementById("editId").value = medication.id;
                    document.getElementById("editStart_Date").value = medication.start_date.split('T')[0];
                    document.getElementById("editEnd_Date").value = medication.end_date ? medication.end_date.split('T')[0] : "";
                    document.getElementById("editPresc").value = medication.prescriber;
                    document.getElementById("editMed").value = medication.med_name;
                    document.getElementById("editQuantity").value = medication.quantity;
                    document.getElementById("editUnits").value = medication.units;
                    document.getElementById("editFrequency").value = medication.frequency;
                    document.getElementById("editComments").value = medication.comments;

                    const modal = new bootstrap.Modal(document.getElementById("editModal"));
                    modal.show();
                });

              
                // Appending Cells to the Row
                row.appendChild(startDateCell);
                row.appendChild(endDateCell);
                row.appendChild(prescriberCell);
                row.appendChild(medNameCell);
                row.appendChild(quantityCell);
                row.appendChild(unitsCell);
                row.appendChild(frequencyCell);
                row.appendChild(commentsCell);
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
