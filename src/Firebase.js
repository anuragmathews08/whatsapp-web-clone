import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCw2k0-Cc2XZzFeQIOTe6Wi8GOzVXIEMGA",
    authDomain: "my-whatsapp1.firebaseapp.com",
    databaseURL: "https://my-whatsapp1.firebaseio.com",
    projectId: "my-whatsapp1",
    storageBucket: "my-whatsapp1.appspot.com",
    messagingSenderId: "297486084960",
    appId: "1:297486084960:web:8ea406c0e4797d92994c05",
    measurementId: "G-QPHWYEV6L2"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth, provider };
  export default db;