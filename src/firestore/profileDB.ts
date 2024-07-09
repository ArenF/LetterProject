import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { Timestamp, collection, doc, getDoc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore";
import { getBlob, getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { ReactNode } from "react";
import { RegistState } from "src/reducer/regist";

export type ProfileData = {
    name: string,
    photo: Blob,
}

function base64ToFile(base:string, filename:string):File {
    let arr = base.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
            
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        
        return new File([u8arr], filename, {type:mime});
}

export async function addProfile(uid:string, registData:RegistState) {
    const storage = getStorage();
    const db = getFirestore();

    const photo:File = base64ToFile(registData.photo, uid);

    const profilePath = ref(storage, 'profile/' + uid);
    
    uploadBytes(profilePath, photo).then((snapshot) => {
        console.log("");
    })
    .catch((error) => {
        console.log(error);
    })
    
    const profileRef = doc(db, "profiles", uid);

    await setDoc(profileRef, {
        uid: uid,
        displayName: registData.name, 
        friends: {},
        profileDate: Timestamp.fromDate(new Date())
    });
}

export async function getProfile(uid:string) {
    const storage = getStorage();
    const db = getFirestore();
    
    try {
        // const photoUrl = await getDownloadURL(ref(storage, "profile/" + uid));
        const photo = await getBlob(ref(storage, "profile/" + uid));

        const profileRef = doc(db, "profiles", uid);
        const profileSnapshot = await getDoc(profileRef);

        const result:ProfileData = {
            name: profileSnapshot.data().displayName,
            photo: photo,
        };

        return result;

    } catch(error) {
        console.error(error);
    }
}

async function allUids() {
    const db = getFirestore();

    const snapshot = await getDocs(collection(db, "profiles"));
    
    return snapshot.docs.map((value, number) => {
        const uid = value.id;
        return uid;
    });
}

export async function allProfiles(
    callback:(list:ProfileData[]) => void = (list) => {},
) {
    const uids:string[] = await allUids();

    const profiles:ProfileData[] = await Promise.all(
        uids.map(async (value, number) => {
            return await getProfile(value);
        }),
    );

    callback(profiles);
}

export async function getAllProfiles(
    callback:(list:ProfileData[]) => void = (list) => {},
) {
    const db = getFirestore();

    const snapshot = await getDocs(collection(db, "profiles"));
    
    // snapshot.forEach((doc) => {
    //     const profile = getProfile(doc.id);
    //     profile.then()
    // });

    try {
        const snapshot = await getDocs(collection(db, "profiles"));
        let profiles:ProfileData[] = [];
        snapshot.forEach(async (doc) => {
            const profile = await getProfile(doc.id);
            profiles = [
                ...profiles,
                profile,
            ];
        });

        callback(profiles);
        return profiles;
    } catch (error) {
        console.error(error);
    }
}
