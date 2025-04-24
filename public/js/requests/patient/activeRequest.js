// Pending Requests
document.addEventListener("DOMContentLoaded", async () => {

    const tableBody = document.getElementById("tableBody");
    const user_id = localStorage.getItem("user_id");
    try{
        const response = await fetch(`http://localhost:5000/api/users/requests/${user_id}`, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json'
            }
        });

        if(response.ok){

            const data = await response.json();    

            tableBody.innerHTML = "";

            for(const request of data) {

                if(request.closed == 1 || request.accepted == 1){
                    continue;
                }

                const provider_id = request.provider_id;


                const providerRes = await fetch(`http://localhost:5000/api/users/${provider_id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const provider = await providerRes.json();

                const row = document.createElement('tr');

                const nameCell = document.createElement('td');
                nameCell.textContent = `Dr. ${provider.last_name}`;


                //Accept/Decline Buttons

                const statusCell = document.createElement('td');
                
                const acceptButton = document.createElement("button");
                acceptButton.textContent = "Accept";
                acceptButton.classList.add("btn", "btn-success");
                statusCell.appendChild(acceptButton);
                acceptButton.addEventListener("click", () => {
                    requestDecision(1,0,request.id);
                });

                const deleteButton = document.createElement("button");
                deleteButton.textContent = "Decline";
                deleteButton.classList.add("btn", "btn-danger", "ms-1");
                statusCell.appendChild(deleteButton);
                deleteButton.addEventListener("click", () => {
                    requestDecision(0,0,request.id);
                });

                row.appendChild(nameCell);
                row.appendChild(statusCell);
                tableBody.appendChild(row);

            }
        }
    }
    catch(err){
        console.log("Internal Server Error: ", err);
        alert("Internal Server Error: " + err);
    }

});




// Currently Sharing
document.addEventListener("DOMContentLoaded", async () => {

    const tableBody = document.getElementById("accpetedBody");
    const user_id = localStorage.getItem("user_id");
    try{
        const response = await fetch(`http://localhost:5000/api/users/requests/${user_id}`, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json'
            }
        });

        if(response.ok){

            const data = await response.json();    

            tableBody.innerHTML = "";

            for(const request of data) {

                if(request.closed == 1 || request.accepted == 2){
                    continue;
                }

                const provider_id = request.provider_id;


                const providerRes = await fetch(`http://localhost:5000/api/users/${provider_id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const provider = await providerRes.json();

                const row = document.createElement('tr');

                const nameCell = document.createElement('td');
                nameCell.textContent = `Dr. ${provider.last_name}`;

                const statusCell = document.createElement('td');

                const closeButton = document.createElement("button");
                closeButton.textContent = "Close";
                closeButton.classList.add("btn", "btn-danger", "ms-1");
                statusCell.appendChild(closeButton);
                closeButton.addEventListener("click", () => {
                    requestDecision(1,1,request.id);
                });

                row.appendChild(nameCell);
                row.appendChild(statusCell);
                tableBody.appendChild(row);

            }
        }
    }
    catch(err){
        console.log("Internal Server Error: ", err);
        alert("Internal Server Error: " + err);
    }

});