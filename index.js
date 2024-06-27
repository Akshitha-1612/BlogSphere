import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

  const firebaseConfig = {
    apiKey: "AIzaSyDhDdb5sIUfjcY9Y9aDAa3kzQN9PyV5tyA",
    authDomain: "notesapp-b43b2.firebaseapp.com",
    projectId: "notesapp-b43b2",
    storageBucket: "notesapp-b43b2.appspot.com",
    messagingSenderId: "264161377939",
    appId: "1:264161377939:web:42b3c7ec707f56d5675766",
    measurementId: "G-3HTE7WW0GC"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);



const loginToggle = document.getElementById('loginToggle');
const signupToggle = document.getElementById('signupToggle');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');


loginToggle.addEventListener('click', () => {
    loginForm.classList.add('active');
    signupForm.classList.remove('active');
    loginToggle.classList.add('active');
    signupToggle.classList.remove('active');
});
  
signupToggle.addEventListener('click', () => {
    signupForm.classList.add('active');
    loginForm.classList.remove('active');
    signupToggle.classList.add('active');
    loginToggle.classList.remove('active');
});

function displayError(message) {
  const errorMessage = document.createElement('div');
  errorMessage.classList.add('error-message');
  errorMessage.innerText = message;
  document.body.appendChild(errorMessage);
  setTimeout(() => {
    errorMessage.remove();
  }, 5000);
}

signupBtn.addEventListener("click", function(event) {
    event.preventDefault();
    var email = document.getElementById("signupEmail").value;
    var password = document.getElementById("signupPassword").value;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        window.location.href = 'home.html';
    })
    .catch((error) => {
        displayError(error.message);
    });
});

loginBtn.addEventListener("click", function(event) {
    event.preventDefault();
    var email = document.getElementById("loginEmail").value;
    var password = document.getElementById("loginPassword").value;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        window.location.href = 'home.html';
    })
    .catch((error) => {
      displayError(error.message);
    });
});


onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      window.location.href = 'home.html';
    }
});






