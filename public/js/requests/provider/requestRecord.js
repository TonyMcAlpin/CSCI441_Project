document.getElementById("recordRequest").addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const formObject = Object.fromEntries(formData.entries());


    const provider_id = sessionStorage.getItem("user_id");

    try{
        const response = await fetch(`http://localhost:5000/api/requests/${provider_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formObject)
        });

        if(response.ok){
            alert("Request Made Successfully!");
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
        console.error("Error Making Request: ", err);
        alert(`Error Making Request:\n ${err}`);
    }


});