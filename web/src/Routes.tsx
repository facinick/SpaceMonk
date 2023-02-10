// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Private, Set } from '@redwoodjs/router'

import { useAuth } from './auth'
import ResponsiveLayout from './layouts/ResponsiveLayout/ResponsiveLayout'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
       <Route path="/login" page={LoginPage} name="login" />
       <Route path="/signup" page={SignupPage} name="signup" />
       <Private unauthenticated="home">
       </Private>
       <Set wrap={ResponsiveLayout}>
        <Route path="/blog" page={BlogPage} name="blog" />
        <Route path="/" page={HomePage} name="home" />
        <Route notfound page={NotFoundPage} />
      </Set>
    </Router>
  )
}

export default Routes
