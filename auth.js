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

// Sign Up with Google
document.getElementById('google-signup').addEventListener('click', function() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then(result => {
            // User successfully signed in
            console.log('Google sign-up successful', result.user);
            window.location.href = 'dashboard.html';
        })
        .catch(error => {
            console.error('Error during Google sign-up:', error);
            alert(error.message);
        });
});
