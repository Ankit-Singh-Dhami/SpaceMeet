"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Search, UserPlus, Mail, File } from "lucide-react";
import { useContext, useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { FileListContext } from "@/app/_context/FileListContext";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

const Header = () => {
  const { user }: any = useKindeBrowserClient();
  const { FileList_ } = useContext(FileListContext);

  const [email, setEmail] = useState("");
  const [selectedFile, setSelectedFile] = useState<any>(null);

  const invite = useMutation(api.fileAccess.inviteUserToFile);

  // -------------------------
  // HANDLE INVITE
  // -------------------------
  const handleInvite = async () => {
    if (!email || !selectedFile) return;

    try {
      await invite({
        email,
        fileId: selectedFile._id,
        invitedBy: user.email,
      });

      // reset after success
      setEmail("");
      setSelectedFile(null);

      alert("Invite sent successfully ✅");
    } catch (error) {
      console.error(error);
      alert("Failed to send invite ❌");
    }
  };

  return (
    <header className="w-full flex items-center justify-between px-6 py-4 h-[3rem]">
      {/* LEFT */}
      <h1 className="text-[1.5rem] font-semibold text-gray-800">Dashboard</h1>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        {/* SEARCH */}
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search..."
            className="pl-8 pr-2 py-1 text-[0.7rem] border rounded-lg"
          />
        </div>

        {/* AVATAR */}
        {user?.picture ? (
          <img
            src={user.picture}
            alt="User"
            className="w-8 h-8 rounded-full border"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gray-300 animate-pulse" />
        )}

        {/* INVITE */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 px-2 py-2 text-[0.7rem] text-white bg-blue-600 rounded-lg hover:bg-blue-700">
              <UserPlus size={14} />
              Invite
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-72 p-4 space-y-3">
            {/* EMAIL INPUT */}
            <div className="relative">
              <Mail
                size={14}
                className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-7 pr-2 py-2 text-sm border rounded-lg"
              />
            </div>

            {/* FILE LIST */}
            <div className="max-h-32 overflow-y-auto border rounded-lg">
              {FileList_?.length > 0 ? (
                FileList_.map((file: any) => (
                  <div
                    key={file._id}
                    onClick={() => setSelectedFile(file)}
                    className={`flex items-center gap-2 px-3 py-2 text-sm cursor-pointer
                      ${
                        selectedFile?._id === file._id
                          ? "bg-blue-100 text-blue-700"
                          : "hover:bg-gray-100"
                      }`}
                  >
                    <File size={14} />
                    {file.fileName}
                  </div>
                ))
              ) : (
                <p className="text-xs text-gray-500 p-3">No files available</p>
              )}
            </div>

            {/* SELECTED FILE */}
            {selectedFile && (
              <p className="text-xs text-gray-600">
                Selected:{" "}
                <span className="font-medium">{selectedFile.fileName}</span>
              </p>
            )}

            {/* SEND BUTTON */}
            <button
              onClick={handleInvite}
              disabled={!email || !selectedFile}
              className={`w-full py-2 text-sm rounded-lg transition
                ${
                  email && selectedFile
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
            >
              Send Invite
            </button>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
