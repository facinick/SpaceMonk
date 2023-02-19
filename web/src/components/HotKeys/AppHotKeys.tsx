import { useHotkeys } from 'react-hotkeys-hook'
import { useThemeModeToggle } from 'src/hooks/useThemeModeToggle'

interface ComponentProps {
  children?: React.ReactElement
}

export const ApphotKeys = ({ children }: ComponentProps) => {
  const { switchMode } = useThemeModeToggle({})

  useHotkeys('`', switchMode, {
    scopes: ['app'],
  })

  return <>{children}</>
}
