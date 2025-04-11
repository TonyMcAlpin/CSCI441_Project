import { describe, it, expect, vi, beforeEach } from 'vitest';
import { deleteMedication } from '../public/js/medications/deleteMedication.js';

describe('Delete Medication Function', () => {
  const medicationId = '123'; // Example medicationId for testing

  beforeEach(() => {
    vi.restoreAllMocks();

    // Mock the global fetch function for successful DELETE request
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: 'Medication deleted successfully.' }),
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
    // Call the deleteMedication function
    await deleteMedication(medicationId);

    // Check if fetch was called with the correct URL and DELETE method
    expect(fetch).toHaveBeenCalledWith(
      `http://localhost:5000/api/medications/${medicationId}`,
      expect.objectContaining({ method: 'DELETE' })
    );
  });

  it('should handle errors properly when fetch fails', async () => {
    // Mock the fetch to simulate an error
    global.fetch = vi.fn(() => Promise.reject(new Error('Network error')));

    // Call deleteMedication function
    await deleteMedication(medicationId);

    // Ensure no alerts or reloads are triggered (we're not testing them)
    expect(global.fetch).toHaveBeenCalledTimes(1); // Fetch should be called once
  });

  it('should not call fetch if user cancels the confirmation', async () => {
    // Mock the confirm to return false (user cancels the deletion)
    vi.spyOn(window, 'confirm').mockReturnValue(false);

    // Call deleteMedication function
    await deleteMedication(medicationId);

    // Ensure fetch is not called
    expect(fetch).not.toHaveBeenCalled();
  });
});
