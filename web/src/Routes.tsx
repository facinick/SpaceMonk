// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Private } from '@redwoodjs/router'

import { useAuth } from './auth'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
       <Route path="/login" page={LoginPage} name="login" />
       <Route path="/signup" page={SignupPage} name="signup" />
       <Route path="/blog" page={BlogPage} name="blog" />
       <Route path="/home" page={HomePage} name="home" />
       <Private unauthenticated="home">

      </Private>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
