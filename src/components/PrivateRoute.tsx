import { FC } from "react";
import { Outlet, useLocation, Navigate } from "react-router-dom";

type privateProps = {
  user: string;
  room: string;
};

const PrivateRoute: FC<privateProps> = ({ user, room }) => {
  const location = useLocation();
  console.log(room)

  if (!user) {
    return <Navigate to="/user?new=true" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
