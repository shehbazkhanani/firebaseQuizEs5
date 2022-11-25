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
let OptionDisplay = document.getElementById("optionDisplay");
let name = document.getElementById("userName");


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
          window.location.replace('index.html')
        }
      });
}

UserCheck()

window.initialrender = function () {
  name.innerHTML = Data.firstName;
};

initialrender();

let arrOpt = [];
let questionValue = document.getElementById("questionInput");
let QuestionButton = document.getElementById("questionButton");
window.questionrender = function () {
    let show = document.getElementById("show")
    show.style.display = 'block'
    let questionValue = document.getElementById("questionInput");
  if(questionValue.value === "") {
    alert('kindly add Question field')
  }else{
    document.getElementById(
        "questionShow"
      ).innerHTML = `Question : ${questionValue.value}`;
    OptionDisplay.style.display = "block";
    questionValue.disabled = true;
    QuestionButton.disabled = true;
  }
};

let buttonSubmite = document.getElementById("SubmitArray");

window.optionrender = function () {
let optionValue = document.getElementById("optionInput");
if(optionValue.value === ""){
    alert("please insert option")
}else{
  buttonSubmite.disabled = false;
  arrOpt.push(optionValue.value);
  document.getElementById("OptionShow").innerHTML = "";
  for (let i = 0; i < arrOpt.length; i++) {
    document.getElementById(
      "OptionShow"
    ).innerHTML += `<input type="checkbox" class="option"  value="Option${
      i + 1
    } : ${arrOpt[i]}"> Option${i + 1} : ${arrOpt[i]} </input >`;
  }
  optionValue.value = "";
}
};

let corrrectAnswer = [];

window.SubmitArray = function () {
  let option = document.getElementsByClassName("option");
    for (let i = 0; i < option.length; i++) {
        if (option[i].checked) {
          let a = option[i].value;
          corrrectAnswer.push(a);
        }
      }
  let QuizData = {
    Question: questionValue.value,
    Option: arrOpt,
    CorrrectAnswer: corrrectAnswer,
  };
 if(corrrectAnswer.length > 0) {
  const reference = ref(database, 'QuizData/')
  push(reference, QuizData).then(function(){
      arrOpt = []
   let show = document.getElementById("show")
    alert('succfully submited') 
    questionValue.value = "";
    show.style.display = 'none'
    buttonSubmite.disabled = true;
    OptionDisplay.style.display = "none";
    questionValue.disabled = false;
    QuestionButton.disabled = false;
  }).catch(function(err){
    alert(err)
  })
}else{
    alert('plase click correctAnswer')
}
};

window.logout = function () {
    signOut(auth).then(() => {
        // Sign-out successful.
        window.location.replace('index.html')
      }).catch((error) => {
        // An error happened.
        alert(error)
      });
}
