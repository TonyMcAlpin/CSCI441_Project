document.addEventListener("DOMContentLoaded", () => {
    const logoutBtn = document.getElementById("logoutBtn");

    if (sessionStorage.getItem("user_id")) {
        // User is logged in, show the logout button
        if (logoutBtn) {
            logoutBtn.style.display = "inline-block";
            logoutBtn.addEventListener("click", () => {
                sessionStorage.clear();
                console.log("Logged out");
                window.location.href = "LogIn.html";
            });
        }
    } else {
        console.log("User not logged in");
    }
});