import { useThemeModeToggle } from 'src/hooks/useThemeModeToggle'
import { useThemeStore } from 'src/store/zustand/themeStore'
import {
  ArrowRightIcon,
  DarkModeIcon,
  LightModeIcon,
  MerryLandIcon,
} from '../../Icons/icons'

const ThemeModeToggleComponent = () => {
  const { isDarkTheme, isLightTheme } = useThemeStore()

  const darkMode = isDarkTheme()
  const lightMode = isLightTheme()
  const merryLandMod = !darkMode && !lightMode

  const { switchMode } = useThemeModeToggle({})

  return (
    <button className="flex justify-between" onClick={switchMode}>
      {darkMode && <DarkModeIcon />}
      {lightMode && <LightModeIcon />}
      {merryLandMod && <MerryLandIcon />}
      {<ArrowRightIcon />}
      {darkMode && <LightModeIcon />}
      {lightMode && <MerryLandIcon />}
      {merryLandMod && <DarkModeIcon />}
      <kbd className="kbd">`</kbd>
    </button>
  )
}

export default ThemeModeToggleComponent
