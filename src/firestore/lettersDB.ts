import { addDoc, collection, doc, DocumentData, getDocs, getFirestore, query, Timestamp, where } from "firebase/firestore";
import { LetterState, serializableToDate, StickerType } from "src/reducer/letter";
import { LoginState } from "src/reducer/login";

export type LetterSendObject = {
    background: string,
    content: string,
    title: string,
    fontFamily: string,
    stickers: StickerType[],
    target: string,
    author: string,
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
    letter:LetterState, login:LoginState,
):LetterSendObject {
    const written = new Date(letter.writtenDate);
    const sent = serializableToDate(letter.date);

    return {
        background: letter.background,
        content: letter.content,
        title: letter.title,
        fontFamily: letter.fontFamily,
        stickers: letter.stickers,
        target: letter.target,
        author: login.name,
        writtenDate: Timestamp.fromDate(written),
        sentDate: Timestamp.fromDate(sent),
    };
}

type callbacksArgs = {
    id: string,
    path: string,
};

export const sendLetters = async (letter:LetterSendObject, callback?:(args?:callbacksArgs) => void) => {
    const db = getFirestore();

    try {
        console.log(letter);
        const docRef = await addDoc(collection(db, "letters"), letter);
        
        const id = docRef.id;
        const path = docRef.path;

        console.log("Document has completed ", docRef.id);
        if (callback !== null) {
            callback({ id,path });
        }
    } catch(e) {
        console.error(e);
    }
};

export type LetterData = {
    id: string,
    data: DocumentData,
};

export const getLettersSent = async (author:string, callback?:(list:LetterData[]) => void):Promise<LetterData[]> => {
    const db = getFirestore();

    const docsRef = await getDocs(query(
        collection(db, "letters"),
        where("author", "==", author)
    ));
    const docs = docsRef.docs;

    const result = docs.map((value) => ({ 
        id: value.id,
        data: value.data(),
    }));

    if (callback !== null) {
        callback(result);
    }

    return result;
};