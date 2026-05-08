import { useCallback, useState } from "react";
import type { ChangeEvent } from "react";
import BadList from "./components/BadList";
import GoodList from "./components/GoodList";
import "./App.css";
import type { Item } from "./components/list-utils";

const ITEMS: Item[] = [
  { id: 1, label: "Alpha" },
  { id: 2, label: "Bravo" },
  { id: 3, label: "Charlie" },
  { id: 4, label: "Delta" },
  { id: 5, label: "Echo" },
  { id: 6, label: "Foxtrot" },
];

function App() {
  const [query, setQuery] = useState("");

  const handleSearchChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value);
    },
    [],
  );

  return (
    <main className="app">
      <section className="toolbar">
        <label className="field">
          <span>Filter items</span>
          <input
            type="text"
            value={query}
            onChange={handleSearchChange}
            placeholder="Type to filter both lists"
          />
        </label>
      </section>

      <section className="comparison">
        <BadList items={ITEMS} query={query} />
        <GoodList items={ITEMS} query={query} />
      </section>
    </main>
  );
}

export default App;
