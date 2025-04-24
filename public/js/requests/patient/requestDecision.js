// requestDecision.js
const requestDecision = async (accepted, closed, request_id) => {
    switch (closed) {
        case 1:
            if (!confirm("Are you sure you want to Stop Sharing your record?")) return;
            try {
                const response = await fetch(`http://localhost:5000/api/requests/${request_id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        'accepted': 1,
                        'closed': 1
                    })
                });

                if (response.ok) {
                    alert("The Request Has Been Closed. You Are No Longer Sharing This Record.");
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
                    alert("Error When Closing Request: " + errorText);
                }
            }
            catch (err) {
                console.error("Error When Closing Request: ", err);
                alert("Error When Closing Request:");
            }
            return;
        default:
            break;
    }

    switch (accepted) {
        case 0:
            if (!confirm("Are you sure you want to Decline this request?")) return;
            try {
                const response = await fetch(`http://localhost:5000/api/requests/${request_id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        'accepted': 0,
                        'closed': 1
                    })
                });

                if (response.ok) {
                    alert("The Request Has Been Declined.");
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
                    alert("Error When Declining Request: " + errorText);
                }
            }
            catch (err) {
                console.error("Error When Declining Request: ", err);
                alert("Error When Declining Request:");
            }
            return;
        default:
            if (!confirm("Are you sure you want to Accept this request?")) return;
            try {
                const response = await fetch(`http://localhost:5000/api/requests/${request_id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        'accepted': 1,
                        'closed': 0
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
                console.error("Error When Accepting Request: ", err);
                alert("Error When Accepting Request:");
            }
            return;
    }
};


window.requestDecision = requestDecision;