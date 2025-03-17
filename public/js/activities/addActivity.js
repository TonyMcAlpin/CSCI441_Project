document.getElementById("addActForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    // Grab All Form Data
    const formData = new FormData(e.target);

    // Convert Form Data into Javascript Object
    const formObject = Object.fromEntries(formData.entries());

    // Grab the user_id from localstorage
    const user_id = localStorage.getItem("user_id");


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
            const error = await response.json();
            console.error("Error: ", error);
            alert("Error When Adding Activity.");
        }
    }
    catch(err){
        console.error("Error When Submitting Form: ", err);
        alert("Error When Submitting Form.");
    }

})