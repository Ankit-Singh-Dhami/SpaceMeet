"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Search, UserPlus } from "lucide-react";

const Header = () => {
  const { user }: any = useKindeBrowserClient();

  return (
    <header className="w-full flex items-center justify-between px-6 py-4  border-gray-200 h-[3rem]">
      {/* Left */}
      <h1 className="text-[1.5rem] font-semibold text-gray-800">Dashboard</h1>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search..."
            className="pl-8 pr-2 py-1 text-[0.7rem] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* User Avatar */}
        {user?.picture ? (
          <img
            src={user?.picture}
            alt="User"
            className="w-8 h-8 rounded-full object-cover border"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gray-300 animate-pulse" />
        )}

        {/* Invite Button */}
        <button className="flex items-center gap-2 px-2 py-2 text-[0.7rem] font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">
          <UserPlus size={14} />
          Invite
        </button>
      </div>
    </header>
  );
};

export default Header;
