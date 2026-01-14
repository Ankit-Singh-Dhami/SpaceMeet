"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useQuery } from "convex/react";
import { useEffect, useState } from "react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import SideBar from "./_components/SideBar";
import { FileListContext } from "@/app/_context/FileListContext";
import { Id } from "@/convex/_generated/dataModel";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user }: any = useKindeBrowserClient();
  const router = useRouter();

  const [selectedTeamId, setSelectedTeamId] = useState<Id<"teams"> | null>(
    null
  );

  /* 🔹 Fetch teams */
  const teams = useQuery(
    api.team.getTeam,
    user?.email ? { email: user.email } : "skip"
  );

  /* 🔹 Redirect if no team */
  useEffect(() => {
    if (!teams) return;

    if (teams.length === 0) {
      router.push("/team/create");
    } else {
      setSelectedTeamId(teams[0]._id);
    }
  }, [teams]);

  const files = useQuery(
    api.files.getAccessibleFiles,
    user?.email ? { email: user.email } : "skip"
  );

  return (
    <FileListContext.Provider
      value={{
        FileList_: files ?? [],
      }}
    >
      <div className="grid grid-cols-[220px_1fr] min-h-screen">
        <div className="h-screen">
          <SideBar />
        </div>
        <div className="p-4">{children}</div>
      </div>
    </FileListContext.Provider>
  );
}

export default DashboardLayout;
