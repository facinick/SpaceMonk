import { persist, createJSONStorage } from 'zustand/middleware'

import { createZustandChildrenStore } from './store'

type State = {
  data: Record<number, string>
}

type Actions = {
  setBody: (postId: number, body: string) => void
  clearBodyPostI: (postId: number) => void
  reset: () => void
}

type NewCommentStore = State & Actions

const initialState: State = {
  data: {},
}

const useNewCommentStore = createZustandChildrenStore<NewCommentStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      setBody: (postId, body) =>
        set((state) => ({ data: { ...state.data, [postId]: body } })),
      clearBodyPostI: (postId) =>
        set((state) => ({ data: { ...state.data, [postId]: '' } })),
      reset: () => set(initialState),
    }),
    {
      name: 'newCommentStorage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export { useNewCommentStore, NewCommentStore }
