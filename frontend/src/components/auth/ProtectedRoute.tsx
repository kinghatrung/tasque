import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { authSelect } from "~/redux/slices/authSlice";

function ProtectedRoute() {
  const { currentUser, loading } = useSelector(authSelect);

  if (loading) return <div className="bg-white flex items-center justify-center min-h-svh">...Đang tải</div>;
  if (!currentUser) return <Navigate to="/signin" replace />;

  return <Outlet />;
}

export default ProtectedRoute;
