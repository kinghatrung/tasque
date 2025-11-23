import { CheckCircle2, Settings, LogOut, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { AppDispatch } from "~/redux/store";

import { signOut } from "~/redux/slices/authSlice";
import { menuItems } from "~/config/menu";

function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleSignOut = async () => {
    await dispatch(signOut(false));
    navigate("/signin");
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 border-r h-screen border-border bg-card transition-all duration-300 md:relative md:translate-x-0 ${
        isCollapsed ? "w-[88px]" : "w-[300px]"
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className={`p-6 transition-all shadow-sm duration-300`}>
          <div className={`flex ${isCollapsed ? "justify-center" : "justify-between"} items-center`}>
            <Link to="/">
              <CheckCircle2 className="h-8 w-8" />
            </Link>
            {!isCollapsed && (
              <Link to="/" className="text-2xl font-bold">
                Tasque
              </Link>
            )}
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  to={item.to}
                  key={item.label}
                  className={({ isActive }) =>
                    `w-full text-left flex items-center gap-3 text-lg font-medium p-4 transition-colors flex-nowrap min-w-0 ${
                      isCollapsed ? "justify-center px-2" : ""
                    } ${
                      isActive
                        ? "bg-primary text-primary-foreground rounded-xl"
                        : "text-foreground hover:bg-accent hover:text-accent-foreground rounded-xl"
                    }`
                  }
                >
                  <Icon className="h-6 w-6 flex-shrink-0" />
                  {!isCollapsed && (
                    <span
                      className={`transition-all truncate overflow-hidden whitespace-nowrap duration-300 ease-in-out origin-left ${
                        isCollapsed ? "opacity-0 translate-x-[-10px] pointer-events-none" : "opacity-100 translate-x-0"
                      }`}
                    >
                      {item.label}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </div>
        </nav>

        <footer
          className={`border-t border-border p-4 space-y-2 transition-all duration-300 ${isCollapsed ? "p-2" : "p-4"}`}
        >
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full cursor-pointer rounded-lg p-4 text-left text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors flex items-center justify-center gap-3 hidden md:flex"
          >
            {isCollapsed ? <ChevronRight className="h-6 w-6" /> : <ChevronLeft className="h-6 w-6" />}
          </button>

          <NavLink
            to="/setting"
            className={({ isActive }) =>
              `w-full text-left flex items-center gap-3 text-lg font-medium p-4 transition-colors flex-nowrap min-w-0 ${
                isCollapsed ? "justify-center px-2" : ""
              } ${
                isActive
                  ? "bg-primary text-primary-foreground rounded-xl"
                  : "text-foreground hover:bg-accent hover:text-accent-foreground rounded-xl"
              }`
            }
          >
            <Settings className="h-6 w-6 flex-shrink-0" />
            {!isCollapsed && (
              <span
                className={`transition-all truncate overflow-hidden whitespace-nowrap duration-300 ease-in-out origin-left ${
                  isCollapsed ? "opacity-0 translate-x-[-10px] pointer-events-none" : "opacity-100 translate-x-0"
                }`}
              >
                Cài đặt
              </span>
            )}
          </NavLink>

          <Link
            to="/setting"
            onClick={handleSignOut}
            className={`w-full flex items-center gap-3 text-lg font-medium p-4 text-foreground hover:bg-accent hover:text-accent-foreground rounded-xl ${
              isCollapsed ? "justify-center px-2" : ""
            }`}
          >
            <LogOut className="h-6 w-6 flex-shrink-0" />
            {!isCollapsed && (
              <span
                className={`transition-all truncate overflow-hidden whitespace-nowrap duration-300 ease-in-out origin-left ${
                  isCollapsed ? "opacity-0 translate-x-[-10px] pointer-events-none" : "opacity-100 translate-x-0"
                }`}
              >
                Đăng xuất
              </span>
            )}
          </Link>
        </footer>
      </div>
    </aside>
  );
}

export default Sidebar;
