const getPatientMedications = async (patient_id) => {

    const tableHeaders = document.getElementById("tableHeaders");
    tableHeaders.innerHTML = '';

    const startDate = document.createElement('th');
    const endDate = document.createElement('th');
    const prescriber = document.createElement('th');
    const medication = document.createElement('th');
    const quantity = document.createElement('th');
    const units = document.createElement('th');
    const frequency = document.createElement('th');
    const sideEffects = document.createElement('th');
    startDate.textContent = "Start Date";
    endDate.textContent = "End Date";
    prescriber.textContent = "Prescriber";
    medication.textContent = "Medication";
    quantity.textContent = "Quantity";
    units.textContent = "Units";
    frequency.textContent = "Frequency";
    sideEffects.textContent = "Side Effects";
    tableHeaders.appendChild(startDate);
    tableHeaders.appendChild(endDate);
    tableHeaders.appendChild(prescriber);
    tableHeaders.appendChild(medication);
    tableHeaders.appendChild(quantity);
    tableHeaders.appendChild(units);
    tableHeaders.appendChild(frequency);
    tableHeaders.appendChild(sideEffects);

    const tableBody = document.getElementById("mtBody");

    try{
        const response = await fetch(`http://localhost:5000/api/users/medications/${patient_id}`, {
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

                // Appending Cells to the Row
                row.appendChild(startDateCell);
                row.appendChild(endDateCell);
                row.appendChild(prescriberCell);
                row.appendChild(medNameCell);
                row.appendChild(quantityCell);
                row.appendChild(unitsCell);
                row.appendChild(frequencyCell);
                row.appendChild(commentsCell);

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

}

window.getPatientMedications = getPatientMedications;
