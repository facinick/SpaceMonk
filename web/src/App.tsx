import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'

import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import './scaffold.css'
import { AuthProvider, useAuth } from './auth'

import './index.css'
import { useEffect } from 'react'
import { getThemeForCurrentMode, Mode, useThemeStore } from './store/zustand/themeStore'

const App = () => {

  const { mode, setMode } = useThemeStore()

  useEffect(() => {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
      event.matches ? setMode(Mode.dark) : setMode(Mode.light);
    })

    return () => {
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', event => {
        event.matches ? setMode(Mode.dark) : setMode(Mode.light);
      })
    }
  }, [])

  useEffect(() => {
    document.querySelector('html').setAttribute('data-theme', getThemeForCurrentMode(mode));
  }, [mode])

  return (
    //@ts-ignore
    <FatalErrorBoundary page={FatalErrorPage}>
      <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
        <AuthProvider>
          <RedwoodApolloProvider useAuth={useAuth}>
            <Routes />
          </RedwoodApolloProvider>
        </AuthProvider>
      </RedwoodProvider>
    </FatalErrorBoundary>)
}

export default App
