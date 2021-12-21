import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore'
import "firebase/storage"



export const app = firebase.initializeApp({
    apiKey: "AIzaSyCkGj9CdxV95Ubu-UZyJsgnh2G7zfDwxzE",
    authDomain: "task-manager-659a7.firebaseapp.com",
    projectId: "task-manager-659a7",
    storageBucket: "task-manager-659a7.appspot.com",
    messagingSenderId: "659143453547",
    appId: "1:659143453547:web:bac83a58ace3a236f8fa2e"
});