import { db, auth } from "./base"

export function login(email, password) {
    return auth().signInWithEmailAndPassword(email, password)
}

export function logout() {
    return auth().signOut()
}

export function onAuthStateChanged(callback) {
    return auth().onAuthStateChanged(callback)
}

export async function signup({ email, password, displayName = "No Name" }) {
    try {
        const { user } = await auth().createUserWithEmailAndPassword(
            email,
            password
        );
        await user.updateProfile({ displayName });

        await db.doc(`users/${user.uid}`).set({
            displayName: displayName,
            uid: user.uid
        });
    } catch (e) {
        throw e;
    }
}
