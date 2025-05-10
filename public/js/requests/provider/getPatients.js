/* written by: Austin Hoelscher
tested by: Austin Hoelscher
debugged by: Austin Hoelscher  */

document.addEventListener("DOMContentLoaded", async () => {


    const dropdown = document.getElementById("selectPatient");

    //const provider_id = localStorage.getItem("user_id");

    try{
        const response = await fetch('http://localhost:5000/api/users/patients', {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json'
            }
        });

        if(response.ok){

            const data = await response.json();

            dropdown.innerHTML = "<option selected disabled hidden>Select A Patient</option>";

            data.forEach(patient => {

                const option = document.createElement("option");
                option.name = "patient_id";
                option.id = "patient_id";
                option.value = patient.id;
                option.textContent = `${patient.last_name}, ${patient.first_name}`;
                
                dropdown.appendChild(option);

            });



        }


    }
    catch(err){
        console.log("Internal Server Error: ", err);
        alert("Internal Server Error: " + err);
    }
});