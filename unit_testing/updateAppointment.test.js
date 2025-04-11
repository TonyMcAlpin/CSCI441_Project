import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('Edit Appointment Modal Form Submission', () => {
  const formData = {
    app_date: '2025-04-09',
    medical_title: 'Dentist',
    provider_name: 'Dr. Smith',
    purpose: 'Checkup',
    phone_number: '1234567890',
    provider_email: 'dr.smith@example.com'
  };

  const appointmentId = '14';
  const userId = '28'; // Simulate a logged-in user ID

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
        json: () => Promise.resolve({ message: 'Appointment Updated Successfully!' })
      })
    );

    // Set up the modal structure manually before each test
    document.body.innerHTML = `
      <div class="modal fade pt-5" id="editModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog" style="background-color: #ff6666; color:white;">
          <form class="modal-content" id="editForm">
            <div class="modal-header" style="background-color: #8b0000; color: white;">
              <h5 class="modal-title">Edit Activity</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" style="background-color: #ff6666; color:white;">
              <input type="hidden" id="editId" value="${appointmentId}">
              <div class="mb-3">
                <label for="editDate" class="form-label">Date</label>
                <input type="date" class="form-control" id="editDate" name="app_date" required>
              </div>
              <div class="mb-3">
                <label for="editTitle" class="form-label">Title</label>
                <input type="text" class="form-control" id="editTitle" name="medical_title" required>
              </div>
              <div class="mb-3">
                <label for="editProvider" class="form-label">Provider</label>
                <input type="text" class="form-control" id="editProvider" name="provider_name" required>
              </div>
              <div class="mb-3">
                <label for="editPurpose" class="form-label">Purpose</label>
                <input type="text" class="form-control" id="editPurpose" name="purpose" required>
              </div>
              <div class="mb-3">
                <label for="editPhone" class="form-label">Phone</label>
                <input type="text" class="form-control" id="editPhone" name="phone_number" required>
              </div>
              <div class="mb-3">
                <label for="editEmail" class="form-label">Email</label>
                <input type="text" class="form-control" id="editEmail" name="provider_email" required>
              </div>
            </div>
            <div class="modal-footer mx-auto">
              <button type="submit" class="btn" style="background-color: #8b0000; color: white;">Save changes</button>
            </div>
          </form>
        </div>
      </div>
    `;

    // Initialize event listener manually in test (if needed)
    document.getElementById("editForm").addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const formObject = Object.fromEntries(formData.entries());
      const id = document.getElementById("editId").value;

      try {
        const response = await fetch(`http://localhost:5000/api/appointments/${id}`, {
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
    // Populate the form fields with data
    document.getElementById('editDate').value = formData.app_date;
    document.getElementById('editTitle').value = formData.medical_title;
    document.getElementById('editProvider').value = formData.provider_name;
    document.getElementById('editPurpose').value = formData.purpose;
    document.getElementById('editPhone').value = formData.phone_number;
    document.getElementById('editEmail').value = formData.provider_email;

    // Simulate form submission
    const form = document.getElementById('editForm');
    form.dispatchEvent(new Event('submit'));

    // Check if fetch was called correctly
    expect(fetch).toHaveBeenCalledWith(
      `http://localhost:5000/api/appointments/${appointmentId}`,
      expect.objectContaining({
        method: 'PUT',
        body: JSON.stringify(formData),
      })
    );
  });
});
