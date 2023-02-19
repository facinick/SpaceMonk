import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'

import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import './scaffold.css'
import { AuthProvider, useAuth } from './auth'

import './index.css'
import { useEffect } from 'react'
import { useThemeStore } from './store/zustand/themeStore'
import { Initialize } from './components/Init/Initialize'

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
              <Routes />
            </Initialize>
          </RedwoodApolloProvider>
        </AuthProvider>
      </RedwoodProvider>
    </FatalErrorBoundary>
  )
}

export default App
