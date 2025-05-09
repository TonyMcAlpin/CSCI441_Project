import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { loadGoalProgress, getCurrentWeekRange } from "../public/js/activities/goalProgress";

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

describe("loadGoalProgress", () => {
    let originalFetch;
    let goalElement;

    beforeEach(() => {
        // Set up a fake DOM element
        goalElement = document.createElement("div");
        goalElement.id = "goal-progress";
        document.body.appendChild(goalElement);

        // Mock sessionStorage
        vi.spyOn(sessionStorage.__proto__, 'getItem').mockReturnValue("30");

        // Mock fetch
        originalFetch = global.fetch;
        global.fetch = vi.fn((url) => {
            if (url.includes("/goal/")) {
                return Promise.resolve({
                    json: () => Promise.resolve({ goal: 150 })
                });
            }
            if (url.includes("/total/")) {
                return Promise.resolve({
                    json: () => Promise.resolve({ total_duration: 90 })
                });
            }
        });
    });

    afterEach(() => {
        // Clean up DOM
        document.body.innerHTML = "";
        // Restore mocks
        vi.restoreAllMocks();
        global.fetch = originalFetch;
    });

    it("displays the correct goal progress", async () => {
        await loadGoalProgress();
        expect(goalElement.textContent).toBe("You've completed 90 / 150 minutes this week.");
    });

    it("shows error message on fetch failure", async () => {
        global.fetch = vi.fn(() => Promise.reject("Fetch failed"));

        const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
        await loadGoalProgress();

        expect(goalElement.textContent).toBe("Error loading goal progress.");
        expect(consoleSpy).toHaveBeenCalled();
    });
});
