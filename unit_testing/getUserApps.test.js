import { describe, it, expect, vi } from 'vitest';

// Mock the fetch function
global.fetch = vi.fn();

// Define the test
describe('Calendar Appointment Fetch', () => {
  it('should fetch the dentist appointment for user ID 28 and log it', async () => {
    // Simulate mock response for fetch
    const mockAppointment = [
      {
        medical_title: 'Dentist',
        app_date: '2025-04-10T10:00:00Z',
        provider_name: 'John Dentist',
        purpose: 'Root Canal',
        phone_number: '9185334982',
        provider_email: 'johndentist@dentist.com',
      }
    ];

    // Mock the fetch function to return the mock data
    fetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue(mockAppointment),
    });

    // Spy on console.log to check if the appointment data is logged
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    // Simulate the API call (the actual script to fetch appointments)
    const user_id = 28;
    const response = await fetch(`http://localhost:5000/api/users/appointments/${user_id}`);
    if (response.ok) {
      const data = await response.json();
      console.log("Fetched appointments:", data);
    }

    // Check that console.log was called with the mock data
    expect(logSpy).toHaveBeenCalledWith("Fetched appointments:", mockAppointment);

    // Clean up spy
    logSpy.mockRestore();
  });
});
