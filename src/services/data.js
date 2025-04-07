import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
export const getAllUsers = async () => {
    const users = [];
    const querySnapshot = await getDocs(collection(db, 'users'));

    querySnapshot.forEach((doc) => {

        users.push(doc.data())
    })
    return users
}

export const getMyMessages = async (uid) => {
    const messages = [];

    const querySnapshot = await getDocs(collection(db, 'users', uid, "messages"))

    querySnapshot.forEach((doc) => {
        const result = doc.data();
        messages.push(result)
    })


    return messages;
}

export const getUserWithId = async (uid) => {

    const docRef = doc(db, 'users', uid)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
        const user = docSnap.data()
        return user
    } else {
        return null
    }

}