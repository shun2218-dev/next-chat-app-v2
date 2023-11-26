"use client";
import { db } from "@/firebase";
import { Message } from "@/types/Message";
import { PageParam } from "@/types/PageParam";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export const useChatMessage = (
  group: boolean = false,
  pageParams: PageParam
) => {
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [chatRoom, setChatRoom] = useState("");
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [roomExist, setRoomExist] = useState(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const messageOptions = [orderBy("createdAt", "asc")];

  const { uid, partnerid, groupid } = pageParams;
  if (!group) {
    const getRoomId = async (uid: string, roomDocId: string) => {
      let roomid: string = "";
      const roomRef = doc(db, "users", `${uid}`, "rooms", `${roomDocId}`);
      await getDoc(roomRef).then((res) => {
        roomid = res.data()!.roomid;
      });
      return roomid;
    };
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (chatRoom) {
        const q = query(
          collection(db, "rooms", chatRoom, "messages"),
          ...messageOptions
        );
        const unSub = onSnapshot(q, (snapshot) => {
          setChatMessages([
            ...snapshot.docs.map((doc) => {
              return { id: doc.id, ...doc.data() } as Message;
            }),
          ]);
        });
        return () => {
          unSub();
        };
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chatRoom]);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (partnerid) {
        setDataLoading(true);
        const userRef = collection(db, "users", uid!, "rooms");
        const unSubUser = onSnapshot(userRef, (snapshot) => {
          const room = snapshot.docs.filter((doc) => doc.id === partnerid);
          if (room.length && uid) {
            const roomDocId = room[0].id;
            getRoomId(uid, roomDocId).then((roomid) => {
              setChatRoom(roomid);
              const messageRef = query(
                collection(db, "rooms", `${roomid}`, "messages"),
                orderBy("createdAt", "asc")
              );
              getDocs(messageRef).then((snapshot) => {
                setChatMessages([
                  ...snapshot.docs.map((doc) => {
                    return {
                      id: doc.id,
                      ...doc.data(),
                    } as Message;
                  }),
                ]);
              });
            });
            setDataLoading(false);
          } else {
            setDataLoading(false);
          }
        });
        return () => {
          unSubUser();
        };
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageParams]);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (partnerid) {
        setChatMessages([]);
        setChatRoom("");
      }

      if (!roomExist) {
        setChatRoom("");
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageParams]);
  } else {
    const q = query(
      collection(db, "groups", groupid!, "messages"),
      ...messageOptions
    );
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      const unSub = onSnapshot(q, (snapshot) => {
        setChatMessages([
          ...snapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() } as Message;
          }),
        ]);
      });
      return () => {
        unSub();
      };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  }
  return {
    chatMessages,
    chatRoom,
    setChatRoom,
    setLoading,
    loading,
    dataLoading,
    setRoomExist,
    roomExist,
  };
};
