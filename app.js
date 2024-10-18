// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAax7lvojIX8wp5E65pak4NgCCp7zG_xKc",
  authDomain: "modern-fitness-tracker.firebaseapp.com",
  projectId: "modern-fitness-tracker",
  storageBucket: "modern-fitness-tracker.appspot.com",
  messagingSenderId: "463905605574",
  appId: "1:463905605574:web:bd78375a5777c3d4b194c7"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference to Firebase Authentication
const auth = firebase.auth();

// Sign up with Email & Password
document.getElementById('signup-btn').addEventListener('click', function() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  auth.createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
      // User signed up successfully
      alert('Sign up successful!');
      window.location.href = 'dashboard.html'; // Redirect to dashboard after sign up
    })
    .catch(error => {
      alert('Error during sign up: ' + error.message);
    });
});

// Log in with Email & Password
document.getElementById('login-btn').addEventListener('click', function() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  auth.signInWithEmailAndPassword(email, password)
    .then(userCredential => {
      // User logged in successfully
      alert('Login successful!');
      window.location.href = 'dashboard.html'; // Redirect to dashboard after login
    })
    .catch(error => {
      alert('Error during login: ' + error.message);
    });
});

// Sign up / Log in with Google
document.getElementById('google-signup').addEventListener('click', function() {
  const provider = new firebase.auth.GoogleAuthProvider();
  
  auth.signInWithPopup(provider)
    .then(result => {
      // Google Sign in was successful
      alert('Google Sign in successful!');
      window.location.href = 'dashboard.html'; // Redirect to dashboard
    })
    .catch(error => {
      alert('Error during Google Sign in: ' + error.message);
    });
});

// Redirect to Dashboard if Logged In
auth.onAuthStateChanged(user => {
  if (user) {
    // User is logged in, redirect to dashboard
    window.location.href = 'dashboard.html';
  }
});
