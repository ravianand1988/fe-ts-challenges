import { useId, useState, type ReactNode } from "react";
import { cx } from "src/utilities";
import cssUtils from "../../utilities/styles.module.css";
import { Icon } from "./RepoOverview.icons";
import type { IRepoEntry, IRepoOverviewData } from "./RepoOverview.mock";
import css from "./RepoOverview.module.css";

interface IRepoOverviewProps {
  data: IRepoOverviewData;
  activeTabId: string;
  onTabChange: (tabId: string) => void;
  /** Extra content rendered at the bottom of the About sidebar. */
  asideSlot?: ReactNode;
}

/** "message (#123)" with the reference rendered as a link. */
const CommitMessage = ({
  message,
  refId,
}: {
  message: string;
  refId?: string;
}) => (
  <>
    {message}
    {refId && (
      <>
        {" ("}
        <a href={`#${refId.slice(1)}`} className={css.link}>
          {refId}
        </a>
        {")"}
      </>
    )}
  </>
);

const FileRow = ({ entry }: { entry: IRepoEntry }) => (
  <tr className={css.fileRow}>
    <td className={css.fileName}>
      <span className={entry.type === "folder" ? css.folderIcon : css.fileIcon}>
        <Icon name={entry.type} />
      </span>
      <a href={`#${entry.name}`} className={css.rowLink}>
        <span className={css.srOnly}>
          {entry.type === "folder" ? "Folder: " : "File: "}
        </span>
        {entry.name}
      </a>
    </td>
    <td className={css.fileMessage}>
      <CommitMessage message={entry.message} refId={entry.ref} />
    </td>
    <td className={css.fileUpdated}>{entry.updated}</td>
  </tr>
);

const RepoOverview = ({
  data,
  activeTabId,
  onTabChange,
  asideSlot,
}: IRepoOverviewProps) => {
  const [starred, setStarred] = useState(false);
  const [query, setQuery] = useState("");
  const searchId = useId();
  const { latestCommit, about } = data;

  const visibleEntries = data.entries.filter((e) =>
    e.name.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <div className={css.root}>
      {/* Breadcrumb + section navigation */}
      <header className={css.repoHeader}>
        <nav aria-label="Breadcrumb">
          <ol className={cx(css.breadcrumb, cssUtils.flexRowGap8)}>
            <li>
              <a href="#owner" className={css.plainLink}>
                {data.owner}
              </a>
            </li>
            <li aria-hidden="true" className={css.muted}>
              /
            </li>
            <li>
              <a
                href="#repo"
                className={cx(css.plainLink, css.strong)}
                aria-current="page"
              >
                {data.name}
              </a>
            </li>
          </ol>
        </nav>

        <nav aria-label="Repository" className={css.tabsScroller}>
          <ul className={css.tabs}>
            {data.tabs.map((tab) => {
              const active = tab.id === activeTabId;
              return (
                <li key={tab.id}>
                  <a
                    href={`#${tab.id}`}
                    className={cx(css.tab, active ? css.tabActive : "")}
                    aria-current={active ? "page" : undefined}
                    onClick={(e) => {
                      e.preventDefault();
                      onTabChange(tab.id);
                    }}
                  >
                    <Icon name={tab.icon} />
                    {tab.label}
                    {tab.count !== undefined && (
                      <span className={css.counter}>{tab.count}</span>
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>

      {/* Title row */}
      <div className={css.titleRow}>
        <div className={cx(cssUtils.flexRowGap8, css.titleLeft)}>
          <span className={css.avatar} aria-hidden="true">
            {data.name.charAt(0).toUpperCase()}
          </span>
          <h2 className={css.repoName}>{data.name}</h2>
          <span className={css.visibility}>{data.visibility}</span>
        </div>
        <div className={css.actions}>
          <button type="button" className={css.button}>
            <span className={css.sponsorIcon}>
              <Icon name="heart" />
            </span>
            Sponsor
          </button>
          <button type="button" className={css.button}>
            <Icon name="bell" />
            Notifications
          </button>
          <button type="button" className={css.button}>
            <Icon name="fork" />
            Fork <span className={css.counter}>{data.forks}</span>
          </button>
          <button
            type="button"
            className={cx(css.button, starred ? css.buttonOn : "")}
            aria-pressed={starred}
            onClick={() => setStarred((s) => !s)}
          >
            <span aria-hidden="true" className={css.starGlyph}>
              {starred ? "★" : "☆"}
            </span>
            {starred ? "Starred" : "Star"}
            <span className={css.counter}>{data.stars}</span>
          </button>
        </div>
      </div>

      <div className={css.layout}>
        {/* Files column */}
        <section aria-label="Files" className={css.main}>
          <div className={css.toolbar}>
            <div className={css.toolbarLeft}>
              <button
                type="button"
                className={css.button}
                aria-label={`Switch branch, current: ${data.branch}`}
              >
                <Icon name="branch" />
                {data.branch}
                <span aria-hidden="true" className={css.caret}>
                  ▼
                </span>
              </button>
              <a href="#branches" className={css.metaLink}>
                <Icon name="branch" />
                <strong>{data.branchCount}</strong> Branches
              </a>
              <a href="#tags" className={css.metaLink}>
                <Icon name="tag" />
                <strong>{data.tagCount}</strong> Tags
              </a>
            </div>
            <div className={css.toolbarRight}>
              <label htmlFor={searchId} className={css.srOnly}>
                Go to file
              </label>
              <div className={css.searchBox}>
                <Icon name="search" />
                <input
                  id={searchId}
                  type="search"
                  placeholder="Go to file"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <button type="button" className={cx(css.button, css.primary)}>
                <Icon name="code" />
                Code
                <span aria-hidden="true" className={css.caret}>
                  ▼
                </span>
              </button>
            </div>
          </div>

          <div className={css.fileBox}>
            <div className={css.commitBar}>
              <span className={css.commitAvatar} aria-hidden="true">
                {latestCommit.author.charAt(0).toUpperCase()}
              </span>
              <strong className={css.commitAuthor}>
                {latestCommit.author}
              </strong>
              <span className={css.commitMessage}>
                <CommitMessage
                  message={latestCommit.message}
                  refId={latestCommit.ref}
                />
              </span>
              <span className={css.commitMeta}>
                <code>{latestCommit.hash}</code> · {latestCommit.when}
              </span>
              <a href="#commits" className={css.metaLink}>
                <Icon name="clock" />
                <strong>{latestCommit.total}</strong> Commits
              </a>
            </div>

            <table className={css.fileTable}>
              <caption className={css.srOnly}>Files in {data.branch}</caption>
              <thead className={css.srOnly}>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Last commit message</th>
                  <th scope="col">Last updated</th>
                </tr>
              </thead>
              <tbody>
                {visibleEntries.map((entry) => (
                  <FileRow key={entry.id} entry={entry} />
                ))}
              </tbody>
            </table>
            {visibleEntries.length === 0 && (
              <p className={css.empty} role="status">
                No files match “{query}”.
              </p>
            )}
          </div>
        </section>

        {/* About sidebar */}
        <aside aria-labelledby="repo-about-heading" className={css.about}>
          <h3 id="repo-about-heading" className={css.aboutTitle}>
            About
          </h3>
          <p className={css.description}>{about.description}</p>
          <a
            href={`https://${about.website}`}
            className={cx(css.link, css.website)}
          >
            <Icon name="link" />
            {about.website}
          </a>
          <ul className={css.topics} aria-label="Topics">
            {about.topics.map((topic) => (
              <li key={topic}>
                <a href={`#topic-${topic}`} className={css.topic}>
                  {topic}
                </a>
              </li>
            ))}
          </ul>
          <ul className={css.aboutList}>
            {about.links.map((l) => (
              <li key={l.label}>
                <a href={`#${l.icon}`} className={css.metaLink}>
                  <Icon name={l.icon} />
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#stars" className={css.metaLink}>
                <span aria-hidden="true" className={css.starGlyph}>
                  ☆
                </span>
                <strong>{data.stars}</strong> stars
              </a>
            </li>
            <li>
              <a href="#watchers" className={css.metaLink}>
                <Icon name="eye" />
                <strong>{data.watching}</strong> watching
              </a>
            </li>
            <li>
              <a href="#forks" className={css.metaLink}>
                <Icon name="fork" />
                <strong>{data.forks}</strong> forks
              </a>
            </li>
          </ul>
          {asideSlot && <div className={css.asideSlot}>{asideSlot}</div>}
        </aside>
      </div>
    </div>
  );
};

export { RepoOverview };
export type { IRepoOverviewProps };
