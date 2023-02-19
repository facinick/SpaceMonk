import { useThemeStore } from 'src/store/zustand/themeStore'
import {
  ArrowRightIcon,
  DarkModeIcon,
  LightModeIcon,
  MerryLandIcon,
} from '../Icons/icons'

const ModeToggle = () => {
  const {
    isDarkTheme,
    isLightTheme,
    theme,
    switchToPreferredDarkTheme,
    switchToPreferredLightTheme,
    switchToPreferredMerryLandTheme,
  } = useThemeStore()

  const darkMode = isDarkTheme()
  const lightMode = isLightTheme()
  const merryLandMod = !darkMode && !lightMode

  const switchMode = () => {
    if (isDarkTheme()) {
      switchToPreferredLightTheme()
    } else if (isLightTheme()) {
      switchToPreferredMerryLandTheme()
    } else {
      switchToPreferredDarkTheme()
    }
  }

  return (
    <button className="flex justify-between" onClick={switchMode}>
      {darkMode && <DarkModeIcon />}
      {lightMode && <LightModeIcon />}
      {merryLandMod && <MerryLandIcon />}
      {<ArrowRightIcon />}
      {darkMode && <LightModeIcon />}
      {lightMode && <MerryLandIcon />}
      {merryLandMod && <DarkModeIcon />}
    </button>
  )
}

export default ModeToggle
