import { setDoc, addDoc, getDocs, collection, getFirestore, doc, getDoc } from "firebase/firestore";

const getDB = () => {
    return getFirestore();
}

const getProfile = async (id) => {
    const db = getFirestore();
    const docRef = doc(db, "profiles", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        console.log("not connected");
        return null;
    }
}

const getFriends = (id) => {
    const profile = getProfile(id);
    profile.then((value) => {
        console.log(Object.keys(value.friendPoint));
    })
    .catch((err) => {
        console.log(err);
    });
}

export { getProfile, getFriends };