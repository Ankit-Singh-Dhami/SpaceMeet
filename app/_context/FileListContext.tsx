import { createContext } from "react";

export const FileListContext = createContext<any>({
  FileList_: [],
  setFileList_: () => {},
  refreshFileList: async () => {},
});
