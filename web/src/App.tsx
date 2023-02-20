import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'

import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import './css/scaffold.css'
import { AuthProvider, useAuth } from './auth'

import './css/index.css'
import { HotkeysProvider } from 'react-hotkeys-hook'
import { Initialize } from './features/Init/Initialize'
import { ApphotKeys } from './features/keyboard_support/HotKeys/AppHotKeys'

const App = () => {
  return (
    //@ts-ignore
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
