import { useEffect, useState } from "react";
import { firebase } from "../../firebase";
import {
  getFirestore,
  onSnapshot,
  collection,
  query,
  orderBy,
} from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";

import Storage from "../Storage";

// components
import ChatHeader from "./chat-header";
import ChatFooter from "./chat-footer";
import ChatBody from "./chat-body";

const DisplayChat = ({ user, setLoggedUser }) => {
  const db = getFirestore(firebase);
  const auth = getAuth(firebase);
  const [message, setMessage] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!message.length) setLoading(true);
    onSnapshot(
      query(collection(db, "messages"), orderBy("createdAt")),
      (item) => {
        setMessage(item.docs.map((doc) => doc.data()));
        setLoading(false);
      }
    );
  }, [db]);

  const signOutHandler = async (e) => {
    e.preventDefault();
    signOut(auth)
      .then(() => {
        setLoggedUser(null);
        Storage.removeFromLocalStorage();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className='w-[600px]'>
      <DisplayChat.ChatHeader
        signOutHandler={signOutHandler}
        userImage={user?.photoURL}
        displayName={user?.displayName}
      />
      <DisplayChat.ChatBody
        loading={loading}
        message={message}
        uid={user?.uid}
      />
      <DisplayChat.ChatFooter photoURL={user?.photoURL} uid={user?.uid} />
    </div>
  );
};

DisplayChat.ChatHeader = ChatHeader;
DisplayChat.ChatFooter = ChatFooter;
DisplayChat.ChatBody = ChatBody;

export default DisplayChat;
