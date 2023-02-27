import { useState, useEffect } from 'react'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from 'web/config/tailwind.config.js'

const {
  theme: { screens },
} = resolveConfig(tailwindConfig)

type Screens = {
  '2xl': string
  lg: string
  md: string
  sm: string
  xl: string
}

const getNextBreakpoint = (current) => {
  const breakpointNames = Object.keys(screens as Screens)
  const currentIndex = breakpointNames.indexOf(current)
  return breakpointNames[currentIndex + 1]
}

const getPrevBreakpoint = (current) => {
  const breakpointNames = Object.keys(screens as Screens)
  const currentIndex = breakpointNames.indexOf(current)
  return breakpointNames[currentIndex - 1]
}

export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState(null)

  useEffect(() => {
    const handleResize = () => {
      const breakpoints = Object.entries(screens as Screens)
      const currentBreakpoint = breakpoints.reduce((acc, [name, size]) => {
        if (window.matchMedia(`(min-width: ${size})`).matches) {
          return name
        }
        return acc
      }, null)
      setBreakpoint(currentBreakpoint)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isMin = (size) => {
    const breakpointSizes = Object.values(screens as Screens)
    const windowSize = window.innerWidth
    const index = breakpointSizes.indexOf(screens[size])
    const breakPoint = Number(breakpointSizes[index].replace('px', ''))
    return windowSize >= breakPoint
  }

  const isMax = (size) => {
    const breakpointSizes = Object.values(screens as Screens)
    const windowSize = window.innerWidth
    const index = breakpointSizes.indexOf(screens[size])
    const breakPoint = Number(breakpointSizes[index].replace('px', ''))
    return windowSize <= breakPoint
  }

  return { breakpoint, isMin, isMax }
}
