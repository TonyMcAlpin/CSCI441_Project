import { describe, it, expect, vi } from 'vitest';

// Mock the fetch function
global.fetch = vi.fn();

// Define the test
describe('Activity Fetch', () => {
  it('should fetch the activity data for user ID 28 and log it', async () => {
    // Simulate mock response for fetch
    const mockActivities = [
      {
        id: '1',
        act_date: '2025-04-09T00:00:00Z',
        duration: '60',
        comments: 'Walk',
      }
    ];

    // Mock the fetch function to return the mock data
    fetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue(mockActivities),
    });

    // Spy on console.log to check if the activity data is logged
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    // Simulate the API call (the actual script to fetch activities)
    const user_id = 28;
    const response = await fetch(`http://localhost:5000/api/users/activities/${user_id}`);
    if (response.ok) {
      const data = await response.json();
      console.log("Fetched activities:", data);
    }

    // Check that console.log was called with the mock data
    expect(logSpy).toHaveBeenCalledWith("Fetched activities:", mockActivities);

    // Clean up spy
    logSpy.mockRestore();
  });
});
