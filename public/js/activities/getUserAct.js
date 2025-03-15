document.addEventListener("DOMContentLoaded", async () => {

    const tableBody = document.getElementById("tableBody");

    const user_id = localStorage.getItem("user_id");

    try{
        const response = await fetch(`http://localhost:5000/api/users/activities/${user_id}`, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json'
            }
        });

        if(response.ok){

            const data = await response.json();

            // Clear the table of any existing data
            tableBody.innerHTML = "";

            data.forEach(activtiy => {
                
                // Create Table Row
                const row = document.createElement("tr");

                // Create Corresponding Data Cells
                const dateCell = document.createElement("td");
                const date = new Date(activtiy.act_date);
                dateCell.textContent = date.toLocaleDateString("en-US");
                
                const durationCell = document.createElement("td");
                const duration = parseInt(activtiy.duration);
                durationCell.textContent = (`${duration} minutes`);

                const commentsCell = document.createElement("td");
                commentsCell.textContent = activtiy.comments;

                // Appending Cells to the Row
                row.appendChild(dateCell);
                row.appendChild(durationCell);
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
})