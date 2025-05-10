/* written by: Austin Hoelscher   
tested by: Isaac Nevarez-Saenz
debugged by: Isaac Nevarez-Saenz */

// requestDecision.js
const requestDecision = async (decision, request_id) => {

    if (decision === 'ACCEPT'){
        if (!confirm("Are you sure you want to Accept this request?")) return;
        try {
            const response = await fetch(`http://localhost:5000/api/requests/${request_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'accept_date': new Date().toISOString(),
                    'close_date': null
                })
            });

            if (response.ok) {
                alert("The Request Has Been Accepted. You Are Now Sharing This Record.");
                location.reload();
            }
            else {
                let errorText;
                try {
                    const error = await response.json();
                    errorText = error.message || JSON.stringify(error);
                } catch {
                    errorText = await response.text();
                }
                console.error("Error response:", errorText);
                alert("Error When Accepting Request: " + errorText);
            }
        }
        catch (err) {
            console.error("Error when accepting request: ", err);
            alert("Error when accepting request:");
        }
        return;
    }

    if (decision === 'DECLINE') {
        if (!confirm("Are you sure you want to Decline this request?")) return;
        try {
            const response = await fetch(`http://localhost:5000/api/requests/${request_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'close_date': new Date().toISOString()
                    //,'decline_date': new Date().toISOString() //will make specific to decline_date
                })
            });

            if (response.ok) {
                alert("The request has been declined.");
                location.reload();
            }

        }
        catch (err) {
            console.error("Error when declining request: ", err);
            alert("Error when declining request:");
        }
        return;
    }
    
    if (decision === 'STOP') {
        if (!confirm("Are you sure you want to Stop sharing data?")) return;
        try {
            const response = await fetch(`http://localhost:5000/api/requests/${request_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'close_date': new Date().toISOString()
                    //,'stop_date': new Date().toISOString() //will make specific to stop_date
                })
            });

            if (response.ok) {
                alert("The request has been stopped.");
                location.reload();
            }

        }
        catch (err) {
            console.error("Error when stopping request: ", err);
            alert("Error when stopping request:");
        }
        return;
    }

};


window.requestDecision = requestDecision;