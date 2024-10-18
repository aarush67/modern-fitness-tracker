// Save fitness data to Firestore
document.getElementById('save-data').addEventListener('click', function() {
    const sleep = document.getElementById('sleep').value;
    const calories = document.getElementById('calories').value;

    const userId = firebase.auth().currentUser.uid;
    db.collection('users').doc(userId).collection('fitnessData').add({
        sleep: sleep,
        calories: calories,
        date: new Date()
    }).then(() => {
        alert('Data saved successfully!');
        updateChart();
    }).catch(error => alert(error.message));
});

// Update Chart
function updateChart() {
    const userId = firebase.auth().currentUser.uid;
    db.collection('users').doc(userId).collection('fitnessData').orderBy('date').get()
        .then(snapshot => {
            const data = snapshot.docs.map(doc => doc.data());
            const dates = data.map(d => new Date(d.date.seconds * 1000).toLocaleDateString());
            const sleepData = data.map(d => d.sleep);
            const caloriesData = data.map(d => d.calories);

            const ctx = document.getElementById('fitness-chart').getContext('2d');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: dates,
                    datasets: [
                        {
                            label: 'Sleep (hours)',
                            data: sleepData,
                            borderColor: 'blue',
                            fill: false
                        },
                        {
                            label: 'Calories Burned',
                            data: caloriesData,
                            borderColor: 'red',
                            fill: false
                        }
                    ]
                }
            });
        });
}

// Automatically load chart data on page load
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        updateChart();
    } else {
        window.location.href = 'index.html';
    }
});
