import { db } from '../js/firebase.js';
import { collection, addDoc, serverTimestamp ,deleteDoc,doc,getDocs,updateDoc} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("appointmentForm");
  if (form) {
    form.addEventListener("submit", schedule);
  }
});

async function schedule(e) {
    e.preventDefault(); // Prevent form submission
    console.log("Meeting Scheduled");
    const name=document.getElementById('name').value.trim();
    const sub=document.getElementById('subject').value.trim();
    const date = document.getElementById('date').value.trim();
    const time= document.getElementById('time').value.trim();
    const maxstud= document.getElementById('maxstud').value.trim();
    const meeting=document.getElementById('meeting').value.trim();
   
if (!name||!sub||!date || !time || !maxstud ||!meeting ) {
    alert("Please fill all fields!");
    return;
}
    //Add to firestore
    try{
           const docRef= await addDoc(collection(db, "teacherScheduling"), {
       name,
       sub,
       date,
       time,
       maxstud,
       meeting,
      
        createdAt: serverTimestamp()
      });
      alert("Schedule  added successfully!");
      this.reset();
    }
    catch (error) {
  console.error("Error adding Schedule: ", error);
  alert("Error adding schedule. Please try again.");
}
}

// viewing the scheduling appointment by the teacher
const appointmentTableBody = document.getElementById("appointmentTableBody");
async function loadAppointments() {
  const snapshot = await getDocs(collection(db, "teacherScheduling"));
  snapshot.forEach((doc) => {
    const data = doc.data();
    const docId = doc.id;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${data.date || "N/A"}</td>
      <td>${data.time || "N/A"}</td>
      <td>${data.sub || "N/A"}</td>
      <td>${data.name || "N/A"}</td>
    <td>${data.meeting || "N/A"}</td>
      <td>${data.maxstud || "N/A"}</td>
     
    `;
    appointmentTableBody.appendChild(row);
  });
}
loadAppointments();


// confirming the schedule by teacher
document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.getElementById("bookedtableBody");

  async function confirmappointments() {
    const snapshot = await getDocs(collection(db, "bookedappointments"));
    
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const docId = docSnap.id;

      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${data.date || "N/A"}</td>
        <td>${data.message || "N/A"}</td>
        <td>${data.name || "N/A"}</td>
        <td>${data.subject || "N/A"}</td>
        <td>${data.time || "N/A"}</td>
        <td>
          <button class="edit-btn" onclick="updateStatus('${docId}')">Approve</button>
          <button class="delete-btn" onclick="deleteAppointment('${docId}')">Reject</button>
        </td>
      `;

      tableBody.appendChild(row);
    });
  }

  confirmappointments();
});
window.updateStatus = async function (id) {
  try {
    const ref = doc(db, "bookedappointments", id);
    await updateDoc(ref, {
      status: "confirmed" 
    });
    alert("Status updated!");
    location.reload();
  } catch (error) {
    console.error("Error updating status:", error);
  }
};

window.deleteAppointment = async function (id) {
  try {
    const ref = doc(db, "bookedappointments", id);
   await updateDoc(ref, {
      status: "Rejected" 
    });
    alert("Appointment Rejected!");
    location.reload();
  } catch (error) {
    console.error("Error rejecting appointment:", error);
  }
};


function toggleMenu() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('show');
}
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    hamburger.addEventListener('click', toggleMenu);
});