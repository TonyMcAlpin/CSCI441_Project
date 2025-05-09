// written by: Iris Perry
// tested by: Iris Perry
// debugged by: Iris Perry

import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('Edit Activity Modal Form Submission', () => {
  const formData = {
    act_date: '2025-04-09',
    duration: '60',
    comments: 'Morning walk for 60 minutes'
  };

  const activityId = '14';

  beforeEach(() => {
    vi.restoreAllMocks();

    // Mock fetch for success case
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        headers: { get: () => 'application/json' },
        json: () => Promise.resolve({ message: 'Activity Updated Successfully!' })
      })
    );

    // Set up the modal structure manually before each test
    document.body.innerHTML = `
      <div class="modal fade pt-5" id="editModal" tabindex="-1" aria-hidden="true" >
        <div class="modal-dialog" style="background-color: #ff6666; color:white;">
          <form class="modal-content" id="editForm" method="post">
            <div class="modal-header" style="background-color: #8b0000; color: white;">
              <h5 class="modal-title">Edit Activity</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" style="background-color: #ff6666; color:white;">
              <input type="hidden" id="editId" value="${activityId}">
              <div class="mb-3">
                <label for="editDate" class="form-label">Date</label>
                <input type="date" class="form-control" id="editDate" name="act_date" required>
              </div>
              <div class="mb-3">
                <label for="editDuration" class="form-label">Duration</label>
                <input type="number" class="form-control" id="editDuration" name="duration" required>
              </div>
              <div class="mb-3">
                <label for="editDescription" class="form-label">Description</label>
                <input type="text" class="form-control" id="editDescription" name="comments" required>
              </div>
            </div>
            <div class="modal-footer mx-auto">
              <button type="submit" class="btn" style="background-color: #8b0000; color: white;">Save changes</button>
            </div>
          </form>
        </div>
      </div>
    `;

    // Initialize event listener for form submission
    document.getElementById("editForm").addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const formObject = Object.fromEntries(formData.entries());
      const id = document.getElementById("editId").value;

      try {
        const response = await fetch(`http://localhost:5000/api/activities/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formObject),
        });

        const contentType = response.headers.get("Content-Type");
        if (!response.ok) {
          let errorText;
          if (contentType && contentType.includes("application/json")) {
            const error = await response.json();
            errorText = error.message || JSON.stringify(error);
          } else {
            errorText = await response.text();
          }
          console.error("Error response:", errorText);
        }
      } catch (err) {
        console.error("Error When Submitting Form: ", err);
      }
    });
  });

  it('should submit the form and trigger the PUT request with the correct payload', async () => {
    // Populate the modal form with data
    document.getElementById('editDate').value = formData.act_date;
    document.getElementById('editDuration').value = formData.duration;
    document.getElementById('editDescription').value = formData.comments;

    // Simulate form submission
    const form = document.getElementById('editForm');
    form.dispatchEvent(new Event('submit'));

    // Check if fetch was called correctly
    expect(fetch).toHaveBeenCalledWith(
      `http://localhost:5000/api/activities/${activityId}`,
      expect.objectContaining({
        method: 'PUT',
        body: JSON.stringify(formData),
      })
    );
  });
});
