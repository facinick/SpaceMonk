import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'

import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import './css/scaffold.css'
import { AuthProvider, useAuth } from './auth'

import './css/index.css'
import { useEffect } from 'react'
import { useThemeStore } from './store/zustand/themeStore'
import { HotkeysProvider } from 'react-hotkeys-hook'
import { Initialize } from './features/Init/Initialize'
import { ApphotKeys } from './features/keyboard_support/HotKeys/AppHotKeys'

const App = () => {
  const { switchToPreferredDarkTheme, switchToPreferredLightTheme, theme } =
    useThemeStore()

  useEffect(() => {
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (event) => {
        event.matches
          ? switchToPreferredDarkTheme()
          : switchToPreferredLightTheme()
      })

    return () => {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', (event) => {
          event.matches
            ? switchToPreferredDarkTheme()
            : switchToPreferredLightTheme()
        })
    }
  }, [])

  useEffect(() => {
    document.querySelector('html').setAttribute('data-theme', theme)
  }, [theme])

  return (
    <FatalErrorBoundary page={FatalErrorPage}>
      <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
        <AuthProvider>
          <RedwoodApolloProvider useAuth={useAuth}>
            <Initialize>
              <HotkeysProvider initiallyActiveScopes={['app']}>
                <ApphotKeys>
                  <Routes />
                </ApphotKeys>
              </HotkeysProvider>
            </Initialize>
          </RedwoodApolloProvider>
        </AuthProvider>
      </RedwoodProvider>
    </FatalErrorBoundary>
  )
}

export default App
