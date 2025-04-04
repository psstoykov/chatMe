import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
export const getAllUsers = async () => {
    const users = [];
    const querySnapshot = await getDocs(collection(db, 'users'));

    querySnapshot.forEach((doc) => {

        users.push(doc.data())
    })
    return users
}