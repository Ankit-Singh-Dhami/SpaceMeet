"use client";

import { useContext, useEffect, useState } from "react";
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
import { useConvex, useMutation } from "convex/react";
import { FileListContext } from "@/app/_context/FileListContext";
import Constant from "@/app/_constant/Constant";
import PricingDailog from "./PricingDailog";

const SideBarBottomSection = ({ user, selectedTeam }: any) => {
  /* =======================
     State
  ======================= */
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  const [totalFiles, settotalFiles] = useState<number>(0);
  const { FileList_, setFileList_ } = useContext(FileListContext);

  const convex = useConvex();
  /* =======================
     Menu
  ======================= */
  const menuList = [
    {
      label: "Getting Started",
      href: "/getting-started",
      icon: BookOpen,
    },
    {
      label: "GitHub",
      href: "https://github.com",
      icon: Github,
    },
    {
      label: "Archive",
      href: "/archive",
      icon: Archive,
    },
  ];

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
        fileName: fileName,
        teamId: selectedTeam?._id, // make sure selectedTeam is passed as prop
        createdBy: user?.email,
        archive: false,
        document: "",
        whiteboard: "",
      }).then((res) => {
        if (res) {
          getFile();
          toast.success("File created successfully!");
        } else {
          toast.error("Failed to create file.");
        }
      });

      // Reset input
      setFileName("");
      setError("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to create file.");
    }
  };

  const getFile = async () => {
    const result = await convex.query(api.file.getFile, {
      teamId: selectedTeam?._id,
    });
    setFileList_(result);
    settotalFiles(result?.length);
  };

  useEffect(() => {
    selectedTeam && getFile();
  }, [selectedTeam]);

  return (
    <div className="mt-6 px-4 flex flex-col gap-4">
      {/* =======================
         Menu List
      ======================= */}
      <ul className="flex flex-col gap-1">
        {menuList.map((item) => {
          const Icon = item.icon;

          return (
            <li key={item.label}>
              <Link
                href={item.href}
                className="flex items-center gap-1 px-3 py-1
                           text-[0.7rem] font-medium rounded-md
                           hover:bg-gray-100 transition-all"
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* =======================
         New File Dialog
      ======================= */}
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

            {/* Input */}
            <Input
              value={fileName}
              onChange={(e) => {
                setFileName(e.target.value);
                setError("");
              }}
              placeholder="Enter file name"
              className="
              h-9
              text-sm
              rounded-md
              border-gray-300
              focus:border-blue-500
              focus:ring-2
              focus:ring-blue-500/30
            "
            />

            {/* Error */}
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}

            <DialogFooter className="sm:justify-end">
              <DialogClose asChild>
                <Button
                  onClick={handleCreateFile}
                  className="bg-blue-500 hover:bg-blue-600 text-white"
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

      {/* =======================
         Usage Section
      ======================= */}
      <div className="bg-gray-100 rounded-lg p-3 flex flex-col gap-2">
        {/* Progress Bar */}
        <div className="w-full h-2 bg-gray-300 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 rounded-full transition-all"
            style={{ width: `${(totalFiles / 5) * 100}%` }}
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
