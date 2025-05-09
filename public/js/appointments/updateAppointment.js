// written by: Austin Hoelscher & Iris Perry
// tested by: Austin Hoelscher & Iris Perry, Isaac Nevarez-Saenz
// debugged by: Austin Hoelscher & Iris Perry, Isaac Nevarez-Saenz

document.getElementById("appEditForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    // Grab All Form Data
    const formData = new FormData(e.target);

    // Convert Form Data into Javascript Object
    const formObject = Object.fromEntries(formData.entries());

    // Grab the user_id from sessionstorage
    const id = document.getElementById("editId").value;


    try {
        const response = await fetch(`http://localhost:5000/api/appointments/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formObject)
        });

        const contentType = response.headers.get("Content-Type");

        if (response.ok) {
            alert("Appointment Updated Successfully!");
            location.reload();
        }
        else {
            let errorText;

            // Check content type to decide how to parse safely
            if (contentType && contentType.includes("application/json")) {
                const error = await response.json(); // only once
                errorText = error.message || JSON.stringify(error);
            } else {
                errorText = await response.text(); // fallback
            }

            console.error("Error response:", errorText);
            alert("Error When Updating Appointment: " + errorText);
        }
    }
    catch (err) {
        console.error("Error When Submitting Form: ", err);
        alert("Error When Submitting Form.");
    }

})