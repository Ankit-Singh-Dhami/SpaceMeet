"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useConvex } from "convex/react";
import { useEffect, useState } from "react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import SideBar from "./_components/SideBar";
import { FileListContext } from "@/app/_context/FileListContext";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const convex = useConvex();
  const { user }: any = useKindeBrowserClient();
  const router = useRouter();

  const [FileList_, setFileList_] = useState<any[]>([]);
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);

  useEffect(() => {
    user && checkTeam();
  }, [user]);

  const checkTeam = async () => {
    const result = await convex.query(api.team.getTeam, {
      email: user?.email,
    });

    if (!result?.length) {
      router.push("/team/create");
    } else {
      setSelectedTeamId(result[0]._id); // save teamId
      refreshFileList(result[0]._id);
    }
  };

  const refreshFileList = async (teamId = selectedTeamId) => {
    if (!teamId) return;

    const files = await convex.query(api.file.getFile, {
      teamId,
    });

    setFileList_(files);
  };

  return (
    <FileListContext.Provider
      value={{ FileList_, setFileList_, refreshFileList }}
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
