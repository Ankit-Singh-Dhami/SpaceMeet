"use client";

import { useEffect, useState } from "react";
import Editor from "./_components/Editor";
import Header from "./_components/Header";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import Canvas from "./_components/Canvas";

const FileId = ({ params }: any) => {
  const [fileId, setFileId] = useState<Id<"files"> | null>(null);
  const [triggerSave, setTriggerSave] = useState(false);
  const [fileData, setFileData] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"document" | "both" | "canvas">(
    "document"
  ); // NEW
  const convex = useConvex();

  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await params;
      setFileId(resolvedParams.fileId as Id<"files">);
    };
    resolveParams();
  }, [params]);

  useEffect(() => {
    const fetchFile = async () => {
      if (!fileId) return;
      const result = await convex.query(api.file.getFileById, { _id: fileId });
      setFileData(result);
    };
    fetchFile();
  }, [fileId]);

  return (
    <div className="h-screen flex flex-col">
      <Header
        onSave={() => setTriggerSave((prev) => !prev)}
        fileData={fileData}
        setActiveTab={setActiveTab} // pass setter
      />

      <div className="flex flex-1">
        {/* Editor */}
        <div
          className={`p-4 border-r transition-all duration-300
      ${activeTab === "document" ? "w-full" : activeTab === "both" ? "w-1/2" : "w-0"}
      ${activeTab === "canvas" ? "overflow-hidden" : ""}
    `}
        >
          {fileId && (
            <Editor
              triggerSave={triggerSave}
              fileId={fileId}
              fileData={fileData}
            />
          )}
        </div>

        {/* Canvas */}
        <div
          className={`h-screen transition-all duration-300
      ${activeTab === "canvas" ? "w-full" : activeTab === "both" ? "w-1/2" : "w-0"}
      ${activeTab === "document" ? "overflow-hidden" : ""}
    `}
        >
          {fileId && (
            <Canvas
              triggerSave={triggerSave}
              fileId={fileId}
              fileData={fileData}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default FileId;
