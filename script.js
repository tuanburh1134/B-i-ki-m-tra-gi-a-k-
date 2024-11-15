// JavaScript logic for login and form actions
function login() {
    const email = document.getElementById("email").value;
    let role;

    switch (email) {
        case "admin@edu.vn":
            role = "admin";
            break;
        case "gv@edu.vn":
            role = "gv";
            break;
        case "sv@edu.vn":
            role = "sv";
            break;
        default:
            alert("Email không hợp lệ.");
            return;
    }

    localStorage.setItem("userRole", role);
    window.location.href = "index.html";
}

function addStudent() {
    const name = document.getElementById("student-name").value;
    const dob = document.getElementById("dob").value;
    const avgGrade = parseFloat(document.getElementById("avg-grade").value);

    if (isNaN(avgGrade) || avgGrade < 0 || avgGrade > 10) {
        alert("Điểm TB phải từ 0 đến 10.");
        return;
    }

    const studentData = {
        name,
        dob,
        avgGrade
    };

    const studentList = JSON.parse(localStorage.getItem("studentList") || "[]");
    studentList.push(studentData);
    localStorage.setItem("studentList", JSON.stringify(studentList));
    alert("Sinh viên đã được thêm!");

    if (avgGrade > 8.5) {
        if (confirm("SV này có điểm xuất sắc?")) {
            displayStudentList();
        } else {
            document.getElementById("add-student-form").reset();
        }
    } else {
        displayStudentList();
    }
}

function displayStudentList() {
    const studentList = JSON.parse(localStorage.getItem("studentList") || "[]");
    const studentTable = document.getElementById("student-table");

    studentTable.innerHTML = `<tr>
        <th>MSSV</th>
        <th>Họ tên</th>
        <th>Ngày sinh</th>
        <th>Điểm TB</th>
    </tr>`;

    studentList.forEach((student, index) => {
        const row = studentTable.insertRow();
        row.insertCell(0).innerText = index + 1;
        row.insertCell(1).innerText = student.name;
        row.insertCell(2).innerText = student.dob;
        row.insertCell(3).innerText = student.avgGrade;
    });
}

document.addEventListener("DOMContentLoaded", function() {
    const userRole = localStorage.getItem("userRole");
    if (userRole !== "admin") {
        document.getElementById("add").style.display = "none";
    }

    if (window.location.pathname.endsWith("index.html")) {
        displayStudentList();
    }
});
