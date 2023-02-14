import { persist, createJSONStorage } from 'zustand/middleware'

import { createZustandChildrenStore } from './store'

type State = {
  body: string
  title: string
  headerImageUrl?: string
}

type Actions = {
  setBody: (body: string) => void
  setTitle: (title: string) => void
  setHeaderImageUrl: (headerImageUrl: string) => void
  reset: () => void
}

type UpdatePostStore = State & Actions

const initialState: State = {
  title: '',
  body: '',
  headerImageUrl: '',
}

const useUpdatePostStore = createZustandChildrenStore<UpdatePostStore>()(
  (set, get) => ({
    ...initialState,
    setBody: (body: string) => {
      set({ body })
    },
    setTitle: (title: string) => {
      set({ title })
    },
    setHeaderImageUrl: (headerImageUrl: string) => {
      set({ headerImageUrl })
    },
    reset: () => set(initialState),
  }),
)

export { useUpdatePostStore, UpdatePostStore }
