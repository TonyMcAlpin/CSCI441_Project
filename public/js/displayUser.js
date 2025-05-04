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
            nameCell.textContent = `${user.first_name} ${user.last_name}`;

        }

    } catch (error) {
        console.error('Error fetching user name:', error);
        alert('Error fetching user name:', error);
    }
});