document.addEventListener('DOMContentLoaded', function() {
    console.log("PHER Page Loaded");

    const signupForm = document.getElementById("signupForm");

    signupForm.addEventListener("submit", async function(event) {
        event.preventDefault();  
        
        const formData = {
            username: document.getElementById("username").value,
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            userRole: document.getElementById("userRole").value, 
            email: document.getElementById("email").value,
            password: document.getElementById("pwd").value
        };

        // send data 
        try {
            const response = await fetch("http://localhost:5000/register", { 
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                alert("User registered successfully!");
                // redirect
                window.location.href = "LogIn.html";
            } else {
                alert(result.message || "Error during registration");
            }
        } catch (error) {
            console.error("Error during the registration request:", error);
            alert("An error occurred during registration.");
        }
    });
});




