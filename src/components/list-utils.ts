export type Item = {
  id: number
  label: string
}

export type DraftMap = Record<number, string>

const renderStore = new Map<string, number>()

export function createDrafts(items: Item[]) {
  return items.reduce<DraftMap>((accumulator, item) => {
    accumulator[item.id] = `${item.label} note`
    return accumulator
  }, {})
}

export function buildBadVisibleItems(items: Item[], query: string, drafts: DraftMap) {
  const normalizedQuery = query.trim().toLowerCase()

  return items
    .filter((item) => {
      const label = item.label.toLowerCase()
      const draft = (drafts[item.id] ?? '').toLowerCase()
      return `${label} ${draft}`.includes(normalizedQuery)
    })
    .map((item) => ({
      ...item,
    }))
}

export function buildGoodVisibleItems(items: Item[], query: string, drafts: DraftMap) {
  const normalizedQuery = query.trim().toLowerCase()

  return items.filter((item) => {
    const label = item.label.toLowerCase()
    const draft = (drafts[item.id] ?? '').toLowerCase()
    return `${label} ${draft}`.includes(normalizedQuery)
  })
}

export function trackRender(id: string) {
  const nextCount = (renderStore.get(id) ?? 0) + 1
  renderStore.set(id, nextCount)
  return nextCount
}
