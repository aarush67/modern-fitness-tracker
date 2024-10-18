// Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAax7lvojIX8wp5E65pak4NgCCp7zG_xKc",
    authDomain: "modern-fitness-tracker.firebaseapp.com",
    projectId: "modern-fitness-tracker",
    storageBucket: "modern-fitness-tracker.appspot.com",
    messagingSenderId: "463905605574",
    appId: "1:463905605574:web:bd78375a5777c3d4b194c7"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var auth = firebase.auth();
var db = firebase.firestore();

// Handle Google Sign-In
document.getElementById('googleSignInBtn').addEventListener('click', function() {
    var provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then(function(result) {
            console.log("User signed in:", result.user);
            showDashboard();
        })
        .catch(function(error) {
            console.error("Error during Google Sign-In:", error);
            alert(error.message);
        });
});

// Handle Email Sign-Up
document.getElementById('emailSignUpBtn').addEventListener('click', function() {
    var email = prompt("Enter your email:");
    var password = prompt("Enter your password:");

    auth.createUserWithEmailAndPassword(email, password)
        .then(function(userCredential) {
            console.log("User signed up:", userCredential.user);
            showDashboard();
        })
        .catch(function(error) {
            console.error("Error during sign-up:", error);
            alert(error.message);
        });
});

// Handle Email Sign-In
document.getElementById('emailSignInBtn').addEventListener('click', function() {
    var email = prompt("Enter your email:");
    var password = prompt("Enter your password:");

    auth.signInWithEmailAndPassword(email, password)
        .then(function(userCredential) {
            console.log("User signed in:", userCredential.user);
            showDashboard();
        })
        .catch(function(error) {
            console.error("Error during sign-in:", error);
            alert(error.message);
        });
});

// Handle Sign Out
document.getElementById('signOutBtn').addEventListener('click', function() {
    auth.signOut()
        .then(function() {
            console.log("User signed out");
            document.getElementById('signOutBtn').style.display = 'none';
            document.getElementById('dashboardSection').style.display = 'none';
            document.getElementById('signInSection').style.display = 'block';
        })
        .catch(function(error) {
            console.error("Error during sign-out:", error);
            alert(error.message);
        });
});

// Show dashboard after login
function showDashboard() {
    document.getElementById('signOutBtn').style.display = 'block';
    document.getElementById('dashboardSection').style.display = 'block';
    document.getElementById('signInSection').style.display = 'none';
}

// Store user fitness data
document.getElementById('fitnessForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const user = auth.currentUser;
    const sleep = document.getElementById('sleep').value;
    const caloriesBurned = document.getElementById('caloriesBurned').value;

    if (user) {
        db.collection('fitnessData').add({
            uid: user.uid,
            sleep: parseFloat(sleep),
            caloriesBurned: parseFloat(caloriesBurned),
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(function() {
            console.log("Data saved successfully.");
            displayChart(user.uid);
            document.getElementById('fitnessForm').reset(); // Reset the form
        })
        .catch(function(error) {
            console.error("Error storing fitness data:", error);
            alert(error.message);
        });
    } else {
        alert("You must be signed in to submit data.");
    }
});

// Display a chart for fitness data
function displayChart(uid) {
    db.collection('fitnessData').where("uid", "==", uid).orderBy("timestamp", "asc")
    .get()
    .then(function(querySnapshot) {
        const sleepData = [];
        const caloriesData = [];
        const labels = [];

        querySnapshot.forEach(function(doc) {
            const data = doc.data();
            sleepData.push(data.sleep);
            caloriesData.push(data.caloriesBurned);
            labels.push(new Date(data.timestamp.toDate()).toLocaleDateString());
        });

        const ctx = document.getElementById('fitnessChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    { label: 'Sleep (hours)', data: sleepData, borderColor: 'blue', fill: false },
                    { label: 'Calories Burned', data: caloriesData, borderColor: 'red', fill: false }
                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Amount'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Date'
                        }
                    }
                }
            }
        });
    })
    .catch(function(error) {
        console.error("Error loading chart data:", error);
        alert(error.message);
    });
}

// Check user authentication state on load
auth.onAuthStateChanged(function(user) {
    if (user) {
        console.log("User is signed in:", user);
        showDashboard();
        displayChart(user.uid); // Display chart immediately after sign in
    } else {
        console.log("No user is signed in");
    }
});
