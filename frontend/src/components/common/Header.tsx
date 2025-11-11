import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

function Header() {
  return (
    <div className="w-full h-20 shadow-sm bg-white">
      <div className="px-8 h-full">
        <div className="flex items-center justify-end h-full ">
          <div className="flex items-center gap-5">
            <div>Profile</div>
            <Avatar className="rounded-lg">
              <AvatarImage src="https://github.com/evilrabbit.png" alt="@evilrabbit" />
              <AvatarFallback>User</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
