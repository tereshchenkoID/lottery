importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js')

const firebaseConfig = {
    apiKey: "AIzaSyAvKABIYHlTXoc66iSfX1xx9Oz_AZDbdMk",
    authDomain: "streetloto-3cafe.firebaseapp.com",
    projectId: "streetloto-3cafe",
    storageBucket: "streetloto-3cafe.appspot.com",
    messagingSenderId: "525496271590",
    appId: "1:525496271590:web:7dba85b4a0a1ffcbeff127"
};

firebase.initializeApp(firebaseConfig)

const messaging = firebase.messaging()