import { FC } from "react";
import { Link } from "react-router-dom"
import { FaUser, FaDoorOpen, FaComment, FaUsers } from "react-icons/fa";

type headerProps = {
  user: string;
  room: string;
};


const Header: FC<headerProps> = ({
  user,
  room
}) => {

  return (
    <div className="flex justify-between items-center px-2 py-2 bg-indigo-800 sticky top-0 z-50 shadow-sm">
      <Link to="/" className="flex items-center gap-2">
        <FaUsers size={32} className="text-white" />
        <div className="flex flex-col leading-tight">
          <p className="text-sm font-semibold text-white truncate max-w-[160px] sm:max-w-[200px]">
            room: {room}
          </p>
          <p className="text-xs text-indigo-200 truncate max-w-[160px] sm:max-w-[200px]">
            user: {user}
          </p>
        </div>
      </Link>
      <div className="flex gap-2 sm:gap-3">
        {(user && room) ? (
          <Link to={"/chat/" + room} className="action-button" type="button" title="Go to chat">
            <FaComment className="text-white" />
          </Link>
        ) : (
          <div className="action-button" title="Requires Room and User">
            <FaComment className="text-white opacity-50" />
          </div>
        )}
        <Link to="/room/" title="Switch Room" className="action-button">
          <FaDoorOpen className="text-white" />
        </Link>
        <Link to="/user" className="action-button" type="button" title="User settings">
          <FaUser className="text-white" />
        </Link>
      </div>
    </div>
  )
};

export default Header