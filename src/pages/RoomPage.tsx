import { FC, useRef } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import Cookies from "universal-cookie";

import Input from "../components/Input";
import Prompt from "../components/Prompt";

const cookie = new Cookies();

type roomProps = {
  room: string;
  setRoom: (room: string) => void;
};

const RoomPage: FC<roomProps> = ({ room, setRoom }) => {
  const navigate = useNavigate();
  const location = useLocation()
  const [searchParams] = useSearchParams();
  const roomInputRef = useRef<HTMLInputElement>(null);


  const acceptInvite = (invite: string) => {
    console.log("accepting invite")
    setRoom(invite);
    cookie.set("room", invite);
    navigate("/chat/" + invite, { replace: true });
  }

  const joinRoom = () => {
    if (!roomInputRef.current || !roomInputRef.current.value) return;
    const roomInput = roomInputRef.current.value;
    const redirect = location.state?.from || "/chat/" + roomInput
    

    setRoom(roomInput);
    cookie.set("room", roomInput);
    navigate(redirect, { replace: true });
    roomInputRef.current.value = "";
  };

  const leaveRoom = () => {
    cookie.remove("room");
    setRoom("");
  };

  if(searchParams.get("inv")) {
    const inv = searchParams.get("inv")
    if(inv) {
      return (
        <Input
          placeholder={"You were invited to: " + inv}
          ref={roomInputRef}
          func={() => acceptInvite(inv)}
          btnText="Accept"
          disabled={false}
        />
      )
    }
  }

  return (
    <>
      <main className="flex-1 container mx-auto mt-4 p-6 bg-indigo-100/60 text-gray-800 rounded-lg shadow-md backdrop-blur-sm">
        <section className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
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

      <footer className="sticky bottom-0 z-50 bg-indigo-300 border-t border-gray-300 p-1 shadow-sm">
        {room ? (
          <Prompt
            text={"Current room: " + room}
            func={leaveRoom}
            btnText="Leave Room"
          />
        ) : (
          <Input
            placeholder="Enter Room Name"
            ref={roomInputRef}
            func={joinRoom}
            btnText="Join"
            disabled={false}
          />
        )}
      </footer>
    </>
  );
};

export default RoomPage;
