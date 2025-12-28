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
  const convex = useConvex();

  // ✅ 1. Resolve params
  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await params;
      setFileId(resolvedParams.fileId as Id<"files">);
    };

    resolveParams();
  }, [params]);

  // ✅ 2. Fetch file after fileId exists
  useEffect(() => {
    const fetchFile = async () => {
      if (!fileId) return; // <-- guard here
      const result = await convex.query(api.file.getFileById, { _id: fileId });
      setFileData(result);
      console.log("fileId", fileId);
      console.log("file data", result);
      return result;
    };

    fetchFile();
  }, [fileId]);

  return (
    <div className="h-screen flex flex-col">
      <Header onSave={() => setTriggerSave((prev) => !prev)} />

      <div className="flex flex-1">
        <div className="w-1/2 border-r p-4">
          {fileId && (
            <Editor
              triggerSave={triggerSave}
              fileId={fileId}
              fileData={fileData}
            />
          )}
        </div>

        <div className="w-1/2 h-screen">
          <Canvas
            triggerSave={triggerSave}
            fileId={fileId}
            fileData={fileData}
          />
        </div>
      </div>
    </div>
  );
};

export default FileId;
