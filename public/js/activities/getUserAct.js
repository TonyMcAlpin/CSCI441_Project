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
                deleteCell.appendChild(deleteButton);
                deleteButton.addEventListener("click", () => {
                    deleteActivity(activity.id); 
                    
                });

                // Create Edit Button
                const editButton = document.createElement("button");
                editButton.textContent = "Edit";
                editButton.classList.add("btn", "btn-success", "ms-1");
                deleteCell.appendChild(editButton);
                editButton.addEventListener("click", () => {
                    document.getElementById("editId").value = activity.id;
                    document.getElementById("editDate").value = activity.act_date.split('T')[0];
                    document.getElementById("editDuration").value = activity.duration;
                    document.getElementById("editDescription").value = activity.comments;

                    const modal = new bootstrap.Modal(document.getElementById("editModal"));
                    modal.show();
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
