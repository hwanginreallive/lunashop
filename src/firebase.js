// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getStorage } from 'firebase/storage';
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyD0JdHc1VGwnHCmPZCSwBoXUj0p8gQw7lA',
    databaseURL: 'lunashop-3e976.firebaseapp.com',
    projectId: 'lunashop-3e976',
    storageBucket: 'lunashop-3e976.appspot.com',
    messagingSenderId: '231097072323',
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export const storage = getStorage(app);
