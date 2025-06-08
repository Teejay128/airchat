import { FC, useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { db } from "../../firebase-config";
import {
  collection,
  addDoc,
  onSnapshot,
} from "firebase/firestore";

import { Message, messageProp } from "../components/Message";
import Input from "../components/Input"
import Button from "../components/Button"
// import { defaultMessages } from "../assets/messages";

type chatProps = {
  room: string;
  user: string;
};

const ChatPage: FC<chatProps> = ({ room, user }) => {
  const [messages, setMessages] = useState<messageProp[]>([]);
  const { chatId } = useParams()
  const navigate = useNavigate()
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputTextRef = useRef<HTMLInputElement>(null)

  if(chatId) console.log(chatId)
  if(!room) room = "Airchat"
  const messagesRef = collection(db, room);

  useEffect(() => {
    // Make it so that this stuff is not called when the user is switching compState
    const unsubscribe = onSnapshot(messagesRef, (doc) => {    
      const newMessages: messageProp[] = doc.docChanges()
        .filter((change) => change.type === "added")
        .map((change) => {
          let message = change.doc.data()
          return{
            id: change.doc.id,
            type: message.type,
            sender: message.sender,
            time: message.time,
            text: message.text
          }
        })
        .sort((a, b) => a.time - b.time)

        if (newMessages.length > 0) {
          setMessages((prevMessages) => [...prevMessages, ...newMessages])
        }
        
        if(scrollRef.current) {
          scrollRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    });
  
    return () => unsubscribe();
  }, []);

  const sendMessage = async () => {
    if(!inputTextRef.current) return
    const currentInput = inputTextRef.current.value
    
    try {
      await addDoc(messagesRef, {
        type: "message",
        sender: user,
        time: new Date(),
        text: currentInput,
      });

      inputTextRef.current.value = ""
    } catch (error) {
      console.error(error);
    }
  };

  const signInPage = () => {
    navigate("/auth")
  }

  return (
    <div className="flex flex-col bg-gradient-to-b from-indigo-800 to-indigo-300">
      <div className="flex-1 flex flex-col justify-end p-4 overflow-y-auto">
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
        <div ref={scrollRef} />
      </div>

      <div className="p-1 bg-indigo-300 shadow-md sticky bottom-0 z-50">
        {user ? (
          <Input
            placeholder="Type your message..."
            ref={inputTextRef}
            func={sendMessage}
            btnText="Send"
          />
        ) : (
          <Button
            text="Sign in to send messages to this room"
            func={signInPage}
            btnText="Go to SignIn"
          />
        )}
      </div>
    </div>
  );
};

export default ChatPage;
