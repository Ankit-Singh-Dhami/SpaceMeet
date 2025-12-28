import SideBarTopSection, { Team } from "./SideBarTopSection";
import SideBarBottomSection from "./SideBarBottomSection";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useState } from "react";

const SideBar = () => {
  const { user }: any = useKindeBrowserClient();
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  console.log("Selected Team in SideBar:", selectedTeam);
  return (
    <div className="h-screen fixed w-58 border-r border[1px] p-2 flex flex-col">
      <div className="flex-1">
        <SideBarTopSection
          user={user}
          setActiveTeamInfo={(selectedTeam: Team) =>
            setSelectedTeam(selectedTeam)
          }
        />
      </div>

      <div>
        <SideBarBottomSection user={user} selectedTeam={selectedTeam} />
      </div>
    </div>
  );
};

export default SideBar;
