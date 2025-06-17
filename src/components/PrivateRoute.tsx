import { FC } from "react";
import { Outlet, useLocation, Navigate } from "react-router-dom";

type privateProps = {
  user: string;
};

const PrivateRoute: FC<privateProps> = ({ user }) => {
  const location = useLocation();

  if (!user) {
    return <Navigate to="/user?new=true" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
