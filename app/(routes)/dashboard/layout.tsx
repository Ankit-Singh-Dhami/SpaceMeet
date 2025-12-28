"use client";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useConvex } from "convex/react";
import { useEffect, useState } from "react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import SideBar from "./_components/SideBar";
import { FileListContext } from "@/app/_context/FileListContext";

function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const convex = useConvex();
  const { user }: any = useKindeBrowserClient();
  const router = useRouter();
  const [FileList_, setFileList_] = useState();

  useEffect(() => {
    user && checkTeam();
  }, [user]);

  const checkTeam = async () => {
    const result = await convex.query(api.team.getTeam, {
      email: user?.email,
    });

    if (!result?.length) {
      router.push("/team/create");
    }
  };

  return (
    <FileListContext.Provider value={{ FileList_, setFileList_ }}>
      <div className="grid grid-cols-[220px_1fr] min-h-screen">
        {/* Sidebar */}
        <div className="h-screen ">
          <SideBar />
        </div>

        {/* Main content */}
        <div className="p-4">{children}</div>
      </div>
    </FileListContext.Provider>
  );
}

export default DashboardLayout;
