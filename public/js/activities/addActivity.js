document.getElementById("addActForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    // Grab All Form Data
    const formData = new FormData(e.target);

    // Convert Form Data into Javascript Object
    const formObject = Object.fromEntries(formData.entries());

    // Grab the user_id from sessionstorage
    const user_id = sessionStorage.getItem("user_id");


    try{
        const response = await fetch(`http://localhost:5000/api/activities/${user_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formObject)
        });

        if(response.ok){
            alert("Activity Added Successfully!");
            location.reload();
        }
        else{
            let errorText;
            try {
                const error = await response.json();
                errorText = error.message || JSON.stringify(error);
            } catch {
                errorText = await response.text();
            }
            console.error("Error response:", errorText);
            alert("Error When Updating Activity: " + errorText);
        }
    }
    catch(err){
        console.error("Error When Submitting Form: ", err);
        alert("Error When Submitting Form.");
    }

})