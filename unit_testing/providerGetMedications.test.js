import { getPatientMedications } from '../public/js/requests/provider/getMedications';
import { vi, expect, it, describe, beforeEach, afterEach } from 'vitest';

describe('getPatientMedications', () => {
  let tableBody;

  beforeEach(() => {
    // Set up the DOM for the test
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
    // Cleanup mocks after each test
    vi.restoreAllMocks();
  });

  it('should create rows for each medication', async () => {
    const patient_id = '123'; // Sample patient ID
    const mockData = [
      {
        start_date: '2025-04-01',
        end_date: '2025-06-01',
        prescriber: 'Dr. Smith',
        med_name: 'Claritin',
        quantity: '30',
        units: 'mg',
        frequency: 'Daily',
        comments: 'For allergies'
      },
      {
        start_date: '2025-04-10',
        end_date: '2025-07-10',
        prescriber: 'Dr. Johnson',
        med_name: 'Ibuprofen',
        quantity: '50',
        units: 'mg',
        frequency: 'As needed',
        comments: 'For pain relief'
      }
    ];

    // Mock fetch response
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData)
    });

    await getPatientMedications(patient_id);

    // Verify the rows have been created
    const rows = tableBody.getElementsByTagName('tr');
    expect(rows.length).toBe(2); // We expect two rows to be created

    // Verifying the first row's data
    const firstRowCells = rows[0].getElementsByTagName('td');
    const expectedFirstStartDate = new Date('2025-04-01').toLocaleDateString('en-US');
    const expectedFirstEndDate = new Date('2025-06-01').toLocaleDateString('en-US');
    expect(firstRowCells[0].textContent).toBe(expectedFirstStartDate);
    expect(firstRowCells[1].textContent).toBe(expectedFirstEndDate);
    expect(firstRowCells[2].textContent).toBe('Dr. Smith');
    expect(firstRowCells[3].textContent).toBe('Claritin');
    expect(firstRowCells[4].textContent).toBe('30');
    expect(firstRowCells[5].textContent).toBe('mg');
    expect(firstRowCells[6].textContent).toBe('Daily');
    expect(firstRowCells[7].textContent).toBe('For allergies');

    // Verifying the second row's data
    const secondRowCells = rows[1].getElementsByTagName('td');
    const expectedSecondStartDate = new Date('2025-04-10').toLocaleDateString('en-US');
    const expectedSecondEndDate = new Date('2025-07-10').toLocaleDateString('en-US');
    expect(secondRowCells[0].textContent).toBe(expectedSecondStartDate);
    expect(secondRowCells[1].textContent).toBe(expectedSecondEndDate);
    expect(secondRowCells[2].textContent).toBe('Dr. Johnson');
    expect(secondRowCells[3].textContent).toBe('Ibuprofen');
    expect(secondRowCells[4].textContent).toBe('50');
    expect(secondRowCells[5].textContent).toBe('mg');
    expect(secondRowCells[6].textContent).toBe('As needed');
    expect(secondRowCells[7].textContent).toBe('For pain relief');
  });
});
