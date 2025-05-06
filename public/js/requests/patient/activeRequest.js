// Pending Requests
document.addEventListener("DOMContentLoaded", async () => {

    const tableBody = document.getElementById("tableBody");
    const user_id = sessionStorage.getItem("user_id");
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

                if(request.close_date !== null || request.accept_date !== null){
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
                    requestDecision('ACCEPT',request.id);
                });

                const declineButton = document.createElement("button");
                declineButton.textContent = "Decline";
                declineButton.classList.add("btn", "btn-danger", "ms-1");
                statusCell.appendChild(declineButton);
                declineButton.addEventListener("click", () => {
                    requestDecision('DECLINE',request.id);
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

    const tableBody = document.getElementById("acceptedBody");
    const user_id = sessionStorage.getItem("user_id");
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

                if(request.close_date !== null || request.accept_date === null){
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

                const stopButton = document.createElement("button");
                stopButton.textContent = "Stop";
                stopButton.classList.add("btn", "btn-danger", "ms-1");
                statusCell.appendChild(stopButton);
                stopButton.addEventListener("click", () => {
                    requestDecision('STOP',request.id);
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