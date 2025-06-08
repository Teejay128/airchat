import { FC, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom"
import Cookies from "universal-cookie"

import Input from "../components/Input"
import Button from "../components/Button"

const cookie = new Cookies()

type roomProps = {
  room: string;
  setRoom: (room: string) => void;
};

const RoomPage: FC<roomProps> = ({
  room,
  setRoom,
}) => {
  const { roomId } = useParams()
  const navigate = useNavigate()
  const roomInputRef = useRef<HTMLInputElement>(null)
  
  const acceptInvite = (id: string) => {
    navigate("/chat/" + id)
    cookie.set("room", id)
    setRoom(id)
  }

  const joinRoom = () => {
    if (!roomInputRef.current || !roomInputRef.current.value) return

    const roomInput = roomInputRef.current.value
    
    navigate("/chat/" + roomInput)
    cookie.set("room", roomInput)
    setRoom(roomInput)
    roomInputRef.current.value = ""
  };

  const leaveRoom = () => {
    cookie.remove("room")
    setRoom("")
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 flex flex-col items-center justify-center p-4 bg-gradient-to-b from-indigo-800 to-indigo-300 shadow-lg">
        <div className="w-full max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Join a Room</h2>
          <p className="text-gray-700 mb-4 text-center">
            Current room: <span className="font-semibold">{room || "none"}</span>
          </p>
          <p className="text-gray-700 mb-4 text-center">Enter the name of the room you would like to join</p>

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">What happens when you join a room?</h3>
            <p className="text-gray-700 mb-4">
              When you join a room, you can send and receive messages with others in the same room. It's a space for focused conversations and collaboration.
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Note:</span> Room names are usually provided by the room creator or administrator. Please ensure you have the correct name to join the right conversation.
            </p>
          </div>
        </div>
      </div>

      <div className="p-1 bg-indigo-300 shadow-md sticky bottom-0 z-50">
        {roomId ? (
          <Button text={"You have been invited to join a room: " + roomId} func={() => acceptInvite(roomId)} btnText="Accept Invite"/>
        ) : room ? (
          <Button text={"Current room: " + room} func={leaveRoom} btnText="Leave Room" />
        ) : (
          <Input placeholder="Enter Room Name" ref={roomInputRef} func={joinRoom} btnText="Enter room" />
        )}
      </div>
    </div>

  );
};

export default RoomPage;
