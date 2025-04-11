import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('Add Activity Form Submission', () => {
  const formData = {
    act_date: '2025-04-09',
    activityDuration: '60', // duration in minutes
    comments: 'Went for a run'
  };

  const userId = '123'; // Simulate a logged-in user ID

  beforeEach(() => {
    vi.restoreAllMocks();

    // Mock localStorage to simulate a logged-in user with a user_id
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: vi.fn().mockReturnValue(userId), // Return user ID as logged-in user
      },
      writable: true,
    });

    // Mock fetch for success case
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        headers: { get: () => 'application/json' },
        json: () => Promise.resolve({ message: 'Activity Added Successfully!' })
      })
    );

    // Set up the form structure manually before each test
    document.body.innerHTML = `
      <form id="addActForm">
        <input type="date" name="act_date" />
        <input type="text" name="activityDuration" />
        <input type="text" name="comments" />
        <button type="submit">Submit</button>
      </form>
    `;

    // Initialize event listener manually in test (if needed)
    document.getElementById("addActForm").addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(e.target);
      const formObject = Object.fromEntries(formData.entries());
      const user_id = localStorage.getItem("user_id");

      try {
        const response = await fetch(`http://localhost:5000/api/activities/${user_id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formObject),
        });

        if (!response.ok) {
          let errorText;
          try {
            const error = await response.json();
            errorText = error.message || JSON.stringify(error);
          } catch {
            errorText = await response.text();
          }
          console.error("Error response:", errorText);
        }
      } catch (err) {
        console.error("Error When Submitting Form: ", err);
      }
    });
  });

  it('should submit the form and trigger the POST request with the correct payload', async () => {
    // Populate the form fields with data
    document.querySelector('input[name="act_date"]').value = formData.act_date;
    document.querySelector('input[name="activityDuration"]').value = formData.activityDuration;
    document.querySelector('input[name="comments"]').value = formData.comments;

    // Simulate form submission
    const form = document.getElementById('addActForm');
    form.dispatchEvent(new Event('submit'));

    // Check if fetch was called correctly
    expect(fetch).toHaveBeenCalledWith(
      `http://localhost:5000/api/activities/${userId}`,
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify(formData),
      })
    );
  });
});
