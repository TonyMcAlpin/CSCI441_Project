import { describe, it, expect, vi, beforeEach } from 'vitest';
import { deleteActivity } from '../public/js/activities/deleteActivity.js';

describe('Delete Activity Function', () => {
  const activityId = '14'; // Example activityId for testing

  beforeEach(() => {
    vi.restoreAllMocks();

    // Mock the global fetch function
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: 'Activity deleted successfully.' }),
      })
    );

    // Mock global confirm to automatically return true for confirmation
    vi.spyOn(window, 'confirm').mockReturnValue(true);

    // Mock the location.reload method to prevent actual page reload
    Object.defineProperty(window, 'location', {
      value: { reload: vi.fn() },
      writable: true,
    });
  });

  it('should call fetch with DELETE method and the correct URL', async () => {
    // Call the deleteActivity function
    await deleteActivity(activityId);

    // Check if fetch was called with the correct URL and DELETE method
    expect(fetch).toHaveBeenCalledWith(
      `http://localhost:5000/api/activities/${activityId}`,
      expect.objectContaining({ method: 'DELETE' })
    );
  });

  it('should handle errors properly when fetch fails', async () => {
    // Mock the fetch to simulate an error
    global.fetch = vi.fn(() => Promise.reject(new Error('Network error')));

    // Call deleteActivity function
    await deleteActivity(activityId);

    // Ensure no alerts or reloads are triggered (we're not testing them)
    expect(global.fetch).toHaveBeenCalledTimes(1); // Fetch should be called once
  });
});
