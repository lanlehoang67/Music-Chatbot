import * as firebase from 'firebase';
const firebaseConfig = {
  apiKey: "AIzaSyCvI_xoUsnJDqKbP8vtZdEiZmdX24nxLiU",
  authDomain: "music-iwafam.firebaseapp.com",
  databaseURL: "https://music-iwafam.firebaseio.com",
  projectId: "music-iwafam",
  storageBucket: "music-iwafam.appspot.com",
  messagingSenderId: "822347136495",
  };
export const firebaseApp =firebase.initializeApp(firebaseConfig);

