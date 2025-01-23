import { signInWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail, updatePassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { setDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
let errors = null;

export const register = (email, password, username) => {
    //TODO fix this stuff
    createUserWithEmailAndPassword(auth, email, password).then(async (UserCredential) => {
        const user = UserCredential.user;
        //set username at register
        await updateProfile(user, { displayName: username })

        const userId = user.uid;
        const payload = {
            email: user.email,
            username: user.displayName,
            chats: [],
            friends: [],
            invites: [],
        };
        await setDoc(doc(db, "users", userId), payload);
        return null;
    }).catch((error) => {
        return errors = {
            errorCode: error.error,
            errorMessage: error.message
        }
    })
    return errors;
}

export const login = async (email, password) => {

    await signInWithEmailAndPassword(auth, email, password).then((UserCredential) => {
        return UserCredential.user
    }).catch((error) => {

        return errors = {
            errorCode: error.code,
            errorMessage: error.message
        }
    })
    return errors
}
export const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    //result.user TODO save user to firestore
    return result
}

export const logout = () => {
    return auth.signOut();
}

export const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email)
}

export const changePassword = (password) => {
    return updatePassword(auth.currentUser, password)
}

export const changeUsername = async (newUsername) => {
    updateProfile(auth.currentUser, { displayName: newUsername }).then((res) => {
        return res;
    }).catch((errors) => {
        return errors
    });

    const usernameRef = doc(db, 'users', auth.currentUser.uid);
    await updateDoc(usernameRef, { username: newUsername })
}