async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        console.log('Attempting fetch...'); // Add this log

        const response_user = await fetch('/api/login', {
            method: 'POST', // This should be POST
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        console.log('Response received:', response_user.status);

        const data = await response_user.json();

        console.log('Received data:', data);
        console.log('User ID:', data.user.user_id);
        console.log('User Name:', data.user.user_name);

        if (response_user.status === 200) {
            localStorage.setItem('userid', data.user.user_id);
            localStorage.setItem('username', data.user.user_name);
            if (data.user.user_name === username) {
                window.location.href = '/collection.html';
            }
            else {
                console.error('Failed to login:', data.error);
            }
        }
    }
    catch (error) {
            console.error('Failed to login:', error);
        }
    }

function register() {
        const regContainer = document.getElementById('reg-container');
        regContainer.innerHTML = `
        <input type="text" id="regusername" placeholder="register username" />
        <input type="password" id="regpassword" placeholder="register password" />
    `;
    }