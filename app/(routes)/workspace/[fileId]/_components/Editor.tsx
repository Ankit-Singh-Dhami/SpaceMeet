"use client";
import React, { useEffect, useRef, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

const rawDocument = {
  time: Date.now(),
  blocks: [],
  version: "2.28.2",
};

function Editor({
  triggerSave,
  fileId,
  fileData,
}: {
  triggerSave: boolean;
  fileId: any;
  fileData: any;
}) {
  const editorRef = useRef<any>(null);
  const updateDocument = useMutation(api.file.updateDocument);

  // Local state to track editor data live
  const [documentData, setDocumentData] = useState(
    fileData?.document || rawDocument
  );

  // ✅ INIT EDITOR (CLIENT ONLY)
  useEffect(() => {
    if (!fileData) return;
    if (editorRef.current) return;

    const initEditor = async () => {
      const EditorJS = (await import("@editorjs/editorjs")).default;
      const Header = (await import("@editorjs/header")).default;
      const List = (await import("@editorjs/list")).default;
      // @ts-ignore
      const Checklist = (await import("@editorjs/checklist")).default;
      const Paragraph = (await import("@editorjs/paragraph")).default;
      const Warning = (await import("@editorjs/warning")).default;

      const editor = new EditorJS({
        holder: "editorjs",
        autofocus: true,
        data:
          fileData?.document && typeof fileData.document === "string"
            ? JSON.parse(fileData.document)
            : fileData.document || rawDocument,
        tools: {
          header: {
            class: Header as any,
            shortcut: "CMD+SHIFT+H",
            config: { placeholder: "Enter a header" },
          },
          list: { class: List as any, inlineToolbar: true },
          checklist: { class: Checklist as any, inlineToolbar: true },
          paragraph: Paragraph as any,
          warning: Warning as any,
        },
        onChange: async () => {
          if (!editorRef.current) return;
          try {
            const savedData = await editorRef.current.save();
            setDocumentData(savedData); // update local state live
          } catch (err) {
            console.error("Failed to save live data:", err);
          }
        },
      });

      editorRef.current = editor;
    };

    initEditor();

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, [fileData]);

  // ✅ SAVE DOCUMENT ON TRIGGER
  useEffect(() => {
    if (!triggerSave) return;
    if (!editorRef.current) return;

    const save = async () => {
      try {
        const output = await editorRef.current.save();
        await updateDocument({
          _id: fileId,
          document: JSON.stringify(output),
        });
        toast.success("Document Updated!");
      } catch (err) {
        toast.error("Save failed");
        console.error(err);
      }
    };

    save();
  }, [triggerSave, fileId, updateDocument]);

  return <div id="editorjs" className="ml-20 min-h-screen" />;
}

export default Editor;
