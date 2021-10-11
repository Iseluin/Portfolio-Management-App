import firebaseApp from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA3FuxBx9wyrN_j9n57Xdg1KxM0O_1i-p0",
  authDomain: "portfolio-manager-736d5.firebaseapp.com",
  projectId: "portfolio-manager-736d5",
  storageBucket: "portfolio-manager-736d5.appspot.com",
  messagingSenderId: "89275337503",
  appId: "1:89275337503:web:914b851cf29f03d39a3e2a"
};

firebaseApp.initializeApp(firebaseConfig);

export const auth = firebaseApp.auth();
export const firestore = firebaseApp.firestore();

export default firebaseApp;