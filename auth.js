// Login with Email and Password
document.getElementById('login-btn').addEventListener('click', function() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            window.location.href = 'dashboard.html';
        })
        .catch(error => alert(error.message));
});

// Sign Up with Email and Password
document.getElementById('signup-btn').addEventListener('click', function() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
            alert('User registered successfully!');
            window.location.href = 'dashboard.html';
        })
        .catch(error => alert(error.message));
});

// Google Sign-In
document.getElementById('google-signin').addEventListener('click', function() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then(() => {
            window.location.href = 'dashboard.html';
        })
        .catch(error => alert(error.message));
});
