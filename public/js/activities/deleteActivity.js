function deleteActivity(activityId) {
    if (!confirm("Are you sure you want to delete this activity?")) return;

    fetch(`http://localhost:5000/api/activities/${activityId}`, {
        method: "DELETE",
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);

    
        location.reload(); 
    })
    .catch(err => {
        console.error("Error deleting activity:", err);
        alert("Failed to delete activity.");
    });
}

window.deleteActivity = deleteActivity;

