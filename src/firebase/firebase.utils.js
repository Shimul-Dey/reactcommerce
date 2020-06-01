import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBWmohhk-apItbLt11xHuLwUvqZEepndBI",
    authDomain: "crwn-db-d3b2c.firebaseapp.com",
    databaseURL: "https://crwn-db-d3b2c.firebaseio.com",
    projectId: "crwn-db-d3b2c",
    storageBucket: "crwn-db-d3b2c.appspot.com",
    messagingSenderId: "512311550748",
    appId: "1:512311550748:web:d0d2887762231113d990d9"
  };

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
