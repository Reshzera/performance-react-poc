import { useCallback, useDeferredValue, useMemo, useState } from 'react'
import {
  buildGoodVisibleItems,
  createDrafts,
  trackRender,
} from './list-utils'
import type { DraftMap, Item } from './list-utils'

type GoodListProps = {
  items: Item[]
  query: string
}

function GoodList({ items, query }: GoodListProps) {
  const renderCount = trackRender('good-list')
  const [drafts, setDrafts] = useState<DraftMap>(() => createDrafts(items))
  const deferredQuery = useDeferredValue(query)

  const visibleItems = useMemo(
    () => buildGoodVisibleItems(items, deferredQuery, drafts),
    [items, deferredQuery, drafts],
  )

  const handleChange = useCallback((id: number, value: string) => {
    setDrafts((current) => {
      if (current[id] === value) {
        return current
      }

      return {
        ...current,
        [id]: value,
      }
    })
  }, [])

  return (
    <article className="card card-good">
      <header className="card-header">
        <p className="eyebrow">Good Component</p>
        <h2>Only recomputes when relevant data changes</h2>
        <div className="stats">
          <span>renders: {renderCount}</span>
          <span>query: {deferredQuery === query ? 'live' : 'deferred'}</span>
        </div>
      </header>

      <p className="card-copy">
        Keeps filtered data in <code>useMemo</code>, uses stable handlers, and
        does not care about unrelated parent updates.
      </p>

      <div className="list">
        {visibleItems.map((item) => (
          <label key={item.id} className="row">
            <span>{item.label}</span>
            <input
              type="text"
              value={drafts[item.id] ?? ''}
              onChange={(event) => {
                handleChange(item.id, event.target.value)
              }}
            />
          </label>
        ))}
      </div>
    </article>
  )
}

export default GoodList
