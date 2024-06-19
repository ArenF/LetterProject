import { setDoc, addDoc, getDocs, collection, getFirestore, doc, getDoc, query, where } from "firebase/firestore";

// collection 는 doc의 집합
// doc은 컬렉션 중 하나의 doc이다.

const allProfiles = async () => {
    const db = getFirestore();
    return collection(db, "profiles");
}

const getProfileIfExists = async (id) => {
    const db = getFirestore();
    const docRef = doc(db, "profiles", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        console.log("not connected");
        return null;
    }
};

const getFriends = async (id) => {
    const profile = getProfile(id);
    profile.then((value) => {
        console.log(Object.keys(value.friendPoint));
    })
    .catch((err) => {
        console.log(err);
    });
};

const writeNewProfile = async ({displayName, uid}) => {
    const db = getFirestore();
    await setDoc(doc(db, "profiles", uid), {
        displayName: displayName,
        uid: uid,
        friendPoint: {},
    });
}

const writeNewProfileIfNotExists = async ({displayName, uid}) => {
    getProfileIfExists(uid).then((value) => {
        if (value == null) {
            writeNewProfile({displayName, uid});
        };
    })
    .catch((err) => {
        console.log(err);
    })
    // const profiles = allProfiles();
    // const querySnapshot = await getDocs(profiles);

    // querySnapshot.forEach((doc) => {
    //     if (doc.id === uid) 
    //         writeNewProfile({displayName, uid});
    // });
}

export { getProfileIfExists, getFriends, writeNewProfile, writeNewProfileIfNotExists };