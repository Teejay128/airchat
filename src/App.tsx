import { FC, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom"
import Cookies from "universal-cookie";

import Header from "./components/Header"
import PrivateRoute from "./components/PrivateRoute"

import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";
import RoomPage from "./pages/RoomPage";
import AuthPage from "./pages/AuthPage";
import NotFoundPage from "./pages/NotFoundPage"


const cookie = new Cookies();

const App: FC = () => {
  const [user, setUser] = useState<string>(cookie.get("user") || "");
  const [room, setRoom] = useState<string>(cookie.get("room") || "");
  // console.log(user, room)

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-indigo-800 to-indigo-300">
      <Header room={room} user={user} />
      <Routes>
        <Route path="/" element={<HomePage user={user} room={room} />} />
        <Route path="/auth" element={<AuthPage user={user} setUser={setUser} />} />
        <Route path="/room" element={<RoomPage room={room} setRoom={setRoom} />} />
        <Route path="/room/:roomId" element={<RoomPage room={room} setRoom={setRoom} />} />

        {/* Protected Routes */}
        <Route element={<PrivateRoute user={user} />} >
          <Route path="/chat" element={user ? (<ChatPage room={room} user={user} />) : (<Navigate to="/auth" replace />)} />
          <Route path="/chat/:chatId" element={user ? (<ChatPage room={room} user={user} />) : (<Navigate to="/auth" replace />)} />
        </Route>

        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
