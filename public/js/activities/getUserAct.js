
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

            data.forEach(activity => {
                
                // Create Table Row
                const row = document.createElement("tr");

                // Create Corresponding Data Cells
                const dateCell = document.createElement("td");
                const date = new Date(activity.act_date);
                dateCell.textContent = date.toLocaleDateString("en-US");
                
                const durationCell = document.createElement("td");
                const duration = parseInt(activity.duration);
                durationCell.textContent = (`${duration} minutes`);

                const commentsCell = document.createElement("td");
                commentsCell.textContent = activity.comments;

                // Create Delete Button
                const deleteCell = document.createElement("td");
                const deleteButton = document.createElement("button");
                deleteButton.textContent = "Delete";
                deleteButton.classList.add("btn", "btn-danger");
                deleteButton.setAttribute("data-id", activity.id); 
                deleteCell.appendChild(deleteButton);
                deleteButton.addEventListener("click", () => {
                    const activityId = deleteButton.getAttribute("data-id");
                    deleteActivity(activityId); 
                    row.remove(); 
                });

              
                // Appending Cells to the Row
                row.appendChild(dateCell);
                row.appendChild(durationCell);
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
