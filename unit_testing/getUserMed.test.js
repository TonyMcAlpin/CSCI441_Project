import { describe, it, expect, vi } from 'vitest';

global.fetch = vi.fn();

describe('Medication Fetch', () => {
  it('should fetch the medication data for user ID 28 and log it', async () => {
    // Simulate mock response for fetch
    const mockMedications = [
      {
        id: '35', // Corrected medication ID
        start_date: '2025-04-09T00:00:00Z',
        end_date: '2025-05-09T00:00:00Z',
        prescriber: 'Suzanne Mallat',
        med_name: 'Claritin',
        quantity: '30',
        units: '10mg',
        frequency: 'Daily',
        comments: 'N/A',
      }
    ];

    // Mock the fetch function to return the mock data
    fetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue(mockMedications),
    });

    // Spy on console.log to check if the medication data is logged
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    // Simulate the API call (the actual script to fetch medications)
    const user_id = 28;
    const response = await fetch(`http://localhost:5000/api/users/medications/${user_id}`);
    if (response.ok) {
      const data = await response.json();
      console.log("Fetched medications:", data);
    }

    // Check that console.log was called with the mock data
    expect(logSpy).toHaveBeenCalledWith("Fetched medications:", mockMedications);

    // Clean up spy
    logSpy.mockRestore();
  });
});
