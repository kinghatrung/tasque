import { useSelector } from "react-redux";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { authSelect } from "~/redux/slices/authSlice";

function Header() {
  const { currentUser } = useSelector(authSelect);

  return (
    <div className="w-full h-20 shadow-sm bg-white">
      <div className="px-8 h-full">
        <div className="flex items-center justify-end h-full ">
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-3">
              <h1 className="font-medium">{currentUser?.displayName}</h1>

              <Avatar className="w-10 h-10 rounded-lg object-cover">
                <AvatarImage src={`${currentUser?.avatarUrl}` || "https://github.com/evilrabbit.png"} alt="Avatar" />
                <AvatarFallback>User</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
