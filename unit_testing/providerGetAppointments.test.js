import { vi } from 'vitest'; // Import vi from vitest
import { getPatientAppointments } from '../public/js/requests/provider/getAppointments';

describe('getPatientAppointments', () => {
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

  it('should create rows for each appointment', async () => {
    const patient_id = '123'; // Sample patient ID
    const mockData = [
      {
        app_date: '2025-04-15T00:00:00Z',
        app_time: '2025-04-15T09:00:00Z',
        medical_title: 'Dental Checkup',
        provider_name: 'Dr. Smith',
        purpose: 'Routine dental checkup',
        phone_number: '555-1234',
        provider_email: 'dr.smith@example.com',
      },
      {
        app_date: '2025-04-16T00:00:00Z',
        app_time: '2025-04-16T14:00:00Z',
        medical_title: 'Physical Therapy',
        provider_name: 'Dr. Johnson',
        purpose: 'Physical therapy session',
        phone_number: '555-5678',
        provider_email: 'dr.johnson@example.com',
      },
    ];

    // Mocking fetch to return resolved data
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    // Calling the function to test
    await getPatientAppointments(patient_id);

    // Checking that the rows are added correctly
    const rows = tableBody.getElementsByTagName('tr');
    expect(rows.length).toBe(2); // Two appointments, so two rows

    // Verifying the first row's data
    const firstRowCells = rows[0].getElementsByTagName('td');
    const expectedFirstDate = new Date('2025-04-15T00:00:00Z').toLocaleDateString('en-US');
    const expectedFirstTime = new Date('2025-04-15T09:00:00Z').toLocaleDateString('en-US', { hour: '2-digit', minute: '2-digit' });

    expect(firstRowCells[0].textContent).toBe(expectedFirstDate); // Expecting 4/15/2025
    expect(firstRowCells[1].textContent).toBe(expectedFirstTime); // Expecting 09:00 AM
    expect(firstRowCells[2].textContent).toBe('Dental Checkup'); // Expecting title
    expect(firstRowCells[3].textContent).toBe('Dr. Smith'); // Expecting provider
    expect(firstRowCells[4].textContent).toBe('Routine dental checkup'); // Expecting purpose
    expect(firstRowCells[5].textContent).toBe('555-1234'); // Expecting phone number
    expect(firstRowCells[6].textContent).toBe('dr.smith@example.com'); // Expecting email

    // Verifying the second row's data
    const secondRowCells = rows[1].getElementsByTagName('td');
    const expectedSecondDate = new Date('2025-04-16T00:00:00Z').toLocaleDateString('en-US');
    const expectedSecondTime = new Date('2025-04-16T14:00:00Z').toLocaleDateString('en-US', { hour: '2-digit', minute: '2-digit' });

    expect(secondRowCells[0].textContent).toBe(expectedSecondDate); // Expecting 4/16/2025
    expect(secondRowCells[1].textContent).toBe(expectedSecondTime); // Expecting 02:00 PM
    expect(secondRowCells[2].textContent).toBe('Physical Therapy'); // Expecting title
    expect(secondRowCells[3].textContent).toBe('Dr. Johnson'); // Expecting provider
    expect(secondRowCells[4].textContent).toBe('Physical therapy session'); // Expecting purpose
    expect(secondRowCells[5].textContent).toBe('555-5678'); // Expecting phone number
    expect(secondRowCells[6].textContent).toBe('dr.johnson@example.com'); // Expecting email
  });
});
