import { addDoc, collection, getDocs, getFirestore, query, where } from "firebase/firestore";

// 친구 요청은 아래로 정리됨
// 친구 요청은 받은 상태로 id들이 저장됨
// 친구 요청이 수락되면 accepted = true 로 설정 및 둘을 친구로 저장
// 친구 요청이 거절되면 accepted = false 로 상태를 삭제함
export type RequestType = {
    receiveId: string,
    requestId: string,
    accepted: boolean,
};

export async function sendFriendsRequest(
    data:RequestType,
) {
    const db = getFirestore();

    try {
        const docRef = await addDoc(collection(db, "friendsRequest"), data);
    } catch(e) {
        console.error('Error adding document : ' + e);
    }
}

export async function getRequests(uid:string):Promise<any[]> {
    const db = getFirestore();

    const snapshot = await getDocs(query(
        collection(db, "friendsRequest"), 
        where("receiveId", "==", uid),
    ));

    const result = snapshot.docs.map((value, number) => {
        return value.data();
    });

    return result;
}

