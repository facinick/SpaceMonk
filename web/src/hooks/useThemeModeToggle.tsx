import { useThemeStore } from 'src/store/zustand/themeStore'

interface HookProps {}

export function useThemeModeToggle({}: HookProps): {
  switchMode: () => void
} {
  const {
    isDarkTheme,
    isLightTheme,
    switchToPreferredDarkTheme,
    switchToPreferredLightTheme,
    switchToPreferredMerryLandTheme,
  } = useThemeStore()

  const switchMode = () => {
    if (isDarkTheme()) {
      switchToPreferredLightTheme()
    } else if (isLightTheme()) {
      switchToPreferredMerryLandTheme()
    } else {
      switchToPreferredDarkTheme()
    }
  }

  return { switchMode }
}
