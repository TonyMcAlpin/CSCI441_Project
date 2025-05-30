/* written by: Isaac Nevarez-Saenz 
tested by: Isaac Nevarez-Saenz
debugged by: Isaac Nevarez-Saenz */

function deleteMedication(medicationId) {
    if (!confirm("Are you sure you want to delete this medication?")) return;

    fetch(`http://localhost:5000/api/medications/${medicationId}`, {
        method: "DELETE",
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
        console.log("About to reload page");

    
        location.reload(); 
    })
    .catch(err => {
        console.error("Error deleting medication:", err);
        alert("Failed to delete medication.");
    });
}

window.deleteMedication = deleteMedication;

// export function for testing
export { deleteMedication };