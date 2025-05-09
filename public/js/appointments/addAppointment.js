// written by: Austin Hoelscher & Iris Perry
// tested by: Austin Hoelscher & Iris Perry
// debugged by: Austin Hoelscher & Iris Perry

document.getElementById("addAppForm").addEventListener("submit", async (e) => {
    e.preventDefault();



    // Get all form data
    const formData = new FormData(e.target);

    // Creates a Javascript Object out of the Form Entry Values
    const formObject = Object.fromEntries(formData.entries());

    console.log("Form Data:", formObject);

    

    // Grabs the user id from session storage to use in api call
    const user_id = sessionStorage.getItem("user_id");

    console.log("User ID:", user_id);

     // Validate user_id
     if (!user_id) {
        alert("User ID is missing. Please log in again.");
        return;
    }

    // Add user_id to the form data object before sending
    formObject.user_id = user_id;

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
            e.target.reset();
            location.reload();
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

