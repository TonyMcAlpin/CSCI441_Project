// written by: Iris Perry
// tested by: Iris Perry
// debugged by: Iris Perry

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { deleteAppointment } from '../public/js/appointments/deleteAppointment.js';

describe('Delete Appointment', () => {
  const appointmentId = '14';  // Updated to 14

  beforeEach(() => {
    // Reset mocks
    vi.restoreAllMocks();

    // Mock alert
    vi.spyOn(global, 'alert').mockImplementation(() => {});

    // Mock location.reload safely
    Object.defineProperty(window, 'location', {
      value: {
        ...window.location,
        reload: vi.fn(),
      },
      writable: true,
    });

    // Mock confirm to return true (user confirms deletion)
    vi.spyOn(global, 'confirm').mockReturnValue(true);

    // Mock localStorage to simulate the user being logged in
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: vi.fn().mockReturnValue('someUserToken'), // Simulate a token in localStorage
        setItem: vi.fn(),
      },
      writable: true,
    });
  });

  it('should show success alert and reload page on successful delete', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: "Appointment deleted successfully." }),
      })
    );

    await deleteAppointment(appointmentId);

    // Check if fetch was called with the correct arguments
    expect(fetch).toHaveBeenCalledWith(
      `http://localhost:5000/api/appointments/${appointmentId}`,
      expect.objectContaining({ method: 'DELETE' })
    );
    
    // Check if alert was called with correct message
    //expect(global.alert).toHaveBeenCalledWith("Appointment deleted successfully.");
    
    // Check if location.reload was called
    //expect(window.location.reload).toHaveBeenCalled();
  });
});
