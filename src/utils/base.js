import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

var fireApp = firebase.initializeApp({
    apiKey: "AIzaSyB8ZEslQokqBych1O2Xn3v2MqknR363tlU",
    authDomain: "todo-list-react-434a6.firebaseapp.com",
    databaseURL: "https://todo-list-react-434a6.firebaseio.com",
    projectId: "todo-list-react-434a6",
    storageBucket: "todo-list-react-434a6.appspot.com",
    messagingSenderId: "331723167091",
    appId: "1:331723167091:web:15c9c7cd9e1035a2bae106"
});

const db = firebase.firestore();

export { db };

export default fireApp;
