import { createContext } from "react";
import { Id } from "@/convex/_generated/dataModel";

export const TeamContext = createContext<{
  selectedTeamId: Id<"teams"> | null;
  setSelectedTeamId: (id: Id<"teams">) => void;
}>({
  selectedTeamId: null,
  setSelectedTeamId: () => {},
});
