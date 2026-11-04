import type { ITreeNode } from "../RecursiveFileTree/RecursiveFileTree.mock";

/** A row in the file list: a tree node plus its latest commit info. */
export interface IRepoEntry extends Pick<ITreeNode, "id" | "name" | "type"> {
  message: string;
  /** Optional reference shown as a link at the end of the message. */
  ref?: string;
  updated: string;
}

export type TRepoTabIcon =
  | "code"
  | "issue"
  | "pr"
  | "discussion"
  | "play"
  | "table"
  | "shield"
  | "graph";

export interface IRepoTab {
  id: string;
  label: string;
  icon: TRepoTabIcon;
  count?: number;
}

export type TAboutIcon =
  "book" | "scale" | "heart" | "people" | "shield" | "pulse" | "note";

export interface IAboutLink {
  label: string;
  icon: TAboutIcon;
}

export interface IRepoOverviewData {
  owner: string;
  name: string;
  visibility: "Public" | "Private";
  tabs: IRepoTab[];
  activeTabId: string;
  forks: string;
  stars: string;
  watching: string;
  branch: string;
  branchCount: number;
  tagCount: number;
  latestCommit: {
    author: string;
    message: string;
    ref?: string;
    hash: string;
    when: string;
    total: string;
  };
  entries: IRepoEntry[];
  about: {
    description: string;
    website: string;
    topics: string[];
    links: IAboutLink[];
  };
}

export const REPO_OVERVIEW_MOCK: IRepoOverviewData = {
  owner: "vitejs",
  name: "vite",
  visibility: "Public",
  activeTabId: "code",
  tabs: [
    { id: "code", label: "Code", icon: "code" },
    { id: "issues", label: "Issues", icon: "issue", count: 519 },
    { id: "pulls", label: "Pull requests", icon: "pr", count: 318 },
    { id: "discussions", label: "Discussions", icon: "discussion" },
    { id: "actions", label: "Actions", icon: "play" },
    { id: "projects", label: "Projects", icon: "table" },
    {
      id: "security",
      label: "Security and quality",
      icon: "shield",
      count: 23,
    },
    { id: "insights", label: "Insights", icon: "graph" },
  ],
  forks: "9.1k",
  stars: "83.7k",
  watching: "541",
  branch: "main",
  branchCount: 91,
  tagCount: 1060,
  latestCommit: {
    author: "dependabot[bot]",
    message: "build(deps): bump follow-redirects from 1.16.1 to 1.16.2",
    ref: "#23970",
    hash: "1f60d62",
    when: "1 hour ago",
    total: "9,859",
  },
  entries: [
    {
      id: "1",
      type: "folder",
      name: ".github",
      message: "fix(deps): update all non-major dependencies",
      ref: "#23966",
      updated: "2 days ago",
    },
    {
      id: "2",
      type: "folder",
      name: "docs",
      message: "fix(deps): update all non-major dependencies",
      ref: "#23966",
      updated: "2 days ago",
    },
    {
      id: "3",
      type: "folder",
      name: "packages",
      message:
        "fix(optimizer): resolve subpath imports (#) with Vite's resolver",
      updated: "5 hours ago",
    },
    {
      id: "4",
      type: "folder",
      name: "patches",
      message: "fix(deps): update all non-major dependencies",
      ref: "#22921",
      updated: "4 months ago",
    },
    {
      id: "5",
      type: "folder",
      name: "playground",
      message: "test: exclude runtime symlink when copying playgrounds",
      updated: "1 hour ago",
    },
    {
      id: "6",
      type: "folder",
      name: "scripts",
      message: "chore: avoid recompiling regex in mergeChangelog script",
      updated: "2 months ago",
    },
    {
      id: "7",
      type: "file",
      name: ".editorconfig",
      message: "chore: enforce LF line endings in the repository",
      ref: "#5092",
      updated: "5 years ago",
    },
    {
      id: "8",
      type: "file",
      name: ".git-blame-ignore-revs",
      message: "chore: add 97ad042 to .git-blame-ignore-revs",
      ref: "#23330",
      updated: "3 months ago",
    },
    {
      id: "9",
      type: "file",
      name: ".gitattributes",
      message: "chore: enforce LF line endings in the repository",
      ref: "#5092",
      updated: "5 years ago",
    },
    {
      id: "10",
      type: "file",
      name: ".gitignore",
      message: "feat(config): warn on named imports from JSON modules",
      updated: "3 months ago",
    },
    {
      id: "11",
      type: "file",
      name: ".oxfmtrc.json",
      message: "chore: use oxfmt sortImports",
      ref: "#23319",
      updated: "3 months ago",
    },
  ],
  about: {
    description: "Next generation frontend tooling. It's fast!",
    website: "vite.dev",
    topics: ["build-tool", "dev-server", "frontend", "hmr", "vite"],
    links: [
      { label: "Readme", icon: "book" },
      { label: "MIT license", icon: "scale" },
      { label: "Code of conduct", icon: "heart" },
      { label: "Contributing", icon: "people" },
      { label: "Security policy", icon: "shield" },
      { label: "Activity", icon: "pulse" },
      { label: "Custom properties", icon: "note" },
    ],
  },
};
