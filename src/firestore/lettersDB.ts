import { addDoc, collection, getFirestore } from "firebase/firestore";

export type LetterSentObject = {

};

const sendLetters = async (letter:LetterSentObject) => {
    const db = getFirestore();

    try {
        const docRef = await addDoc(collection(db, "letters"), letter);

        console.log("Document added Error : ", docRef.id);
    } catch(e) {
        console.error(e);
    }
};