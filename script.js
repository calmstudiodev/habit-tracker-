const habitInput = document.getElementById("habitInput");
const goalInput = document.getElementById("goalInput");
const addBtn = document.getElementById("addBtn");
const habitList = document.getElementById("habitList");
const progressText = document.getElementById("progressText");

let habits = JSON.parse(localStorage.getItem("habits")) || [];

function saveHabits() {
    localStorage.setItem("habits", JSON.stringify(habits));
}

function updateProgress() {
    let totalGoal = 0;
    let totalDone = 0;

    habits.forEach(function(habit) {
        totalGoal += Number(habit.goal);
        totalDone += Number(habit.done);
    });

    progressText.textContent = "Today: " + totalDone + " / " + totalGoal + " completed";
}

function renderHabit(habit) {
    const li = document.createElement("li");
    const plusBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");

    plusBtn.textContent = "+";
    deleteBtn.textContent = "X";

    li.textContent = habit.name + " (" + habit.done + " / " + habit.goal + ")";

    plusBtn.addEventListener("click", function(event) {
        event.stopPropagation();

        if (habit.done < habit.goal) {
            habit.done++;
        }

        saveHabits();
        renderAllHabits();
    });

    deleteBtn.addEventListener("click", function(event) {
        event.stopPropagation();

        habits = habits.filter(function(item) {
            return item.id !== habit.id;
        });

        saveHabits();
        renderAllHabits();
    });

    li.appendChild(plusBtn);
    li.appendChild(deleteBtn);
    habitList.appendChild(li);
}

function renderAllHabits() {
    habitList.innerHTML = "";

    habits.forEach(function(habit) {
        renderHabit(habit);
    });

    updateProgress();
}

addBtn.addEventListener("click", function() {
    if (habitInput.value.trim() === "") {
        return;
    }

    const habit = {
        id: Date.now(),
        name: habitInput.value.trim(),
        goal: Number(goalInput.value) || 1,
        done: 0
    };

    habits.push(habit);
    saveHabits();
    renderAllHabits();

    habitInput.value = "";
    goalInput.value = "";

    habitInput.focus();
});

habitInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        goalInput.focus();
    }
});

goalInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addBtn.click();
    }
});

renderAllHabits();