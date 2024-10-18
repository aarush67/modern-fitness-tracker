// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAax7lvojIX8wp5E65pak4NgCCp7zG_xKc",
    authDomain: "modern-fitness-tracker.firebaseapp.com",
    projectId: "modern-fitness-tracker",
    storageBucket: "modern-fitness-tracker.appspot.com",
    messagingSenderId: "463905605574",
    appId: "1:463905605574:web:bd78375a5777c3d4b194c7",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

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
            console.log('Google sign-up successful', result.user);
            window.location.href = 'dashboard.html';
        })
        .catch(error => {
            console.error('Error during Google sign-up:', error);
            alert(error.message);
        });
});
