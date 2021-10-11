import {auth, firestore} from "../firebaseConfig";

const initialState = {
    isSignedIn: false,
    authCred: null,
    fireStoreDoc: null,
    credit: 10000,
}

export const attachListenerToUserDoc = (uid) => {
    return (dispatch) => {
      return firestore
        .collection("users")
        .doc(uid)
        .onSnapshot((doc) => {
          dispatch({ type: "getUpdatedUser", payload: doc.data() });
        });
    };
  };

export const listenForAuthChanges = () => {
    return (dispatch) => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          firestore
            .collection("users")
            .doc(user.uid)
            .get()
            .then((doc) => {
              const userReduxState = {
                isSignedIn: true,
                firestoreDoc: doc.data(),
                authCred: user,
              };
              dispatch({ type: "signedIn", payload: userReduxState });
              return userReduxState;
            })
            .then((userReduxState) => {
              dispatch(attachListenerToUserDoc(userReduxState.authCred.uid));
            });
        } else {
          dispatch({ type: "notSignedIn" });
        }
      });
    };
  };

const userReducer = (state = initialState, action) => {
    switch ( action.type) {
        case "signedIn":
            return {...action.payload};
        case "notSignedIn":
            return {...initialState};
        default:
            return state;
    }
};

export default userReducer;