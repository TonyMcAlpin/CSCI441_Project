/* written by: Austin Hoelscher
tested by: Austin Hoelscher
debugged by: Austin Hoelscher  */

const getPatientActivities = async (patient_id) => {

    const tableHeaders = document.getElementById("tableHeaders");
    tableHeaders.innerHTML = '';
    const dateHeader = document.createElement('th');
    const durationHeader = document.createElement('th');
    const descriptionHeader = document.createElement('th');
    dateHeader.textContent = 'Date';
    durationHeader.textContent = 'Duration';
    descriptionHeader.textContent = 'Description';
    tableHeaders.appendChild(dateHeader);
    tableHeaders.appendChild(durationHeader);
    tableHeaders.appendChild(descriptionHeader);

    const tableBody = document.getElementById("mtBody");


    try{
        const response = await fetch(`http://localhost:5000/api/users/activities/${patient_id}`, {
            method: 'GET',
            header: {
                'Content-Type': 'application.json'
            }
        });
    
        if(response.ok){

            const data = await response.json();

            tableBody.innerHTML = '';

            data.forEach(activity => {
                const row = document.createElement('tr');

                const dateCell = document.createElement("td");
                const date = new Date(activity.act_date);
                dateCell.textContent = date.toLocaleDateString("en-US");
                
                const durationCell = document.createElement("td");
                const duration = parseInt(activity.duration);
                durationCell.textContent = (`${duration} minutes`);

                const commentsCell = document.createElement("td");
                commentsCell.textContent = activity.comments;

                row.appendChild(dateCell);
                row.appendChild(durationCell);
                row.appendChild(commentsCell);

                // Append row to Table Body
                tableBody.appendChild(row);

            });


        }
    }
    catch(err){
        console.log("Internal Server Error: ", err);
        alert("Internal Server Error: " + err);
    }


}



window.getPatientActivities = getPatientActivities;

export {getPatientActivities};