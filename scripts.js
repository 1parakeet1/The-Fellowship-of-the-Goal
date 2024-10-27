document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    if (username) {
        document.getElementById('userName').innerText = username;
        document.getElementById('currentDate').innerText = new Date().toLocaleDateString("en-GB");
        document.getElementById('loginContainer').style.display = 'none';
        document.getElementById('mainContent').style.display = 'block';

        loadGoals(username);
    }
});

function openGoalPopup() {
    document.getElementById('goalPopup').style.display = 'flex';
}

function closeGoalPopup() {
    document.getElementById('goalPopup').style.display = 'none';
}

function submitGoal() {
    const goalText = document.getElementById('goalText').value;
    if (goalText) {
        addGoal(goalText);
        document.getElementById('goalText').value = '';
        closeGoalPopup();
    }
}

function addGoal(goalText) {
    const username = document.getElementById('userName').innerText;
    const goals = JSON.parse(localStorage.getItem(username)) || [];
    goals.push(goalText);
    localStorage.setItem(username, JSON.stringify(goals));

    displayGoals();
}

function displayGoals() {
    const goalList = document.getElementById('goalList');
    const username = document.getElementById('userName').innerText;
    goalList.innerHTML = '';

    const goals = JSON.parse(localStorage.getItem(username)) || [];
    goals.forEach(goalText => {
        const goalItem = document.createElement('li');
        goalItem.className = 'goalItem';
        goalItem.innerHTML = `<span class="goalItemText">${goalText}</span>`;
        goalItem.addEventListener('click', function () {
            goalItem.remove();
            removeGoal(goalText, username);
        });
        goalList.appendChild(goalItem);
    });
}

function removeGoal(goalText, username) {
    let goals = JSON.parse(localStorage.getItem(username)) || [];
    goals = goals.filter(goal => goal !== goalText);
    localStorage.setItem(username, JSON.stringify(goals));
}

function loadGoals(username) {
    displayGoals();
}
