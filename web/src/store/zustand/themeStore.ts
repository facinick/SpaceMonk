import { persist, createJSONStorage } from 'zustand/middleware'

import { createZustandChildrenStore } from './store'

export enum LightTheme {
  light = "light",
  winter = "winter",
  lemonade = "lemonade",
  acid = "acid",
  autumn = "autumn",
  cmyk = "cmyk",
  wireframe = "wireframe",
  fantasy = "fantasy",
  pastel = "pastel",
  lofi = "lofi",
  corporate = "corporate",
  emerald = "emerald",
  bumblebee = "bumblebee",
}

export enum MerryLandTheme {
  aqua = "aqua",
  garden = "garden",
  coffee = "coffee",
  valentine = "valentine",
  cyberpunk = "cyberpunk",
  retro = "retro",
  synthwave = "synthwave",
}

export enum DarkTheme {
  black = "black",
  night = "night",
  business = "business",
  dracula = "dracula",
  luxury = "luxury",
  forest = "forest",
  halloween = "halloween",
}

export type Theme = LightTheme | DarkTheme | MerryLandTheme

type State = {
  preferredLightTheme: LightTheme
  preferredDarkTheme: DarkTheme
  preferredMerryLandTheme: MerryLandTheme
  theme: Theme
}

type Actions = {
  setCurrentTheme: (theme: Theme) => void
  switchToPreferredLightTheme: () => void
  switchToPreferredDarkTheme: () => void
  switchToPreferredMerryLandTheme: () => void
  isLightTheme: () => boolean
  isDarkTheme: () => boolean
  isMerryLandTheme: () => boolean
  reset: () => void
}

type ThemeStore = State & Actions

const initialState: State = {
  theme: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? DarkTheme.night : LightTheme.light,
  preferredLightTheme: LightTheme.light,
  preferredDarkTheme: DarkTheme.night,
  preferredMerryLandTheme: MerryLandTheme.cyberpunk
}

const useThemeStore = createZustandChildrenStore<ThemeStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      setCurrentTheme: (theme: Theme) => {

        if (Object.values(LightTheme).includes(theme as LightTheme)) {
          set({ theme: theme, preferredLightTheme: theme as LightTheme })
        }

        else if (Object.values(DarkTheme).includes(theme as DarkTheme)) {
          set({ theme: theme, preferredDarkTheme: theme as DarkTheme })
        }

        else {
          set({ theme: theme, preferredMerryLandTheme: theme as MerryLandTheme })
        }

      },
      switchToPreferredLightTheme: () => {
        set({ theme: get().preferredLightTheme})
      },
      switchToPreferredDarkTheme: () => {
        set({ theme: get().preferredDarkTheme })
      },
      switchToPreferredMerryLandTheme: () => {
        set({ theme: get().preferredMerryLandTheme })
      },
      isLightTheme: () => {
        return Object.values(LightTheme).includes(get().theme as LightTheme)
      },
      isDarkTheme: () => {
        return Object.values(DarkTheme).includes(get().theme as DarkTheme)
      },
      isMerryLandTheme: () => {
        return Object.values(MerryLandTheme).includes(get().theme as MerryLandTheme)
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
