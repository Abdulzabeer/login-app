import * as firebase from "firebase";
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAjXA5AXj1h1Dp_NtMZkAc5jBZBm4ZR-_E",
  authDomain: "recentblog-961b5.firebaseapp.com",
  databaseURL: "https://recentblog-961b5.firebaseio.com",
  projectId: "recentblog-961b5",
  storageBucket: "",
  messagingSenderId: "620475153529",
  appId: "1:620475153529:web:c039fbb9b6791628"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const database = firebase.database().ref("/posts");
