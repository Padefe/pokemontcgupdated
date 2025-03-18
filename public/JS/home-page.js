

async function login()
 {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {

        const response_user = await fetch('/api/auth?action=login', {
            method: 'POST', // This should be POST
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response_user.json();

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

async function register() {
    // Setting up the input fields
    const regContainer = document.getElementById('reg-container');
    regContainer.innerHTML = `
        <input type="text" id="regusername" placeholder="register username" />
        <input type="password" id="regpassword" placeholder="register password" />
        <button id="submit-register">Register</button>
    `;



    // Getting the values when the button is clicked
    document.getElementById('submit-register').addEventListener('click', async () => {
        const regname = document.getElementById('regusername').value;
        const regword = document.getElementById('regpassword').value;
        const email = `${regname}@example.com`;
        // Make sure both fields are filled out
        if (!regname || !regword) {
            alert("Both fields are required!");
            return;
        }

        // Send the request to the API
        const response = await fetch("/api/auth?action=register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, regword, regname })
        });

        const result = await response.json();

        if (result.success) {
            alert("Registration successful!");
        } else {
           alert("Error: " + result);
        }
    });
}
function logoutUser() {
    localStorage.removeItem("jwt_token"); // Remove token
    localStorage.removeItem("userid");
    localStorage.removeItem("username");
    window.location.href = "/"; // Redirect to login
}