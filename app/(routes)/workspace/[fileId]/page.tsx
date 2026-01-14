"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Editor from "./_components/Editor";
import Header from "./_components/Header";
import Canvas from "./_components/Canvas";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

type FileType = {
  _id: Id<"files">;
  fileName: string;
  document: string;
  whiteboard: string;
  teamId: Id<"teams">;
  createdBy: string;
  archive: boolean;
};

const FileId = () => {
  const convex = useConvex();
  const params = useParams();

  const [fileId, setFileId] = useState<Id<"files"> | null>(null);
  const [fileData, setFileData] = useState<FileType | null>(null);
  const [triggerSave, setTriggerSave] = useState(false);
  const [activeTab, setActiveTab] = useState<"document" | "both" | "canvas">(
    "document"
  );

  /* ✅ Resolve fileId */
  useEffect(() => {
    if (!params?.fileId) return;
    setFileId(params.fileId as Id<"files">);
  }, [params]);

  /* ✅ Fetch file */
  useEffect(() => {
    if (!fileId) return;

    const fetchFile = async () => {
      const result = await convex.query(api.files.getFileById, {
        _id: fileId,
      });
      setFileData(result);
    };

    fetchFile();
  }, [fileId]);

  return (
    <div className="h-screen flex flex-col">
      <Header
        onSave={() => setTriggerSave((p) => !p)}
        fileData={fileData}
        setActiveTab={setActiveTab}
      />

      <div className="flex flex-1">
        {/* Editor */}
        <div
          className={`p-4 border-r transition-all duration-300
            ${activeTab === "document" ? "w-full" : activeTab === "both" ? "w-1/2" : "w-0"}
          `}
        >
          {fileId && fileData && (
            <Editor
              triggerSave={triggerSave}
              fileId={fileId}
              fileData={fileData.document}
            />
          )}
        </div>

        {/* Canvas */}
        <div
          className={`transition-all duration-300
            ${activeTab === "canvas" ? "w-full" : activeTab === "both" ? "w-1/2" : "w-0"}
          `}
        >
          {fileId && fileData && (
            <Canvas
              triggerSave={triggerSave}
              fileId={fileId}
              fileData={fileData.whiteboard}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default FileId;
