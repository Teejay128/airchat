import { FC, useState, useEffect, useRef } from "react";
import { useNavigate, useParams, useLocation, Navigate } from "react-router-dom";
import { db } from "../../firebase-config";
import { collection, addDoc, onSnapshot } from "firebase/firestore";

import { Message, messageProp } from "../components/Message";
import Input from "../components/Input";
import Prompt from "../components/Prompt";

// import { defaultMessages } from "../assets/messages";

type chatProps = {
  room: string;
  user: string;
};

const ChatPage: FC<chatProps> = ({ room, user }) => {
  const [messages, setMessages] = useState<messageProp[]>([]);
  const { chatId } = useParams();
  const navigate = useNavigate();
  const location = useLocation()
  const inputTextRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  if (!room || room != chatId) {
    return <Navigate to={"/room?inv=" + chatId} state={{ from: location }} replace />
  }

  const messagesRef = collection(db, room);

  useEffect(() => {
    // Make it so that this stuff is not called when the user is switching compState
    const unsubscribe = onSnapshot(messagesRef, (doc) => {
      const newMessages: messageProp[] = doc
        .docChanges()
        .filter((change) => change.type === "added")
        .map((change) => {
          let message = change.doc.data();
          return {
            id: change.doc.id,
            type: message.type,
            sender: message.sender,
            time: message.time,
            text: message.text,
          };
        })
        .sort((a, b) => a.time - b.time);

      if (newMessages.length > 0) {
        setMessages((prevMessages) => [...prevMessages, ...newMessages]);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth'})
  }, [messages])

  const sendMessage = async () => {
    if (!inputTextRef.current) return;
    const currentInput = inputTextRef.current.value;
    inputTextRef.current.value = "";

    try {
      await addDoc(messagesRef, {
        type: "message",
        sender: user,
        time: new Date(),
        text: currentInput,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <main className="flex-1 container mx-auto mt-4 p-2 rounded-lg shadow-md backdrop-blur-sm">
        <section className="flex flex-col justify-end space-y-2 overflow-">
          {messages.map((message) => (
            <Message
              key={message.id}
              type={
                message.type === "ai"
                  ? "ai"
                  : message.sender === user
                  ? "self"
                  : "other"
              }
              sender={message.sender}
              time={message.time}
              text={message.text}
              id={message.id}
            />
          ))}
          <div ref={bottomRef}></div>
        </section>
      </main>

      <footer className="sticky bottom-0 z-50 bg-indigo-300 border-t border-gray-300 p-1 shadow-sm">
        {user ? (
          <Input
            placeholder="Type your message..."
            ref={inputTextRef}
            func={sendMessage}
            btnText="Send"
            disabled={false}
          />
        ) : (
          <Prompt
            text="Sign in to send messages to this room"
            func={() => navigate("/auth")}
            btnText="Go to SignIn"
          />
        )}
      </footer>
    </>
  );
};

export default ChatPage;
