import { ChangeEvent, useEffect, useRef } from "react"
import { useThemeStore, LightTheme, DarkTheme, MerryLandTheme } from "src/store/zustand/themeStore"
import { wait } from "src/utils/typescript"

const ThemeShuffle = () => {

  const { setCurrentTheme, theme, reset } = useThemeStore()

  const selectRef = useRef<HTMLSelectElement>(null)

  const setTheme = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue: LightTheme | DarkTheme | MerryLandTheme = event.target.value as LightTheme | DarkTheme | MerryLandTheme
    setCurrentTheme(selectedValue)
  }

  return (
    <select onChange={setTheme} ref={selectRef} className="select select-bordered select-sm">
      <optgroup label="Light Themes">
        {
          Object.values(LightTheme).map((value, index) => {
            return (
              <option selected={value === theme} key={value} value={value}>{value}</option>
            )
          })
        }
      </optgroup>
      <optgroup label="Merrry Land Themes">
        {
          Object.values(MerryLandTheme).map((value) => {
            return (
              <option selected={value === theme} key={value} value={value}>{value}</option>
            )
          })
        }
      </optgroup>
      <optgroup label="Dark Themes">
        {
          Object.values(DarkTheme).map((value) => {
            return (
              <option selected={value === theme} key={value} value={value}>{value}</option>
            )
          })
        }
      </optgroup>
    </select>
  )
}

export default ThemeShuffle
