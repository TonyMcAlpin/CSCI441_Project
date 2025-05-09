/* written by: Anthony McAlpin 
tested by: Anthony McAlpin 
debugged by: Anthony McAlpin  */
function getCurrentWeekRange() {
    const today = new Date();
    const day = today.getDay(); 

    const currMinusMonday = (day === 0 ? -6 : 1 - day); 
    
    const monday = new Date(today);
    monday.setDate(today.getDate() + currMinusMonday);

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);

    const formatDate = (date) => date.toLocaleDateString("en-CA"); 

    return {
        start: formatDate(monday),
        end: formatDate(sunday)
    };
}

async function loadGoalProgress() {
    const userId = sessionStorage.getItem("user_id");  
    const goalEl = document.getElementById("goal-progress") || document.getElementById("dashboard-goal-progress");

    if (!userId || !goalEl) return;

    const { start, end } = getCurrentWeekRange();

    try {
        const [goalRes, totalRes] = await Promise.all([
            fetch(`http://localhost:5000/api/users/goal/${userId}`),
            fetch(`http://localhost:5000/api/activities/total/${userId}?week_start=${start}&week_end=${end}`)
        ]);

        const goalData = await goalRes.json();
        const totalData = await totalRes.json();

        const goal = goalData.goal || 0;
        const total = totalData.total_duration || 0;

        goalEl.textContent = `You've completed ${total} / ${goal} minutes this week.`;
    } catch (err) {
        console.error("Error loading goal progress:", err);
        goalEl.textContent = "Error loading goal progress.";
    }
}

document.addEventListener("DOMContentLoaded", loadGoalProgress);

export {loadGoalProgress, getCurrentWeekRange};
