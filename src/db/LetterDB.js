import { collection, doc, getDoc, getDocs, getFirestore, query, where } from "firebase/firestore"

const getDB = () => getFirestore();

const allLetters = () => {
    return collection(getDB(), "letters");
}

const getLettersWithReceiverId = async (id) => {
    const q = query(allLetters(), where("receiverId", "==", id));

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs;
};

const getLetterData = async (letterId) => {
    const letterRef = doc(allLetters(), letterId);
    const letterSnap = await getDoc(letterRef);

    if (letterSnap.exists()) {
        return letterSnap.data();
    } else {
        console.error("DB has occurred error.");
    }
}

export { allLetters, getLettersWithReceiverId, getLetterData }