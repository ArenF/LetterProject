import { addDoc, collection, getFirestore, Timestamp } from "firebase/firestore";
import { LetterState, serializableToDate, StickerType } from "src/reducer/letter";

export type LetterSendObject = {
    background: string,
    content: string,
    title: string,
    fontFamily: string,
    stickers: StickerType[],
    target: string,
    writtenDate: Timestamp,
    sentDate: Timestamp,
};

export type createLetterArgs = {
    state: LetterState,
    target: string,
    writtenDate: Date,
    sentDate: Date,
};

export function createLetterSendObject(
    state:LetterState
):LetterSendObject {
    const written = new Date(state.writtenDate);
    const sent = serializableToDate(state.date);

    return {
        background: state.background,
        content: state.content,
        title: state.title,
        fontFamily: state.fontFamily,
        stickers: state.stickers,
        target: state.target,
        writtenDate: Timestamp.fromDate(written),
        sentDate: Timestamp.fromDate(sent),
    };
}

const sendLetters = async (letter:LetterSendObject) => {
    const db = getFirestore();

    try {
        const docRef = await addDoc(collection(db, "letters"), letter);

        console.log("Document added Error : ", docRef.id);
    } catch(e) {
        console.error(e);
    }
};