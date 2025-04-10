import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('Add Medication Form Submission', () => {
  const formData = {
    start_date: '2025-04-01',
    end_date: '2025-04-30',
    prescriber: 'Dr. John Doe',
    med_name: 'Ibuprofen',
    quantity: '30',
    units: 'mg',
    frequency: 'Once a day',
    comments: 'Dizziness'
  };

  const userId = '28'; // Simulate a logged-in user ID

  beforeEach(() => {
    vi.restoreAllMocks();

    // Mock localStorage to simulate a logged-in user with a user_id
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: vi.fn().mockReturnValue(userId), // Simulate a user being logged in
      },
      writable: true,
    });

    // Mock fetch for success case
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        headers: { get: () => 'application/json' },
        json: () => Promise.resolve({ message: 'Medication Added Successfully!' })
      })
    );

    // Set up the modal structure manually before each test
    document.body.innerHTML = `
      <div class="col-md-4 col-sm-12 mx-auto">                
        <div class="card">
          <div class="card-header" style="background-color: #8b0000; color: white;">
            Add Medication
          </div>
          <div class="card-body" style="background-color: #ff6666; color:white;">
            <form id="addMedForm" method="post">
              <div class="mb-3">
                <label for="startDate" class="form-label">Start Date:</label>
                <input type="date" class="form-control" name="start_date" id="startDate">
              </div>
              <div class="mb-3">
                <label for="endDate" class="form-label">End Date:</label>
                <input type="date" class="form-control" name="end_date" id="endDate">
              </div>
              <div class="mb-3">
                <label for="prescriber" class="form-label">Prescriber:</label>
                <input type="text" class="form-control" name="prescriber" id="Prescriber" placeholder="Who Prescribed The Medication">
              </div>
              <div class="mb-3">
                <label for="medication" class="form-label">Medication:</label>
                <input type="text" class="form-control" name="med_name" id="medication" placeholder="Medication Name">
              </div>
              <div class="mb-3">
                <label for="quantity" class="form-label">Quantity:</label>
                <input type="text" class="form-control" name="quantity" id="quantity" placeholder="Number of Pills">
              </div>
              <div class="mb-3">
                <label for="units" class="form-label">Units:</label>
                <input type="text" class="form-control" name="units" id="units" placeholder="10 mg, 100 mcg, etc...">
              </div>
              <div class="mb-3">
                <label for="frequency" class="form-label">Frequency:</label>
                <input type="text" class="form-control" name="frequency" id="frequency" placeholder="How Often You Take the Medication">
              </div>
              <div class="mb-3">
                <label for="sideEffects" class="form-label">Side Effects:</label>
                <textarea name="comments" class="form-control" id="sideEffects" placeholder="Dizziness, Headaches, etc..."></textarea>
              </div>
              <button id="userSubmit" class="btn" type="submit" style="background-color: #8b0000; color: white;">Submit</button>
            </form>
          </div>
        </div>
      </div>
    `;

    // Initialize event listener for form submission
    document.getElementById("addMedForm").addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const formObject = Object.fromEntries(formData.entries()); 
      const user_id = localStorage.getItem("user_id");

      try {
        const response = await fetch(`http://localhost:5000/api/medications/${user_id}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formObject),
        });

        if (response.ok) {
          // Simulate success without alert or reload
        } else {
          const error = await response.json();
          console.error("Error: ", error);
        }
      } catch (err) {
        console.error("Error When Submitting Form: ", err);
      }
    });
  });

  it('should submit the form and trigger the POST request with the correct payload', async () => {
    // Populate the form fields with data
    document.getElementById('startDate').value = formData.start_date;
    document.getElementById('endDate').value = formData.end_date;
    document.getElementById('Prescriber').value = formData.prescriber;
    document.getElementById('medication').value = formData.med_name;
    document.getElementById('quantity').value = formData.quantity;
    document.getElementById('units').value = formData.units;
    document.getElementById('frequency').value = formData.frequency;
    document.getElementById('sideEffects').value = formData.comments;

    // Simulate form submission
    const form = document.getElementById('addMedForm');
    form.dispatchEvent(new Event('submit'));

    // Check if fetch was called with the correct URL and payload
    expect(fetch).toHaveBeenCalledWith(
      `http://localhost:5000/api/medications/${userId}`,
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify(formData),
      })
    );
  });
});
