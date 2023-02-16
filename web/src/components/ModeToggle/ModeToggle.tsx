import { useThemeStore } from 'src/store/zustand/themeStore'
import { capitalizeFirstLetter } from 'src/utils/string'

const ModeToggle = () => {

  const { isDarkTheme, isLightTheme, theme, switchToPreferredDarkTheme, switchToPreferredLightTheme, switchToPreferredMerryLandTheme } = useThemeStore()

  const darkMode = isDarkTheme()
  const lightMode = isLightTheme()

  const switchMode = () => {
    if (isDarkTheme()) {
      switchToPreferredLightTheme()
    }

    else if (isLightTheme()) {
      switchToPreferredMerryLandTheme()
    }

    else {
      switchToPreferredDarkTheme()
    }
  }

  return (
    <button onClick={switchMode}>
      {capitalizeFirstLetter(darkMode ? "Dark" : lightMode ? "Light" : "MerryLand")}
      {<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
      </svg>}
      {capitalizeFirstLetter(darkMode ? "Light" : lightMode ? "MerryLand" : "Dark")}
    </button>
  )
}

export default ModeToggle
