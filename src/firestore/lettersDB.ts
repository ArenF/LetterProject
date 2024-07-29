import { addDoc, collection, getFirestore, Timestamp } from "firebase/firestore";
import { LetterState, StickerType } from "src/reducer/letter";

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
    {
        state, target, writtenDate, sentDate,
    }:createLetterArgs
):LetterSendObject {
    return {
        background: state.background,
        content: state.content,
        title: state.title,
        fontFamily: state.fontFamily,
        stickers: state.stickers,
        target: target,
        writtenDate: Timestamp.fromDate(writtenDate),
        sentDate: Timestamp.fromDate(sentDate),
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