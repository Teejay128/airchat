import { FC, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "universal-cookie";

import Input from "../components/Input";

const cookie = new Cookies();

type roomProps = {
  room: string;
  setRoom: (room: string) => void;
};

const RoomPage: FC<roomProps> = ({ room, setRoom }) => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const roomInputRef = useRef<HTMLInputElement>(null);

  const acceptInvite = (id: string) => {
    navigate("/chat/" + id);
    cookie.set("room", id);
    setRoom(id);
  };

  const joinRoom = () => {
    if (!roomInputRef.current || !roomInputRef.current.value) return;

    const roomInput = roomInputRef.current.value;

    navigate("/chat/" + roomInput);
    cookie.set("room", roomInput);
    setRoom(roomInput);
    roomInputRef.current.value = "";
  };

  const leaveRoom = () => {
    console.log("does it reach here...");
    cookie.remove("room");
    setRoom("");
  };

  return (
    <>
      <main className="flex-1 container mx-auto mt-4 p-6 bg-indigo-100/60 text-gray-800 rounded-lg shadow-md backdrop-blur-sm">
        <section className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800">
            Current room:{" "}
            <span className="font-semibold text-indigo-700">{room || "none"}</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-600 mt-2">
            On this page you can join, exit, and manage rooms.
          </p>
        </section>

        <section className="mb-6 max-w-xl mx-auto">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            What happens when you join a room?
          </h2>
          <p className="text-gray-700 mb-4">
            When you join a room, you can send and receive messages with others
            in the same room. It's a space for focused conversations and
            collaboration.
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Note:</span> Room names are usually
            provided by the room creator or administrator. Make sure you have
            the correct name to join the right conversation.
          </p>
        </section>

        {/* Section for available rooms */}
        {/* Section for room management (admin) */}
      </main>

      <footer className="p-1 bg-indigo-300 shadow-md sticky bottom-0 z-50">
        {roomId ? (
          <Input
            placeholder={"You have been invited to join a room: " + roomId}
            ref={roomInputRef}
            func={() => acceptInvite(roomId)}
            btnText="Accept Invite"
            disabled={true}
          />
        ) : room ? (
          <Input
            placeholder={"Current room: " + room}
            ref={roomInputRef}
            func={leaveRoom}
            btnText="Leave Room"
            disabled={true}
          />
        ) : (
          <Input
            placeholder="Enter Room Name"
            ref={roomInputRef}
            func={joinRoom}
            btnText="Enter Room"
            disabled={false}
          />
        )}
      </footer>
    </>
  );
};

export default RoomPage;
