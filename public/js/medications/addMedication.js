document.getElementById("addMedForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get all form data
    const formData = new FormData(e.target);

    // Creates a Javascript Object out of the Form Entry Values
    const formObject = Object.fromEntries(formData.entries()); 

    // Grabs the user id from session storage to use in api call
    const user_id = sessionStorage.getItem("user_id");

    try{
        const response = await fetch(`http://localhost:5000/api/medications/${user_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formObject)
        });

        if(response.ok){
            alert("Medication Added Successfully!");
            location.reload();
        }
        else{
            const error = await response.json();
            console.error("Error: ", error);
            alert("Error When Adding Medication.");
        }
    }
    catch(err){
        console.error("Error When Submitting Form: ", err);
        console.alert("Error When Submitting Form.");
    }


});