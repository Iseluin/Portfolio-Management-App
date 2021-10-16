
import { firestore } from "../../firebaseConfig";

export function removeOneProp(object, propToBeRemoved) {
    const copyObj = { ...object };
    delete copyObj[propToBeRemoved];
    return copyObj;
}

export function setUserDocument(docTitle, docData) {
    return firestore.collection("users").doc(docTitle).set(docData);
}