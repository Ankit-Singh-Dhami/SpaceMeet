"use client";

import { useContext, useState } from "react";
import {
  MoreHorizontal,
  Share2,
  FileText,
  LayoutPanelTop,
  Pencil,
  Save,
} from "lucide-react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

export default function Header({ onSave, fileData, setActiveTab }: any) {
  const [active, setActive] = useState<"document" | "both" | "canvas">(
    "document"
  );

  const handleTabChange = (tab: "document" | "both" | "canvas") => {
    setActive(tab);

    if (setActiveTab) setActiveTab(tab); // notify parent
  };

  const { user }: any = useKindeBrowserClient();

  console.log("header file", fileData);

  return (
    <header className="flex items-center justify-between px-3 py-1.5 border-b bg-white">
      {/* LEFT */}
      <div className="flex items-center gap-2 min-w-0">
        <img src="/logo.svg" alt="SpaceMeet Logo" className="h-8 w-8" />
        <span className="text-sm font-medium truncate max-w-[120px] sm:max-w-[180px]">
          {fileData?.fileName || "Untitled"}
        </span>
        <button className="p-0.5 rounded hover:bg-gray-100">
          <MoreHorizontal className="h-4 w-4 text-gray-600" />
        </button>
      </div>

      {/* CENTER */}
      <div className="hidden md:flex items-center gap-0.5 bg-gray-100 rounded-md p-0.5">
        <Tab
          icon={<FileText className="h-3.5 w-3.5" />}
          label="Doc"
          active={active === "document"}
          onClick={() => handleTabChange("document")}
        />
        <Tab
          icon={<LayoutPanelTop className="h-3.5 w-3.5" />}
          label="Both"
          active={active === "both"}
          onClick={() => handleTabChange("both")}
        />
        <Tab
          icon={<Pencil className="h-3.5 w-3.5" />}
          label="Canvas"
          active={active === "canvas"}
          onClick={() => handleTabChange("canvas")}
        />
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5">
          <button
            className="flex items-center gap-1.5 px-2 py-1 rounded bg-yellow-600 text-white text-xs hover:bg-yellow-700"
            onClick={() => onSave()}
          >
            <Save className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Save</span>
          </button>

          <button className="flex items-center gap-1.5 px-2 py-1 rounded bg-blue-600 text-white text-xs hover:bg-blue-700">
            <Share2 className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>

        <div className="h-6 w-6 rounded-full bg-gray-300 flex items-center justify-center text-xs font-medium overflow-hidden">
          {user?.picture ? (
            <img
              src={user.picture}
              alt="user"
              className="h-full w-full object-cover"
            />
          ) : (
            <span>{user?.given_name?.[0] || "A"}</span>
          )}
        </div>
      </div>
    </header>
  );
}

/* ---------------- SMALL TAB ---------------- */

function Tab({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs transition
        ${
          active
            ? "bg-white shadow-sm text-black"
            : "text-gray-600 hover:bg-gray-200"
        }`}
    >
      {icon}
      {label}
    </button>
  );
}
