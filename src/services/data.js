import { collection, doc, getDoc, getDocs, deleteDoc, addDoc, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
export const getAllUsers = async () => {
    const users = [];
    const querySnapshot = await getDocs(collection(db, 'users'));

    querySnapshot.forEach((doc) => {

        users.push(doc.data())
    })
    return users
}

export const getMessages = async (uid, friendId) => {

    const messages = [];

    // const querySnapshot = await getDocs((collection(db, 'users', uid, 'messages', friendId, 'content')));
    const q = query(collection(db, 'users', uid, 'messages', friendId, 'content'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q)

    querySnapshot.forEach((doc) => {

        messages.push(doc.data())
    })
    return messages;
}

export const addMessage = async (ownerId, friendId, payload) => {

    await addDoc(collection(db, "users", ownerId, "messages", friendId, "content"), payload)
    await addDoc(collection(db, "users", friendId, "messages", ownerId, "content"), payload) //make a second record for the receiving party

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