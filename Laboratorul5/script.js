const students = [
    { id: 1, nume: "Ana Popescu", grupa: "SI-231", varsta: 19, specialitate: "DAW", avatar: "👩‍💻" },
    { id: 2, nume: "Mihai Rusu", grupa: "SI-231", varsta: 20, specialitate: "PTPP", avatar: "🧑‍💻" },
    { id: 3, nume: "Irina Ciobanu", grupa: "PR-232", varsta: 18, specialitate: "RC", avatar: "👩‍💻" },
    { id: 4, nume: "Andrei Munteanu", grupa: "PR-232", varsta: 21, specialitate: "C", avatar: "👨‍💻" },
    { id: 5, nume: "Vlad Ionescu", grupa: "SI-232", varsta: 20, specialitate: "TA", avatar: "🧑‍💻" },
    { id: 6, nume: "Elena Moraru", grupa: "SI-232", varsta: 19, specialitate: "DTTA", avatar: "👩‍🎓" }
];

let nextId = 7;

const form = document.getElementById("student-form");
const fields = {
    nume: document.getElementById("nume"),
    grupa: document.getElementById("grupa"),
    varsta: document.getElementById("varsta"),
    specialitate: document.getElementById("specialitate"),
    avatar: document.getElementById("avatar")
};
const formMessage = document.getElementById("form-message");
const studentsList = document.getElementById("students-list");
const emptyMessage = document.getElementById("empty-message");
const studentsCount = document.getElementById("students-count");
const gapInput = document.getElementById("gap");
const gapValue = document.getElementById("gap-value");

function createElement(tag, className, text) {
    const element = document.createElement(tag);
    if (className) {
        element.className = className;
    }
    if (text !== undefined) {
        element.textContent = text;
    }
    return element;
}

function createInfoRow(label, valueElement) {
    const row = createElement("p");
    row.append(createElement("span", "", label), valueElement);
    return row;
}

function createStudentCard(student) {
    const card = createElement("article", "student-card");

    const nameBlock = createElement("div");
    nameBlock.append(
        createElement("h3", "", student.nume),
        createElement("p", "", "Grupa: " + student.grupa)
    );

    const header = createElement("div", "card-header");
    header.append(createElement("div", "avatar", student.avatar), nameBlock);

    const info = createElement("div", "card-info");
    info.append(
        createInfoRow("Vârstă", createElement("strong", "", student.varsta + " ani")),
        createInfoRow("Specialitate", createElement("strong", "", student.specialitate)),
        createInfoRow("Statut", createElement("span", "status", "Înmatriculat"))
    );

    const deleteButton = createElement("button", "delete-button", "Șterge");
    deleteButton.type = "button";
    deleteButton.dataset.id = student.id;

    card.append(header, info, deleteButton);
    return card;
}

function renderStudents() {
    studentsList.replaceChildren(...students.map(createStudentCard));
    emptyMessage.hidden = students.length > 0;
    studentsCount.textContent = students.length;
}

function showMessage(text, type) {
    formMessage.textContent = text;
    formMessage.className = "form-message " + type;
}

function readForm() {
    return {
        nume: fields.nume.value.trim(),
        grupa: fields.grupa.value.trim(),
        varsta: fields.varsta.value,
        specialitate: fields.specialitate.value,
        avatar: fields.avatar.value
    };
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = readForm();

    if (Object.values(data).some((value) => !value)) {
        showMessage("Completați toate câmpurile.", "error");
        return;
    }

    const varsta = Number(data.varsta);

    if (!Number.isInteger(varsta) || varsta < 14 || varsta > 100) {
        showMessage("Vârsta trebuie să fie un număr întreg între 14 și 100.", "error");
        return;
    }

    students.push({ id: nextId++, ...data, varsta });
    form.reset();
    renderStudents();
    showMessage("Studentul a fost adăugat.", "success");
});

studentsList.addEventListener("click", (event) => {
    const button = event.target.closest(".delete-button");

    if (!button) {
        return;
    }

    const index = students.findIndex((student) => student.id === Number(button.dataset.id));

    if (index !== -1) {
        students.splice(index, 1);
        renderStudents();
    }
});

/* ex4: controlul proprietatilor Flexbox */
const flexProperties = {
    justify: "justifyContent",
    align: "alignItems",
    wrap: "flexWrap"
};

document.querySelectorAll("[data-control]").forEach((group) => {
    group.addEventListener("click", (event) => {
        const button = event.target.closest(".option-button");

        if (!button) {
            return;
        }

        group.querySelector(".active").classList.remove("active");
        button.classList.add("active");
        studentsList.style[flexProperties[group.dataset.control]] = button.dataset.value;
    });
});

gapInput.addEventListener("input", () => {
    studentsList.style.gap = gapInput.value + "px";
    gapValue.textContent = gapInput.value;
});

renderStudents();
