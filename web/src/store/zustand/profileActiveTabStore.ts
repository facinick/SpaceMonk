import { createJSONStorage, persist } from 'zustand/middleware'

import { createZustandChildrenStore } from './store'

type State = {
  activeTab: 0|1|2
}

type Actions = {
  setActiveTab: (tab: 0 | 1 | 2) => void
  reset: () => void
}

type ProfileActiveTabStore = State & Actions

const initialState: State = {
    activeTab: 0
}

const useProfileActiveTabStore = createZustandChildrenStore<ProfileActiveTabStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      setActiveTab: (tab) =>
        set({activeTab: tab}),
      reset: () => set(initialState),
    }),
    {
      name: 'activeTabStorage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export { ProfileActiveTabStore, useProfileActiveTabStore }

