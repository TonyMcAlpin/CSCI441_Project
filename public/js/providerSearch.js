document.addEventListener('DOMContentLoaded', async () => {
    
    const patientTableBody = document.getElementById('patientTableBody');
    const noPatientMsg = document.getElementById('noPatientMsg');
    
    async function fetchPatients() 
    {
        try {
            const response = await fetch('http://localhost:5000/api/users/patients', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            
            if (response.ok) 
            {        
                const patients = await response.json();
                displayPatients(patients);
                
            }
            else
            {
                console.error("HTTP Error: ", response.status);
                alert("HTTP Error: " + response.status);
    
            }
        } 
        catch (error) 
        {
            console.error('Error fetching patients:', error);

        }
    }

    function displayPatients(patients) {
        patientTableBody.innerHTML = '';
        
        if (patients && patients.length > 0) {

            noPatientMsg.style.display = 'none';
            
            patients.forEach(patient => {
                const row = document.createElement('tr');
                
                row.setAttribute('patientID', patient.id);
                
                const nameCell = document.createElement('td');
 
                const formattedFirstName = patient.first_name.charAt(0).toUpperCase() + patient.first_name.slice(1);
                const formattedLastName = patient.last_name.charAt(0).toUpperCase() + patient.last_name.slice(1);
                
                nameCell.textContent = `${formattedFirstName} ${formattedLastName}`;
                
                row.appendChild(nameCell);
                
                patientTableBody.appendChild(row);
            });
        } else {
            noPatientMsg.style.display = 'block';
        }
    }
    
    await fetchPatients();

});