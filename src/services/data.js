import { collection, doc, getDoc, getDocs, deleteDoc, addDoc } from "firebase/firestore";
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


    const querySnapshot = await getDocs(collection(db, 'users', uid, 'messages'));

    querySnapshot.forEach((doc) => {

        messages.push(doc.data())
        console.log(messages)
    })
    return messages;
}

export const addMessage = async (ownerId, friendId, payload) => {

    await addDoc(collection(db, 'users', ownerId, 'messages'), payload)
    await addDoc(collection(db, 'users', friendId, 'messages'), payload)
    // await addDoc(collection(db, "users", ownerId, "messages", friendId, "content"), payload)

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

export const removeAccountFromDb = async (uid) => {
    await deleteDoc(doc(db, 'users', uid))
}