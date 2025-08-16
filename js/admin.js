
import { db } from '../js/firebase.js';
import { collection, addDoc, serverTimestamp ,deleteDoc,doc,getDocs,updateDoc} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
// common utility function
window.addEventListener("DOMContentLoaded", function () {
  document.getElementById("addTeacherBtn").addEventListener("click", addTeacher);
});

// document.getElementById("addTeacherBtn").addEventListener("click", addTeacher);
async function addTeacher() {
  const name = document.getElementById('nameInput').value.trim();
  const dept = document.getElementById('deptInput').value.trim();
  const subject = document.getElementById('subjectInput').value.trim();
  const email = document.getElementById('emailInput').value.trim();
  


  if (!name || !dept || !subject ||!email) {
    alert("Please fill all fields!");
    return;
  }


  //Add to firestore
   try { 
   const docRef= await addDoc(collection(db, "teachers"), {
        name,
        department: dept,
        subject,
        email,
        createdAt: serverTimestamp()
      });
  const table = document.getElementById("teacherTable").getElementsByTagName('tbody')[0];

  const newRow = table.insertRow();  // inserts at the end by default

  const nameCell = newRow.insertCell(0);
  const deptCell = newRow.insertCell(1);
  const subjectCell = newRow.insertCell(2);
    const emailCell = newRow.insertCell(3);
    //Add action cell
    const actionCell = newRow.insertCell(4);
     actionCell.innerHTML = `
      <button class="edit-btn">✏️</button>
      <button class="delete-btn">🗑️</button>
    `;

    // Add listeners
    actionCell.querySelector(".edit-btn").addEventListener("click", () => editRow(newRow));
    actionCell.querySelector(".delete-btn").addEventListener("click", () => deleteRow(newRow, docRef.id));

  nameCell.innerText = name;
  deptCell.innerText = dept;
  subjectCell.innerText = subject;
  emailCell.innerText = email;
  // Clear inputs
  document.getElementById('nameInput').value = "";
  document.getElementById('deptInput').value = "";
  document.getElementById('subjectInput').value = "";
  document.getElementById('emailInput').value = "";
  alert("Teacher added successfully!");
}
catch (error) {
  console.error("Error adding teacher: ", error);
  alert("Error adding teacher. Please try again.");
}
};

//function edit row
async function editRow(row, docId) {
  const cells = row.getElementsByTagName("td");

  const name = prompt("Edit Name", cells[0].innerText);
  const dept = prompt("Edit Department", cells[1].innerText);
  const subject = prompt("Edit Subject", cells[2].innerText);
  const email = prompt("Edit Email", cells[3].innerText);

  if (name && dept && subject && email) {
    cells[0].innerText = name;
    cells[1].innerText = dept;
    cells[2].innerText = subject;
    cells[3].innerText = email;

    try {
      const docRef = doc(db, "teachers", docId);
      await updateDoc(docRef, {
        name,
        department: dept,
        subject,
        email,
      });
      alert("Teacher updated in Database!");
    } catch (error) {
      console.error("Error updating teacher:", error);
      alert("Failed to update teacher in Database.");
    }
  }
}

async function deleteRow(row, docId) {
  const confirmed = confirm("Are you sure you want to delete this teacher?");
  if (!confirmed) return;

  try {
    await deleteDoc(doc(db, "teachers", docId)); 
    row.remove();
  } catch (error) {
    console.error("Error deleting teacher:", error);
    alert("Error deleting teacher from Database.");
  }
}

async function showAllTeachers() {
  const tableBody = document.querySelector("#teacherTable tbody");
  tableBody.innerHTML = ""; // Clear previous data

  try {
    const snapshot = await getDocs(collection(db, "teachers"));

    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const docId = docSnap.id;

      const row = document.createElement("tr");

      const nameCell = document.createElement("td");
      nameCell.innerText = data.name;

      const deptCell = document.createElement("td");
      deptCell.innerText = data.department;

      const subjectCell = document.createElement("td");
      subjectCell.innerText = data.subject;

      const emailCell = document.createElement("td");
      emailCell.innerText = data.email;

      const actionCell = document.createElement("td");
      actionCell.innerHTML = `
        <button class="edit-btn">✏️</button>
        <button class="delete-btn">🗑️</button>
      `;

      // Append all cells to row
      row.appendChild(nameCell);
      row.appendChild(deptCell);
      row.appendChild(subjectCell);
      row.appendChild(emailCell);
      row.appendChild(actionCell);

      // Add row to table
      tableBody.appendChild(row);

      // Add event listeners
      actionCell.querySelector(".edit-btn").addEventListener("click", () => editRow(row, docId));
      actionCell.querySelector(".delete-btn").addEventListener("click", () => deleteRow(row, docId));
    });
  } catch (error) {
    console.error("Error fetching teachers:", error);
    alert("Failed to fetch teacher data.");
  }
}

window.addEventListener("DOMContentLoaded", showAllTeachers);
// approve registrations
const tableBody = document.querySelector("#registrationTable tbody");

async function fetchAllStudents() {
  const querySnapshot = await getDocs(collection(db, "Regstudents"));
  
  querySnapshot.forEach((docSnap) => {
    const data = docSnap.data();
    const docId = docSnap.id;

    const row = document.createElement("tr");
    row.innerHTML = `
    <td>${data.name || "N/A"}</td>
    <td>${data.phone || "N/A"}</td>
    <td>${data.section || "N/A"}</td>
      <td>${data.address || "N/A"}</td>
      <td>${data.class || "N/A"}</td>
      <td>${data.dob || "N/A"}</td>
      <td>${data.email || "N/A"}</td>
      <td>${data.fees || "N/A"}</td>
      <td>${data.gender || "N/A"}</td>
      <td>${data.language || "N/A"}</td>
      <td>${data.lastschool || "N/A"}</td>
      <td>
        <button onclick="approveStudent('${docId}')">Approve</button>
        <button onclick="rejectStudent('${docId}')">Reject</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

window.approveStudent = async function(id) {
  const studentRef = doc(db, "Regstudents", id);
  await updateDoc(studentRef, { status: "approved" });
  alert("Student Approved");
  location.reload(); // refresh to show updated status
};

window.rejectStudent = async function(id) {
  const studentRef = doc(db, "Regstudents", id);
  await updateDoc(studentRef, { status: "rejected" });
  alert("Student Rejected");
  location.reload(); // refresh to show updated status
};


window.addEventListener("DOMContentLoaded", fetchAllStudents);

function toggleMenu() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('show');
}
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    hamburger.addEventListener('click', toggleMenu);
});