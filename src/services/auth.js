import { signInWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail, updatePassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export const register = async (email, password, username) => {
    await createUserWithEmailAndPassword(auth, email, password).then((UserCredential) => {
        const user = UserCredential.user;
        //set username at register
        updateProfile(user, { displayName: username })
        return user
    }).catch((error) => {
        const errors = {
            errorCode: error.error,
            errorMessage: error.message
        }
        return errors;
    })
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