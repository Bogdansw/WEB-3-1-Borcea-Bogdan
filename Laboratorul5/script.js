const students = [
    {
        id: 1,
        nume: "Ana Popescu",
        grupa: "SI-231",
        varsta: 19,
        specialitate: "DAW",
        avatar: "👩‍💻"
    },
    {
        id: 2,
        nume: "Mihai Rusu",
        grupa: "SI-231",
        varsta: 20,
        specialitate: "PTPP",
        avatar: "🧑‍💻"
    },
    {
        id: 3,
        nume: "Irina Ciobanu",
        grupa: "PR-232",
        varsta: 18,
        specialitate: "RC",
        avatar: "👩‍💻"
    },
    {
        id: 4,
        nume: "Andrei Munteanu",
        grupa: "PR-232",
        varsta: 21,
        specialitate: "C",
        avatar: "👨‍💻"
    },
    {
        id: 5,
        nume: "Vlad Ionescu",
        grupa: "SI-232",
        varsta: 20,
        specialitate: "TA",
        avatar: "🧑‍💻"
    }
];

let nextId = 6;

const form = document.getElementById("student-form");
const nameInput = document.getElementById("nume");
const groupInput = document.getElementById("grupa");
const ageInput = document.getElementById("varsta");
const specialtyInput = document.getElementById("specialitate");
const avatarInput = document.getElementById("avatar");
const formMessage = document.getElementById("form-message");
const studentsList = document.getElementById("students-list");
const emptyMessage = document.getElementById("empty-message");
const studentsCount = document.getElementById("students-count");
const gapInput = document.getElementById("gap");
const gapValue = document.getElementById("gap-value");

function showMessage(text, type) {
    formMessage.textContent = text;
    formMessage.className = "form-message " + type;
}

function updateCount() {
    studentsCount.textContent = students.length;
}

function createStudentCard(student) {
    const card = document.createElement("article");
    card.className = "student-card";

    const header = document.createElement("div");
    header.className = "card-header";

    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.textContent = student.avatar;

    const nameBlock = document.createElement("div");

    const name = document.createElement("h3");
    name.textContent = student.nume;

    const group = document.createElement("p");
    group.textContent = "Grupa: " + student.grupa;

    nameBlock.append(name, group);
    header.append(avatar, nameBlock);

    const info = document.createElement("div");
    info.className = "card-info";

    const ageRow = document.createElement("p");
    const ageLabel = document.createElement("span");
    ageLabel.textContent = "Vârstă: ";
    const ageValue = document.createElement("strong");
    ageValue.textContent = student.varsta + " ani";
    ageRow.append(ageLabel, ageValue);

    const specialtyRow = document.createElement("p");
    const specialtyLabel = document.createElement("span");
    specialtyLabel.textContent = "Specialitate: ";
    const specialtyValue = document.createElement("strong");
    specialtyValue.textContent = student.specialitate;
    specialtyRow.append(specialtyLabel, specialtyValue);

    const statusRow = document.createElement("p");
    const statusLabel = document.createElement("span");
    statusLabel.textContent = "Statut: ";
    const status = document.createElement("span");
    status.className = "status";
    status.textContent = "Înmatriculat";
    statusRow.append(statusLabel, status);

    info.append(ageRow, specialtyRow, statusRow);

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete-button";
    deleteButton.dataset.id = student.id;
    deleteButton.textContent = "Șterge";

    card.append(header, info, deleteButton);
    return card;
}

function renderStudents() {
    studentsList.innerHTML = "";

    students.forEach((student) => {
        studentsList.append(createStudentCard(student));
    });

    emptyMessage.hidden = students.length > 0;
    updateCount();
}

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const nume = nameInput.value.trim();
    const grupa = groupInput.value.trim();
    const varsta = Number(ageInput.value);
    const specialitate = specialtyInput.value;
    const avatar = avatarInput.value;

    if (!nume || !grupa || !ageInput.value || !specialitate || !avatar) {
        showMessage("Completați toate câmpurile.", "error");
        return;
    }

    if (!Number.isInteger(varsta) || varsta < 14 || varsta > 100) {
        showMessage("Vârsta trebuie să fie un număr întreg între 14 și 100.", "error");
        return;
    }

    students.push({
        id: nextId,
        nume: nume,
        grupa: grupa,
        varsta: varsta,
        specialitate: specialitate,
        avatar: avatar
    });

    nextId++;
    form.reset();
    renderStudents();
    showMessage("Studentul a fost adăugat.", "success");
});

studentsList.addEventListener("click", function (event) {
    const button = event.target.closest(".delete-button");

    if (!button) {
        return;
    }

    const id = Number(button.dataset.id);
    const index = students.findIndex((student) => student.id === id);

    if (index !== -1) {
        students.splice(index, 1);
        renderStudents();
    }
});

document.querySelectorAll("[data-control]").forEach((group) => {
    group.addEventListener("click", function (event) {
        const button = event.target.closest(".option-button");

        if (!button) {
            return;
        }

        group.querySelectorAll(".option-button").forEach((item) => {
            item.classList.remove("active");
        });
        button.classList.add("active");

        if (group.dataset.control === "justify") {
            studentsList.style.justifyContent = button.dataset.value;
        }

        if (group.dataset.control === "align") {
            studentsList.style.alignItems = button.dataset.value;
        }

        if (group.dataset.control === "wrap") {
            studentsList.style.flexWrap = button.dataset.value;
        }
    });
});

gapInput.addEventListener("input", function () {
    studentsList.style.gap = gapInput.value + "px";
    gapValue.textContent = gapInput.value;
});

renderStudents();
