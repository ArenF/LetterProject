import { Timestamp, addDoc, collection, doc, getDoc, getDocs, getFirestore, query, where } from "firebase/firestore"
import { getProfilesWithName } from "./ProfileDB";

const getDB = () => getFirestore();

const allLetters = () => {
    return collection(getDB(), "letters");
}

const getLettersWithReceiverId = async (id) => {
    const q = query(allLetters(), where("receiverId", "==", id));

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs;
};

const getLettersWithSenderId = async (id) => {
    const q = query(allLetters(), where("senderId", "==", id));

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs;
}

const getLetterData = async (letterId) => {
    const letterRef = doc(allLetters(), letterId);
    const letterSnap = await getDoc(letterRef);

    if (letterSnap.exists()) {
        return letterSnap.data();
    } else {
        console.error("DB has occurred error.");
    }
}

const addNewLetter = async ({title, context, writtenDate, receiverName, senderName, background, stickers}) => {
    
    async function getIdIfSameId(name) {
        let id = "";
        getProfilesWithName(name)
        .then(value => {
            value.forEach((value) => {
                id = value.id;
            });
        })
        .catch((err) => {
            console.error(err);
            throw `${err}`;
        })

        return id;
    }

    let receiverId = await getIdIfSameId(receiverName);
    let senderId = await getIdIfSameId(senderName);

    getIdIfSameId(receiverName).then((value) => receiverId = value);
    getIdIfSameId(senderName).then((value) => senderId = value);

    const sentDate = writtenDate;
    sentDate.setHours(sentDate.getHours() + 3);

    const writtenDateStamp = Timestamp.fromDate(writtenDate);
    const sentDateStamp = Timestamp.fromDate(sentDate);
    

    const docRef = await addDoc(allLetters(), {
        title: title,
        context: context,
        writtenDate: writtenDateStamp,
        sentDate: sentDateStamp,
        receiverId: receiverId,
        senderId: senderId,
        background: background,
        stickers: stickers,
    });
    return docRef.id;
}

export { allLetters, getLettersWithReceiverId, getLettersWithSenderId, getLetterData, addNewLetter }