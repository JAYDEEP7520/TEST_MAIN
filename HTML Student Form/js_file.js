class Student {
    constructor(student_name, student_math_mark, student_english_mark, student_passing_year) {
        this.student_name = student_name;
        this.student_math_mark = Number(student_math_mark);
        this.student_english_mark = Number(student_english_mark);
        this.student_passing_year = Number(student_passing_year);
        this.creation_date = new Date().getDate() + " - " + new Date().getMonth() + 1 + " - " + new Date().getFullYear();
    }
    Calculate_Average() {
        return (this.student_math_mark + this.student_english_mark) / 2;
    }
}

let students = [];

document.addEventListener("DOMContentLoaded", function () {
    if (sessionStorage.getItem("students") == null)
        sessionStorage.setItem("students", JSON.stringify(students));
    else {
        students = JSON.parse(sessionStorage.getItem("students"));
        students.forEach(function (element, index) {
            students[index] = Object.assign(new Student, element);
        });
    }
});

const formdom = document.getElementById('form1');
formdom.addEventListener("submit", function (e) {
    e.preventDefault();
    students.push(new Student(formdom.student_name.value, formdom.math_mark.value, formdom.english_mark.value, formdom.Passing_year.value));
    sessionStorage.setItem("students", JSON.stringify(students));
    displayStudent();
    return false;
}, false);

function displayStudent() {
    let studentList = "";
    students.forEach(function (element, index) {
        studentList += `<tr>
                                            <td>${index + 1}</td>
                                            <td>${element.student_name}</td>
                                            <td>${element.student_math_mark}</td>
                                            <td>${element.student_english_mark}</td>
                                            <td>${element.student_passing_year}</td>
                                            <td>${element.Calculate_Average()}</td>
                                            <td>${element.creation_date}</td>
                                        </tr>`;
    });
    if (studentList != "") {
        const resultdom = document.getElementById('result');
        resultdom.innerHTML = `<table border = 1>
                                                    <tr>
                                                        <th> Sr No. </th>
                                                        <th> Student Name </th>
                                                        <th> Mathematics Mark </th>
                                                        <th> English Mark </th>
                                                        <th> Passing Year </th>
                                                        <th> Average Marks </th>
                                                        <th> Date of Creation </th>
                                                    </tr>
                                                    ${studentList}
                                                </table>`;
    }
}