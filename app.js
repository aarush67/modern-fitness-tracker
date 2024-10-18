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
const auth = firebase.auth();
const db = firebase.firestore();

// Handle Email Sign-Up
document.getElementById('emailSignUpBtn').addEventListener('click', function() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log("User signed up:", userCredential.user);
            // Redirect to dashboard
            window.location.href = 'dashboard.html';
        })
        .catch((error) => {
            console.error("Error during sign-up:", error.message);
            alert(error.message);
        });
});

// Handle Email Sign-In
document.getElementById('emailSignInBtn').addEventListener('click', function() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log("User signed in:", userCredential.user);
            window.location.href = 'dashboard.html';
        })
        .catch((error) => {
            console.error("Error during sign-in:", error.message);
            alert(error.message);
        });
});

// Handle Google Sign-In
document.getElementById('googleSignInBtn').addEventListener('click', function() {
    const provider = new firebase.auth.GoogleAuthProvider();

    auth.signInWithPopup(provider)
        .then((result) => {
            console.log("User signed in with Google:", result.user);
            window.location.href = 'dashboard.html';
        })
        .catch((error) => {
            console.error("Error during Google Sign-In:", error.message);
            alert(error.message);
        });
});

// Handle Sign Out
document.getElementById('signOutBtn').addEventListener('click', function() {
    auth.signOut()
        .then(() => {
            console.log("User signed out");
            window.location.href = 'index.html'; // Redirect to home after sign out
        })
        .catch((error) => {
            console.error("Error during sign-out:", error.message);
            alert(error.message);
        });
});

// Real-time Auth State Listener (to keep user logged in)
auth.onAuthStateChanged((user) => {
    if (user) {
        console.log("User is logged in:", user);
        document.getElementById('welcomeMessage').innerHTML = `Welcome, ${user.email || user.displayName}!`;
    } else {
        console.log("No user is logged in");
        document.getElementById('welcomeMessage').innerHTML = "You are not logged in.";
    }
});

// Function to add fitness data (calories, sleep, etc.)
function addFitnessData(type, value) {
    const user = auth.currentUser;

    if (user) {
        db.collection('users').doc(user.uid).collection('fitnessData').add({
            type: type,
            value: value,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            alert(`${type} data added successfully!`);
        }).catch((error) => {
            console.error("Error adding data:", error);
            alert(error.message);
        });
    } else {
        alert("Please sign in to add fitness data.");
    }
}

// Example: Adding fitness data for sleep and calories
document.getElementById('addSleepDataBtn').addEventListener('click', function() {
    const sleepHours = document.getElementById('sleepHours').value;
    addFitnessData('Sleep', sleepHours);
});

document.getElementById('addCaloriesDataBtn').addEventListener('click', function() {
    const caloriesBurned = document.getElementById('caloriesBurned').value;
    addFitnessData('Calories', caloriesBurned);
});

// Load fitness data from Firestore and display graph
function loadFitnessData() {
    const user = auth.currentUser;

    if (user) {
        db.collection('users').doc(user.uid).collection('fitnessData')
            .orderBy('timestamp', 'desc')
            .get()
            .then((querySnapshot) => {
                const fitnessData = [];
                querySnapshot.forEach((doc) => {
                    fitnessData.push(doc.data());
                });
                displayFitnessGraph(fitnessData);  // Function to display the graph
            })
            .catch((error) => {
                console.error("Error loading fitness data:", error);
            });
    } else {
        alert("Please sign in to view your fitness data.");
    }
}

// Example function to display fitness data graph (you can use a library like Chart.js)
function displayFitnessGraph(fitnessData) {
    // Implement a graph rendering logic here using your favorite charting library
    console.log(fitnessData); // Placeholder for actual graph implementation
}
