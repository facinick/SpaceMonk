import { persist, createJSONStorage } from 'zustand/middleware'

import { createZustandChildrenStore } from './store'

export enum Theme {
  light = "light",
  dark = "dark",
  cupcake = "cupcake",
  bumblebee = "bumblebee",
  emerald = "emerald",
  corporate = "corporate",
  synthwave = "synthwave",
  retro = "retro",
  cyberpunk = "cyberpunk",
  valentine = "valentine",
  halloween = "halloween",
  garden = "garden",
  forest = "forest",
  aqua = "aqua",
  lofi = "lofi",
  pastel = "pastel",
  fantasy = "fantasy",
  wireframe = "wireframe",
  black = "black",
  luxury = "luxury",
  dracula = "dracula",
  cmyk = "cmyk",
  autumn = "autumn",
  business = "business",
  acid = "acid",
  lemonade = "lemonade",
  night = "night",
  coffee = "coffee",
  winter = "winter"
}

export enum Mode {
  light = 'light',
  dark = 'dark'
}

type State = {
  theme: Theme
  mode: Mode
}

type Actions = {
  setTheme: (theme: Theme) => void
  setMode: (mode: Mode) => void
  reset: () => void
}

type ThemeStore = State & Actions

export const getThemeForCurrentMode = (mode: Mode): Theme => {
  switch (mode) {
    case Mode.dark: {
      return Theme.night
    }
    case Mode.light: {
      return Theme.light
    }
  }
}

const initialState: State = {
  theme: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? Theme.dark : Theme.light,
  mode: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? Mode.dark : Mode.light,
}

const useThemeStore = createZustandChildrenStore<ThemeStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      setTheme: (theme: Theme) => {
        set({ theme })
      },
      setMode: (mode: Mode) => {
        set({ mode })
      },
      reset: () => set(initialState),
    }),
    {
      name: 'themeStorage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export { useThemeStore, ThemeStore }
