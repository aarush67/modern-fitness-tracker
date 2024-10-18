// Replace these with your own Firebase project settings
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

// Firebase Auth and Firestore references
const auth = firebase.auth();
const db = firebase.firestore();
