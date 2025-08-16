import { db } from '../js/firebase.js';
import { collection, addDoc, serverTimestamp ,deleteDoc,doc,getDocs,updateDoc} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
// document.getElementById("registrationForm").addEventListener("submit", addStudent);
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registrationForm");
  if (form) {
    form.addEventListener("submit", addStudent);
  }
});




async function addStudent(e) {
    e.preventDefault(); // Prevent form submission
    console.log("Form submitted");
    const name = document.getElementById('name').value.trim();
    const email= document.getElementById('email').value.trim();
    const phone= document.getElementById('phone').value.trim();
    const gender=document.getElementById('gender').value.trim();
    const dob=document.getElementById('dob').value.trim();
    const lastschool=document.getElementById('lastschool').value.trim();
    const language=document.getElementById('language').value.trim();
    const classname=document.getElementById('class').value.trim();
    const section=document.getElementById('section').value.trim();
    const address=document.getElementById('address').value.trim();
    const fees=document.getElementById('fees').value.trim();
if (!name || !email || !phone ||!gender || !dob || !lastschool || !language || !classname || !section || !address || !fees) {
    alert("Please fill all fields!");
    return;
}
    //Add to firestore
    try{
           const docRef= await addDoc(collection(db, "Regstudents"), {
       name,
       email,
       phone,
       gender,
       dob,
       lastschool,
       language,
         class: classname,
        section,
         address,
        fees,
        createdAt: serverTimestamp()
      });
      alert("Student added successfully!");
       
    }
    catch (error) {
  console.error("Error adding students: ", error);
  alert("Error adding students. Please try again.");
}
}


// Book Appointment 


document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("bookform");
  if (form) {
    form.addEventListener("submit", book);
  }
});

async function book(e) {
    e.preventDefault(); // Prevent form submission
    console.log("Booking Confirmed");
    const name=document.getElementById('name').value.trim();
    const sub=document.getElementById('subject').value.trim();
    const date = document.getElementById('date').value.trim();
    const time= document.getElementById('time').value.trim();
    const message=document.getElementById('message').value.trim();
   
if (!name||!sub||!date || !time ||!message ) {
    alert("Please fill all fields!");
    return;
}
    //Add to firestore
    try{
           const docRef= await addDoc(collection(db, "bookedappointments"), {
       name,
       sub,
       date,
       time,
       message,
      
        createdAt: serverTimestamp()
      });
      alert("Booking  added successfully!");
      e.target.reset();
    }
    catch (error) {
  console.error("Error adding Booking: ", error);
  alert("Error adding Booking. Please try again.");
}
}

function toggleMenu() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('show');
}
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    hamburger.addEventListener('click', toggleMenu);
});