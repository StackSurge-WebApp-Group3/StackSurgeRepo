import { Route, Routes } from 'react-router-dom'

import { ROUTES } from './routes'

function Router() {
  return (
    <Routes>
      {ROUTES.map((route) => {
        const { Component, path } = route

        return (
          <Route
            element={<Component />}
            path={path}
          />
        )
      })}
    </Routes>
  )
}

export default Router
