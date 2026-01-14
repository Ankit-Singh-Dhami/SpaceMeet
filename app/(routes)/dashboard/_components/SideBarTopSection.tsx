"use client";

import { ChevronDown, LogOut, Users, Settings, LayoutGrid } from "lucide-react";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { useConvex } from "convex/react";
import { useEffect, useState } from "react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Id } from "@/convex/_generated/dataModel";

/* =======================
   Types
======================= */
export interface Team {
  _id: Id<"teams">;
  createBy: string;
  teamName: string;
  _creationTime: number;
}

export interface User {
  picture?: string;
  given_name?: string;
  email: string;
}

interface SideBarTopSectionProps {
  user: User | null;
  setActiveTeamInfo: (team: Team) => void;
}

/* =======================
   Component
======================= */
const SideBarTopSection: React.FC<SideBarTopSectionProps> = ({
  user,
  setActiveTeamInfo,
}) => {
  const convex = useConvex();

  const [teamList, setTeamList] = useState<Team[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [open, setOpen] = useState(false);

  /* =======================
     Fetch Teams
  ======================= */
  useEffect(() => {
    if (user?.email) getTeamList();
  }, [user]);

  useEffect(() => {
    selectedTeam && setActiveTeamInfo(selectedTeam);
  }, [selectedTeam]);

  const getTeamList = async () => {
    if (!user?.email) return;

    try {
      const result = await convex.query(api.team.getTeam, {
        email: user.email,
      });

      setTeamList(result || []);

      // Default select first team
      if (result?.length > 0) {
        setSelectedTeam(result[0]);
      }
    } catch (error) {
      console.error("Error fetching teams:", error);
      setTeamList([]);
    }
  };

  /* =======================
     Menu
  ======================= */
  const Menu = [
    {
      label: "Create Team",
      href: "/team/create",
      icon: Users,
      type: "link",
    },
    {
      label: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
      type: "link",
    },
    {
      label: "Logout",
      icon: LogOut,
      type: "logout",
    },
  ];

  /* =======================
     Render
  ======================= */
  return (
    <div className="sidebar_top_container ">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="flex items-center gap-2 mt-4 ml-4 px-2 py-1 rounded-lg
                       hover:bg-[rgba(211,211,211,0.3)] transition-all"
          >
            <img src="/logo.svg" alt="SpaceMeet Logo" className="h-8 w-8" />
            <div className="text-[0.9rem] font-semibold">
              {selectedTeam?.teamName || "Team Name"}
            </div>
            <ChevronDown className="h-4 w-4" />
          </button>
        </PopoverTrigger>

        <PopoverContent
          align="start"
          className="w-50 p-1 bg-white dark:bg-gray-900  shadow-md"
        >
          {teamList.length === 0 ? (
            <div className="px-3 py-2 text-sm text-gray-400">No Teams</div>
          ) : (
            teamList.map((team) => {
              const isSelected = selectedTeam?._id === team._id;
              return (
                <div
                  key={team._id}
                  onClick={() => {
                    setSelectedTeam(team);
                    setOpen(false);
                  }}
                  className={`px-3 py-2 text-[0.7rem] font-medium rounded-md cursor-pointer
                    transition-colors duration-200
                    ${
                      isSelected
                        ? "bg-blue-500 text-white"
                        : "hover:bg-gray-100"
                    }
                  `}
                >
                  {team.teamName}
                </div>
              );
            })
          )}

          <hr className="my-2 opacity-30" />

          <ul className="flex flex-col">
            {Menu.map((item) => {
              const Icon = item.icon;
              const hoverClasses =
                "flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-all duration-200 ease-in-out hover:bg-gray-100 hover:pl-5 cursor-pointer";

              return (
                <li key={item.label}>
                  {item.type === "logout" ? (
                    <LogoutLink
                      className={hoverClasses}
                      onClick={() => setOpen(false)}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </LogoutLink>
                  ) : item.href ? (
                    <Link
                      href={item.href}
                      className={hoverClasses}
                      onClick={() => setOpen(false)}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  ) : null}
                </li>
              );
            })}
          </ul>

          <hr className="my-2 opacity-30" />

          {user && (
            <div className="flex items-center gap-2 px-3 py-2">
              {user.picture ? (
                <img
                  src={user.picture}
                  alt="User avatar"
                  className="h-8 w-8 rounded-full object-cover"
                />
              ) : (
                <div
                  className="h-8 w-8 rounded-full bg-black text-white
                                flex items-center justify-center text-xs"
                >
                  {user.given_name?.[0] || "U"}
                </div>
              )}

              <div className="flex flex-col leading-tight">
                <div className="text-sm font-semibold">{user.given_name}</div>
                <div className="text-[0.6rem] text-gray-500 truncate ">
                  {user.email}
                </div>
              </div>
            </div>
          )}
        </PopoverContent>
      </Popover>

      <Button
        variant="outline"
        className="
    mt-8 ml-4
    w-[90%]
    justify-start
    font-bold
    text-[0.8rem]
    h-[1.8rem]
    gap-2
    bg-gray-100
  "
      >
        <LayoutGrid className="h-4 w-4" />
        All Files
      </Button>
    </div>
  );
};

export default SideBarTopSection;
