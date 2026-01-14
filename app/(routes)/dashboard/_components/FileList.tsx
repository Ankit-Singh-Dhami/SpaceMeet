"use client";

import { FileListContext } from "@/app/_context/FileListContext";
import { useContext, useEffect, useState } from "react";
import { MoreHorizontal, TrashIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

export interface FILE {
  _id: Id<"files">;
  fileName: string;
  createdBy: string;
  archive: boolean;
  document: string;
  whiteboard: string;
  teamId: string;
  _creationTime: number;
}

const getInitials = (email: string) => email?.charAt(0).toUpperCase();

const FileList = () => {
  const { FileList_, selectedTeamId, setSelectedTeamId } =
    useContext(FileListContext);
  const [fileList, setFileList] = useState<FILE[]>([]);
  const router = useRouter();
  const convex = useConvex();

  useEffect(() => {
    if (Array.isArray(FileList_)) setFileList(FileList_);
  }, [FileList_]);

  const onDeleteButton = async (fileId: Id<"files">) => {
    if (!fileId) return;
    await convex.mutation(api.files.deleteFile, { _id: fileId });
  };

  return (
    <div className="text-[0.7rem] mt-[1rem]">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200">
          <thead>
            <tr className="*:font-medium *:text-gray-900">
              <th className="px-3 py-2">File Name</th>
              <th className="px-3 py-2">Created At</th>
              <th className="px-3 py-2">Edited</th>
              <th className="px-3 py-2">Author</th>
              <th className="px-3 py-2 text-center">User</th>
              <th className="px-3 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 *:even:bg-gray-50">
            {fileList.length > 0 ? (
              fileList.map((file) => (
                <tr
                  key={file._id}
                  onClick={() => router.push("/workspace/" + file._id)}
                >
                  <td className="px-3 py-2">{file.fileName}</td>
                  <td className="px-3 py-2">
                    {new Date(file._creationTime).toLocaleDateString()}
                  </td>
                  <td className="px-3 py-2">—</td>
                  <td className="px-3 py-2">{file.createdBy}</td>
                  <td className="px-3 py-2 text-center">
                    <div className="flex justify-center">
                      <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-[0.65rem] font-semibold">
                        {getInitials(file.createdBy)}
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-2 text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        className="p-1 rounded hover:bg-gray-200 transition "
                        aria-label="More actions"
                      >
                        <MoreHorizontal size={14} />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          className="text-red-600 hover:text-red-800 bg-white "
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteButton(file._id);
                          }}
                        >
                          <TrashIcon />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-3 py-4 text-center text-gray-400">
                  No files found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FileList;
