import React from 'react'

import LoaderHOC from './services/loaderService'
import confirmationDialogService from './services/confirmationDialogService'
import ErrorBoundary from './pages/ErrorBoundary'
import Routes from './routes'

const App = () => {
  return (
    <ErrorBoundary>
      <Routes />
    </ErrorBoundary>
  )
}

export default LoaderHOC(confirmationDialogService(App))
