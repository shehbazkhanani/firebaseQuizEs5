// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
import {
  getAuth,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import {
  getDatabase,
  ref,
  push,
  onChildAdded,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDqSHv4MmXDDSZqtOT_mcQJ1xUOQboslbE",
  authDomain: "todofbma.firebaseapp.com",
  databaseURL: "https://todofbma-default-rtdb.firebaseio.com",
  projectId: "todofbma",
  storageBucket: "todofbma.appspot.com",
  messagingSenderId: "979238582230",
  appId: "1:979238582230:web:2f9a58b2847dfcd9c01677",
  measurementId: "G-74LQP1GRWB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const database = getDatabase();

let userData = localStorage.getItem("UserData");
let Data = JSON.parse(userData);
// console.log(Data, 'Dataa');

let userName = document.getElementById('name')

window.initialRender = function () {
    userName.innerHTML = Data.firstName
}

initialRender()


window.logout = function () {
    signOut(auth).then(() => {
        // Sign-out successful.
        window.location.replace('login.html')
      }).catch((error) => {
        // An error happened.
        alert(error)
      });
}

window.UserCheck = function () {
    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          // ...
        } else {
          // User is signed out
          // ...
          window.location.replace('login.html')
        }
      });
}

UserCheck()

window.playQuiz = function (){
window.location.replace('quiz.html')
}

let QuizArr = []

console.log(QuizArr, 'QuizDataaaa');

window.quizData = function () {
const reference = ref(database, 'QuizData')
   onChildAdded(reference, (e) => {
        const val = e.val()
        console.log(val);
        QuizArr.push(val)
    })
}

quizData()