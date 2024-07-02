import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { Timestamp, doc, getFirestore, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { RegistState } from "src/reducer/regist";

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