"use client";

import { useContext, useState } from "react";
import { BookOpen, Github, Archive, Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { api } from "@/convex/_generated/api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useMutation } from "convex/react";
import { FileListContext } from "@/app/_context/FileListContext";
import Constant from "@/app/_constant/Constant";
import PricingDailog from "./PricingDailog";

const SideBarBottomSection = ({ user, selectedTeam }: any) => {
  /* =======================
     State
  ======================= */
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");

  /* =======================
     Context
  ======================= */
  const { FileList_, refreshFileList } = useContext(FileListContext);

  /* =======================
     Derived State
  ======================= */
  const totalFiles = FileList_?.length ?? 0;

  /* =======================
     Create File Handler
  ======================= */
  const createFile = useMutation(api.file.createFile);

  const handleCreateFile = async () => {
    if (!fileName.trim()) {
      setError("File name is required");
      return;
    }

    try {
      await createFile({
        fileName,
        teamId: selectedTeam?._id,
        createdBy: user?.email,
        archive: false,
        document: "",
        whiteboard: "",
      });

      // Refresh global file list
      await refreshFileList();

      toast.success("File created successfully!");
      setFileName("");
      setError("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to create file.");
    }
  };

  /* =======================
     UI
  ======================= */
  return (
    <div className="mt-6 px-4 flex flex-col gap-4">
      {/* Menu List */}
      <ul className="flex flex-col gap-1">
        {[
          {
            label: "Getting Started",
            href: "/getting-started",
            icon: BookOpen,
          },
          { label: "GitHub", href: "https://github.com", icon: Github },
          { label: "Archive", href: "/archive", icon: Archive },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.label}>
              <Link
                href={item.href}
                className="flex items-center gap-1 px-3 py-1 text-[0.7rem] font-medium rounded-md hover:bg-gray-100"
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* New File Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full bg-blue-600 hover:bg-blue-700 gap-2 text-white">
            <Plus className="h-4 w-4" />
            New File
          </Button>
        </DialogTrigger>

        {totalFiles < Constant.MAX_FREE_FILE ? (
          <DialogContent className="sm:max-w-md bg-white">
            <DialogHeader>
              <DialogTitle>Create New File</DialogTitle>
              <DialogDescription className="text-xs">
                Give your file a clear and unique name.
              </DialogDescription>
            </DialogHeader>

            <Input
              value={fileName}
              onChange={(e) => {
                setFileName(e.target.value);
                setError("");
              }}
              placeholder="Enter file name"
            />

            {error && <p className="text-xs text-red-500">{error}</p>}

            <DialogFooter>
              <DialogClose asChild>
                <Button
                  className="bg-blue-500 text-white hover:bg-blue-700"
                  onClick={handleCreateFile}
                >
                  Create
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        ) : (
          <PricingDailog />
        )}
      </Dialog>

      {/* Usage Section */}
      <div className="bg-gray-100 rounded-lg p-3 flex flex-col gap-2">
        <div className="w-full h-2 bg-gray-300 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-300"
            style={{
              width: `${Math.min(
                (totalFiles / Constant.MAX_FREE_FILE) * 100,
                100
              )}%`,
            }}
          />
        </div>

        <div className="text-xs font-medium text-gray-700">
          <strong>{totalFiles}</strong> out of{" "}
          <strong>{Constant.MAX_FREE_FILE}</strong> files used
        </div>

        <Link
          href="/upgrade"
          className="text-xs font-semibold text-blue-600 hover:underline"
        >
          Upgrade your plan
        </Link>
      </div>
    </div>
  );
};

export default SideBarBottomSection;
