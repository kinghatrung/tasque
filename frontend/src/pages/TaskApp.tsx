import { Button } from "~/components/ui/button";
import { signOut } from "~/redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import type { AppDispatch } from "~/redux/store";

import { useDispatch } from "react-redux";
import { authService } from "~/services/authService";
function TaskApp() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleSignOut = async () => {
    await dispatch(signOut(false));
    navigate("/signin");
  };

  const handleTest = async () => {
    try {
      await authService.test();
      console.log("oke");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-svh">
      <Button className="cursor-pointer" onClick={handleSignOut}>
        Đăng xuất
      </Button>

      <Button className="cursor-pointer" onClick={handleTest}>
        Test
      </Button>
    </div>
  );
}

export default TaskApp;
