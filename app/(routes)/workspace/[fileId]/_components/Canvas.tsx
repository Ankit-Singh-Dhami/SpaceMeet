import dynamic from "next/dynamic";
import "@excalidraw/excalidraw/index.css";

import { useEffect, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

const Excalidraw = dynamic(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  {
    ssr: false,
  }
);
export default function Canvas({ triggerSave, fileId, fileData }: any) {
  const [whiteBoardData, setWhiteBoardData] = useState<any>();
  const updateWhiteBoard = useMutation(api.files.updateWhiteBoard);

  useEffect(() => {
    triggerSave && saveWhiteBoard();
  }, [triggerSave]);

  const saveWhiteBoard = () => {
    updateWhiteBoard({
      _id: fileId,
      whiteboard: JSON.stringify(whiteBoardData),
    }).then((res) => {
      console.log(res);
    });
  };
  return (
    <>
      <div style={{ height: "600px" }}>
        {fileData && (
          <Excalidraw
            theme="light"
            initialData={{
              elements: fileData?.whiteboard
                ? JSON.parse(fileData.whiteboard)
                : undefined,
            }}
            onChange={(excalidrawElements, appState, files) => {
              setWhiteBoardData(excalidrawElements);
            }}
          ></Excalidraw>
        )}
      </div>
    </>
  );
}
