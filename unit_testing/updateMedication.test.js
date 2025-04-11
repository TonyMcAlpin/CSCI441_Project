import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('Edit Medication Modal Form Submission', () => {
  const formData = {
    start_date: '2025-04-09',
    end_date: '2025-05-09',
    prescriber: 'Suzanne Mallat',
    med_name: 'Claritin',
    quantity: '30',
    units: '10mg',
    frequency: 'Daily',
    comments: 'N/A',
  };

  const medicationId = '35';

  beforeEach(() => {
    vi.restoreAllMocks();

    // Mock fetch for success case
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        headers: { get: () => 'application/json' },
        json: () => Promise.resolve({ message: 'Medication Updated Successfully!' })
      })
    );

    // Set up the modal structure manually before each test
    document.body.innerHTML = `
      <div class="modal fade pt-5" id="editModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog" style="background-color: #ff6666; color:white;">
          <form class="modal-content" id="editForm" method="post">
            <div class="modal-header" style="background-color: #8b0000; color: white;">
              <h5 class="modal-title">Edit Medication</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" style="background-color: #ff6666; color:white;">
              <input type="hidden" id="editId" value="${medicationId}">
              <div class="mb-3">
                <label for="editStartDate" class="form-label">Start Date</label>
                <input type="date" class="form-control" id="editStartDate" name="start_date" required>
              </div>
              <div class="mb-3">
                <label for="editEndDate" class="form-label">End Date</label>
                <input type="date" class="form-control" id="editEndDate" name="end_date" required>
              </div>
              <div class="mb-3">
                <label for="editPrescriber" class="form-label">Prescriber</label>
                <input type="text" class="form-control" id="editPrescriber" name="prescriber" required>
              </div>
              <div class="mb-3">
                <label for="editMedName" class="form-label">Medication</label>
                <input type="text" class="form-control" id="editMedName" name="med_name" required>
              </div>
              <div class="mb-3">
                <label for="editQuantity" class="form-label">Quantity</label>
                <input type="number" class="form-control" id="editQuantity" name="quantity" required>
              </div>
              <div class="mb-3">
                <label for="editUnits" class="form-label">Units</label>
                <input type="text" class="form-control" id="editUnits" name="units" required>
              </div>
              <div class="mb-3">
                <label for="editFrequency" class="form-label">Frequency</label>
                <input type="text" class="form-control" id="editFrequency" name="frequency" required>
              </div>
              <div class="mb-3">
                <label for="editComments" class="form-label">Comments</label>
                <textarea class="form-control" id="editComments" name="comments"></textarea>
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
        const response = await fetch(`http://localhost:5000/api/medications/${id}`, {
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
    document.getElementById('editStartDate').value = formData.start_date;
    document.getElementById('editEndDate').value = formData.end_date;
    document.getElementById('editPrescriber').value = formData.prescriber;
    document.getElementById('editMedName').value = formData.med_name;
    document.getElementById('editQuantity').value = formData.quantity;
    document.getElementById('editUnits').value = formData.units;
    document.getElementById('editFrequency').value = formData.frequency;
    document.getElementById('editComments').value = formData.comments;

    // Simulate form submission
    const form = document.getElementById('editForm');
    form.dispatchEvent(new Event('submit'));

    // Check if fetch was called correctly
    expect(fetch).toHaveBeenCalledWith(
      `http://localhost:5000/api/medications/${medicationId}`,
      expect.objectContaining({
        method: 'PUT',
        body: JSON.stringify(formData),
      })
    );
  });
});
