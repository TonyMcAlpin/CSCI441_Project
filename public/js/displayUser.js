/* written by:  Isaac Nevarez-Saenz
tested by: Isaac Nevarez-Saenz
debugged by: Isaac Nevarez-Saenz */

document.addEventListener('DOMContentLoaded', async function getFullName() {

    const user_id = sessionStorage.getItem('user_id');

    try {

        const response = await fetch(`http://localhost:5000/api/users/${user_id}`, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json'
            }
        });

        if(response.ok){
            const user = await response.json();
        
            const nameCell = document.getElementById('fullName');
            if(nameCell){
                nameCell.textContent = `${user.first_name} ${user.last_name}`;
            }
            const dashboardTitle = document.title;
            document.title = `${dashboardTitle} ${user.first_name} ${user.last_name}`;
        }
        else {
            window.location.href = 'LogIn.html';
        }

    } catch (error) {
        console.error('Error fetching user name:', error);
        console.error('Directing to login page.', error);

        alert('Error fetching user name:', error);
        alert('Directing to login page.');

        window.location.href = 'LogIn.html';
    }
});