import { FC, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom"
import Cookies from "universal-cookie";

// Pages
import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";
import RoomPage from "./pages/RoomPage";
import AuthPage from "./pages/AuthPage";
import NotFoundPage from "./pages/NotFoundPage"

// Components
import Header from "./components/Header";

const cookie = new Cookies();

const App: FC = () => {
  const [user, setUser] = useState<string>(cookie.get("user") || "");
  const [room, setRoom] = useState<string>(cookie.get("room") || "");
  // console.log(user, room)

  return (
    <div className="flex flex-col min-h-screen bg-blue-900">
      <Header room={room} user={user} />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage user={user} room={room} />} />
          <Route path="/auth" element={<AuthPage user={user} setUser={setUser} />} />
          <Route path="/room" element={<RoomPage room={room} setRoom={setRoom} />} />
          <Route path="/chat" element={user ? (<ChatPage room={room} user={user} />) : (<Navigate to="/auth" replace />)} />
          <Route path="/room/:roomId" element={<RoomPage room={room} setRoom={setRoom} />} />
          {/* How to check for authentication? Or do I just sign them in straightaway... */}
          <Route path="/chat/:chatId" element={user ? (<ChatPage room={room} user={user} />) : (<Navigate to="/auth" replace />)} />
          {/* <Route path="/board/:boardId" element={<ChatPage room={room} user={user} />} /> */}
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
