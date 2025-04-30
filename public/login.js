document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent form submission

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
            const data = await response.json();
            console.log("Login success:", data);


            localStorage.setItem('user_id', data.user.id);  
            localStorage.setItem('user_role', data.user.role);  

            
            setTimeout(() => {
                window.location.href = "index.html";  // Redirect after login success
            }, 1000);  
        } else {
            const errorData = await response.json();
            console.error("Login failed:", errorData);
            document.getElementById("loginError").textContent = errorData.message;
            document.getElementById("loginError").style.display = "block";
        }
    } catch (error) {
        console.error("Error during login:", error);
        document.getElementById("loginError").textContent = "An error occurred. Please try again later.";
        document.getElementById("loginError").style.display = "block";
    }
});
