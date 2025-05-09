/* written by: Anthony McAlpin 
tested by: Anthony McAlpin 
debugged by: Anthony McAlpin  */


// Sets goal for duration of activity
document.getElementById("goal-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const goal = document.getElementById("goal-input").value;
    const userId = sessionStorage.getItem("user_id"); 

    if (!userId) {
        console.error("User ID not found in sessionStorage.");
        alert("You must be logged in to set a goal.");
        return;
    }

    try {
        const response = await fetch(`http://localhost:5000/api/users/goal/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ goal })
        });

        const result = await response.json();
        alert(result.message);
        location.reload();
    } catch (err) {
        console.error("Error setting goal:", err);
        alert("Failed to set goal.");
    }
});
