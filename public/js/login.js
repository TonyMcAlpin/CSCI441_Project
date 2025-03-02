document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent form submission

    const username = document.getElementById("username").value;
    const password = document.getElementById("pwd").value;

    const loginData = {
        username,
        password
    };

    try {
        // Use the correct URL for your local server
        const response = await fetch("http://localhost:5000/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginData)
        });

        if (response.ok) {
            // Handle successful login
            const data = await response.json();
            console.log("Login success:", data);
            // Redirect to index.html
            window.location.href = "index.html"; // Replace with the correct path
        } else {
            // Handle failed login
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
