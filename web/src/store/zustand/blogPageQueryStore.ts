import { createZustandChildrenStore } from './store'

export type BlogPageOrderBy = 'asc' | 'desc'
export type BlogPageOrderKey = 'createdAt' | 'score' | 'activity'

type State = {
  skip?: number
  take?: number
  filter?: string
  orderByKey?: BlogPageOrderKey
  orderByOrder: BlogPageOrderBy
  cursor?: number
}

type Actions = {
  reset: () => void
  setSkip: (value: number) => void
  setTake: (value: number) => void
  setFilter: (value: string) => void
  setKey: (value: BlogPageOrderKey) => void
  setOrder: (value: BlogPageOrderBy) => void
  setCursor: (value: number) => void
}

type BlogPageQueryStore = State & Actions

const initialState: State = {
  skip: 0,
  take: undefined,
  filter: undefined,
  orderByKey: 'createdAt',
  orderByOrder: 'desc',
  cursor: undefined,
}

const blogPageQueryStore = createZustandChildrenStore<BlogPageQueryStore>()(
  (set, get) => ({
    ...initialState,

    setSkip: (value: number) => {
      set({ skip: value })
    },
    setTake: (value: number) => {
      set({ take: value })
    },
    setFilter: (value: string) => {
      set({ filter: value })
    },
    setKey: (value: BlogPageOrderKey) => {
      set({
        orderByKey: value,
      })
    },
    setOrder: (value: BlogPageOrderBy) => {
      set({
        orderByOrder: value,
      })
    },
    setCursor: (value: number) => {
      set({
        cursor: value,
      })
    },
    reset: () => set(initialState),
  })
)

export { blogPageQueryStore, BlogPageQueryStore }
