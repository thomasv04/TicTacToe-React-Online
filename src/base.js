import Rebase from "re-base";
import firebase from "firebase/app";
import "firebase/database";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCohXmAD0xpToTcpK9Ep8E6M4PvpXxQuTU",
    authDomain: "morpion-7d249.firebaseapp.com",
    databaseURL: "https://morpion-7d249.firebaseio.com",
});

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp };

// this is a default export
export default base;
