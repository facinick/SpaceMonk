import { createZustandChildrenStore } from './store';

export type BlogPageOrderBy =
  | { createdAt: 'asc' | 'desc' }
  | { score: 'asc' | 'desc' }
  | { activity: 'asc' | 'desc' };

type State = {
  first: number
  orderBy: BlogPageOrderBy
}

type Actions = {
  reset: () => void
  setFirst: (value: number) => void
  incrementFirst: () => void
  setOrderBy: (value: BlogPageOrderBy) => void
}

type BlogPageQueryStore = State & Actions

const initialState: State = {
  first: 2,
  orderBy: {
    createdAt: "desc"
  }
}

const useBlogPageQueryStore = createZustandChildrenStore<BlogPageQueryStore>()(
  (set, get) => ({
    ...initialState,

    setFirst: (value: number) => {
      set({ first: value })
    },

    incrementFirst: () => {
      set((state) => ({ first: state.first + 2 }));
    },

    setOrderBy: (orderBy: BlogPageOrderBy) => {
      set({ orderBy })
    },
    reset: () => set(initialState),
  })
)

export { BlogPageQueryStore, useBlogPageQueryStore };

