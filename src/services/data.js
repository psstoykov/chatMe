import { collection, doc, getDoc, getDocs, deleteDoc, addDoc, orderBy, query, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";


export const getAllUsers = async () => {
    const users = [];
    const q = query(collection(db, 'users'), orderBy('username', 'asc'))
    const querySnapshot = await getDocs(q)

    querySnapshot.forEach((doc) => {

        users.push(doc.data())
    })
    return users
}

export const getMyMessagesIds = async (uid) => {

    const res = [];

    const q = query(collection(db, 'users', uid, 'messages'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q)

    querySnapshot.forEach((doc) => {

        res.push(doc.data())
    })
    return res;
}

export const getMessages = async (uid, friendId) => {

    const messages = [];

    const q = query(collection(db, 'users', uid, 'messages', friendId, 'content'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q)

    querySnapshot.forEach((doc) => {
        const result = doc.data()
        result.docId = doc.id

        messages.push(result)
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

export const getFollowerById = async (uid, friendId) => {
    const docRef = doc(db, 'users', uid, 'following', friendId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return true
    } else {
        return false;
    }
}

export const followById = async (uid, friendId, username, friendUsername) => {
    await setDoc(doc(db, 'users', uid, 'following', friendId), { createdAt: Date.now(), uid: friendId, username: friendUsername })
    await setDoc(doc(db, 'users', friendId, 'followers', uid), { createdAt: Date.now(), uid: uid, username: username })

}

export const unfollowById = async (uid, friendId) => {

    await deleteDoc(doc(db, 'users', uid, 'following', friendId))
    await deleteDoc(doc(db, 'users', friendId, 'followers', uid))
}

export const getFollowStats = async (uid, follow) => {
    const result = []
    const querySnapshot = await getDocs(collection(db, 'users', uid, follow));
    querySnapshot.forEach((doc) => {
        result.push(doc.data());
    })
    return result
}

export const deleteMessage = async (uid, friendId, docId) => {

    await deleteDoc(doc(db, 'users', uid, 'messages', friendId, 'content', docId))
}