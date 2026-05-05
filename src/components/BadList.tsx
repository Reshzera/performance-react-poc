import { useEffect, useState } from "react";
import { buildBadVisibleItems, createDrafts, trackRender } from "./list-utils";
import type { DraftMap, Item } from "./list-utils";

type BadListProps = {
  items: Item[];
  parentPulse: number;
  query: string;
};

function BadList({ items, query, parentPulse }: BadListProps) {
  const renderCount = trackRender("bad-list");
  const [drafts, setDrafts] = useState<DraftMap>(() => createDrafts(items));
  const [visibleItems, setVisibleItems] = useState(() =>
    buildBadVisibleItems(items, query, drafts),
  );
  const [effectRuns, setEffectRuns] = useState(0);

  useEffect(() => {
    setVisibleItems(buildBadVisibleItems(items, query, drafts));
    setEffectRuns((value) => value + 1);
  }, [items, query, drafts, parentPulse]);

  return (
    <article className="card card-bad">
      <header className="card-header">
        <p className="eyebrow">Bad Component</p>
        <h2>Extra renders from anti-patterns</h2>
        <div className="stats">
          <span>renders: {renderCount}</span>
          <span>effect runs: {effectRuns}</span>
        </div>
      </header>

      <p className="card-copy">
        Uses derived state in an effect, index keys, inline handlers, and
        re-runs when the parent updates for no useful reason.
      </p>

      <div className="list">
        {visibleItems.map((item, index) => (
          <label key={index} className="row">
            <span>{item.label}</span>
            <input
              type="text"
              value={drafts[item.id] ?? ""}
              onChange={(event) => {
                const value = event.target.value;
                setDrafts((current) => ({
                  ...current,
                  [item.id]: value,
                }));
              }}
            />
          </label>
        ))}
      </div>
    </article>
  );
}

export default BadList;
