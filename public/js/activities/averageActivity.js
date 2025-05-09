/* written by:  
tested by: Isaac Nevarez-Saenz
debugged by: Isaac Nevarez-Saenz */

const form = document.getElementById('averageForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    // Get userId 
    const userId = sessionStorage.getItem("user_id"); 

    if (!userId) {
        console.error("User ID is not available in sessionStorage");
        document.getElementById('averageResult').textContent = "Error: User ID not found.";
        return;
    }

    try {
        const response = await fetch(`http://localhost:5000/api/activities/${userId}/average?start_date=${startDate}&end_date=${endDate}`, {
            method: 'GET',
        });

        const data = await response.json();

        if (response.ok) {  
            let avg = data.average_duration;
            avg = parseFloat(avg); 

            if (typeof avg === 'number' && !isNaN(avg)) {
                console.log(`Average activity duration: ${avg} minutes per day`);
                document.getElementById('averageResult').textContent = `Average: ${avg.toFixed(2)} minutes per day`;
            } else {
                console.log(`No activities found for the selected date range.`);
                document.getElementById('averageResult').textContent = `Average: N/A (No activities found)`;
            }
        } else {
            console.error("Server responded with error:", data.message);
            document.getElementById('averageResult').textContent = `Error: ${data.message}`;
        }
    } catch (error) {
        console.error("Error calculating average:", error);
        document.getElementById('averageResult').textContent = `Error calculating average. Please try again.`;
    }
});
