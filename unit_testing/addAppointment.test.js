// written by: Iris Perry
// tested by: Iris Perry
// debugged by: Iris Perry

import { describe, it, expect, vi } from 'vitest';

describe('Form Submission', () => {
  it('should submit the form and show success message when response is ok', async () => {
    // Set up the DOM to match your HTML
    document.body.innerHTML = `
      <form id="addAppForm" method="POST">
        <input type="date" class="form-control" name="app_date" id="appointmentDate" value="2025-04-10" />
        <input type="text" class="form-control" name="medical_title" id="medTitle" value="Dentist" />
        <input type="text" class="form-control" name="provider_name" id="medicalProfessional" value="Dr. Smith" />
        <input type="text" class="form-control" name="purpose" id="appointmentPurpose" value="Checkup" />
        <input type="tel" class="form-control" name="phone_number" id="phoneNumber" value="123-456-7890" />
        <input type="email" class="form-control" name="provider_email" id="email" value="doctor@clinic.com" />
        <button id="userSubmit" class="btn" type="submit">Submit</button>
      </form>
    `;

    // Mock the fetch function to return a successful response
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({}),
    });

    global.fetch = mockFetch;

    // Mock alert using vi.fn()
    const mockAlert = vi.fn();
    global.alert = mockAlert;

    // Create a mock for `location.reload`
    const reloadMock = vi.fn();

    // Use Object.defineProperty to replace the `reload` method on the location object
    Object.defineProperty(window, 'location', {
      value: {
        reload: reloadMock,
      },
      writable: true, // Allow reassigning the mock implementation
    });

    // Mock user_id in localStorage (simulate the user being logged in)
    localStorage.setItem('user_id', '12345'); // Simulate a logged-in user with user_id '12345'

    // Attach the event listener (using your original code)
    document.getElementById("addAppForm").addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(e.target);
      const formObject = Object.fromEntries(formData.entries());
      const user_id = localStorage.getItem("user_id");

      console.log('Form submitted, sending request...');

      try {
        const response = await fetch(`http://localhost:5000/api/appointments/${user_id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formObject),
        });

        console.log('Response from fetch:', response); // Log the fetch response

        if (response.ok) {
          console.log('Appointment added successfully, triggering alert...');
          alert("Appointment Added Successfully!");
          location.reload();
        } else {
          const error = await response.json();
          console.error("Error: ", error);
          alert("Error When Adding Appointment.");
        }
      } catch (err) {
        console.error("Error When Submitting Form: ", err);
        alert("Error When Submitting Form.");
      }
    });

    // Trigger form submission
    const form = document.getElementById('addAppForm');
    form.dispatchEvent(new Event('submit'));

    // Wait for the promise to resolve and the alert to be triggered
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Assert that the fetch was called with correct arguments
    expect(mockFetch).toHaveBeenCalledWith(
      'http://localhost:5000/api/appointments/12345', // Use the mocked user_id '12345'
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          app_date: '2025-04-10',
          medical_title: 'Dentist',
          provider_name: 'Dr. Smith',
          purpose: 'Checkup',
          phone_number: '123-456-7890',
          provider_email: 'doctor@clinic.com',
        }),
      })
    );

    // Assert that alert and reload were called on success
    expect(mockAlert).toHaveBeenCalledWith("Appointment Added Successfully!");
    expect(reloadMock).toHaveBeenCalled();
  });
});
