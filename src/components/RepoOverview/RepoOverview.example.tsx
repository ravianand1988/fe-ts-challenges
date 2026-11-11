import { useState } from "react";
import { CountrySelect } from "../CountrySelect/CountrySelect";
import { RepoOverview } from "./RepoOverview";
import { REPO_OVERVIEW_MOCK } from "./RepoOverview.mock";

export const RepoOverviewExample = () => {
  const [activeTabId, setActiveTabId] = useState(
    REPO_OVERVIEW_MOCK.activeTabId,
  );

  const handleCountrySelect = (value: string | string[]) => {
    console.log("on country select: ", value);
  };

  return (
    <RepoOverview
      data={REPO_OVERVIEW_MOCK}
      activeTabId={activeTabId}
      onTabChange={setActiveTabId}
      asideSlot={
        <>
          <CountrySelect onSelect={handleCountrySelect} />
          <CountrySelect onSelect={handleCountrySelect} multi />
        </>
      }
    />
  );
};
