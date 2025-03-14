document.getElementById("addAppForm").addEventListener("submit", async (e) => {
    e.preventDefault();



    // Get all form data
    const formData = new FormData(e.target);

    // Creates a Javascript Object out of the Form Entry Values
    const formObject = Object.fromEntries(formData.entries());

    // Grabs the user id from local storage to use in api call
    const user_id = localStorage.getItem("user_id");

    try{
        const response = await fetch(`http://localhost:5000/api/appointments/${user_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formObject)
        });

        if(response.ok){
            alert("Appointment Added Successfully!");
        }
        else{
            const error = await response.json();
            console.error("Error: ", error);
            alert("Error When Adding Appointment.");
        }
    }
    catch(err){
        console.error("Error When Submitting Form: ", err);
        console.alert("Error When Submitting Form.");
    }








})

