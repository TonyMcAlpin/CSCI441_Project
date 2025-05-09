// written by: Iris Perry
// tested by: Iris Perry
// debugged by: Iris Perry

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getPatientActivities } from '../public/js/requests/provider/getActivities';

describe('getPatientActivities', () => {
    let tableBody;
  
    beforeEach(() => {
      // Mocking the table element
      document.body.innerHTML = `
        <table>
          <thead>
            <tr id="tableHeaders"></tr>
          </thead>
          <tbody id="mtBody"></tbody>
        </table>
      `;
      tableBody = document.getElementById('mtBody');
  
      // Mocking the global fetch function
      vi.spyOn(global, 'fetch');
    });
  
    afterEach(() => {
      // Clean up mock after each test
      vi.restoreAllMocks();
    });
  
    it('should create rows for each activity', async () => {
      const patient_id = '123'; // Sample patient ID
      const mockData = [
        {
          act_date: '2025-04-15T00:00:00Z', // ISO 8601 format (UTC)
          duration: '60',
          comments: 'Walked 5 miles',
        },
        {
          act_date: '2025-04-16T00:00:00Z', // ISO 8601 format (UTC)
          duration: '45',
          comments: 'Jogged for 30 minutes',
        },
      ];
  
      // Mocking fetch to return resolved data
      fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockData),
      });
  
      // Calling the function to test
      await getPatientActivities(patient_id);
  
      // Checking that the rows are added correctly
      const rows = tableBody.getElementsByTagName('tr');
      expect(rows.length).toBe(2); // Two activities, so two rows
  
      // Verifying the first row's data
      const firstRowCells = rows[0].getElementsByTagName('td');
      // Adjusting the expected date for your time zone if necessary
      const expectedDate = new Date('2025-04-15T00:00:00Z').toLocaleDateString('en-US');
      expect(firstRowCells[0].textContent).toBe(expectedDate); // Expecting 4/15/2025 (or adjusted for time zone)
      expect(firstRowCells[1].textContent).toBe('60 minutes'); // Expecting 60 minutes
      expect(firstRowCells[2].textContent).toBe('Walked 5 miles'); // Expecting comment
  
      // Verifying the second row's data
      const secondRowCells = rows[1].getElementsByTagName('td');
      const secondExpectedDate = new Date('2025-04-16T00:00:00Z').toLocaleDateString('en-US');
      expect(secondRowCells[0].textContent).toBe(secondExpectedDate); // Expecting 4/16/2025
      expect(secondRowCells[1].textContent).toBe('45 minutes'); // Expecting 45 minutes
      expect(secondRowCells[2].textContent).toBe('Jogged for 30 minutes'); // Expecting comment
    });
  });