function deleteAppointment(appointmentId) {
    if (!confirm("Are you sure you want to delete this appointment?")) return;

    fetch(`http://localhost:5000/api/appointments/${appointmentId}`, {
        method: "DELETE",
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
        console.log("About to reload page");

    
        location.reload(); 
    })
    .catch(err => {
        console.error("Error deleting appointment:", err);
        alert("Failed to delete appointment.");
    });
}

// export function for testing
export { deleteAppointment };