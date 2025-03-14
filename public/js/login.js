document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault(); 

    const username = document.getElementById("username").value;
    const password = document.getElementById("pwd").value;

    const loginData = {
        username,
        password
    };

    try {
        
        const response = await fetch("http://localhost:5000/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginData)
        });

        if (response.ok) {
            // if successful 
            const data = await response.json();
            console.log("Login success:", data);
            // Grabs user_id from local storage for use with api calls
            localStorage.setItem("user_id", data.user.id);
            // Redirect to index.html
            window.location.href = "index.html"; 
        } else {
            // if credential are invalid
            const errorData = await response.json();
            document.getElementById("loginError").textContent = errorData.message;
            document.getElementById("loginError").style.display = "block";
        }
    } catch (error) {
        console.error("Error during login:", error);
        document.getElementById("loginError").textContent = "An error occurred. Please try again later.";
        document.getElementById("loginError").style.display = "block";
    }
});
