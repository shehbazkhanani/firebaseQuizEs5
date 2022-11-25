// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import {
  getDatabase,
  ref,
  set,
  onValue,
  onChildAdded
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

let email = document.getElementById("email");
let password = document.getElementById("password");

window.login = function(e) {
  e.preventDefault();
  let model = {
    email: email.value,
    password: password.value,
  };
//   console.log(model);
  signInWithEmailAndPassword(auth, model.email, model.password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      let reference = ref(database, `users`);
      onChildAdded(reference, (userdata) => {
        let val = userdata.val();
        if(val.email == model.email){
            localStorage.setItem('UserData', JSON.stringify(val))
        if(val.category == 'admin'){
            window.location.replace('admin.html')
        }else{
            window.location.replace('user.html')
        }
    }
      });
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  // window.location.replace('login.html')
}
