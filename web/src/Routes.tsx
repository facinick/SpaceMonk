// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Private, Set, Redirect, routes } from '@redwoodjs/router'

import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

import { useAuth } from './auth'
import ResponsiveLayout from './layouts/ResponsiveLayout/ResponsiveLayout'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Set wrap={ResponsiveLayout}>
        {/* only logged in user with admin role can edit posts */}
        {/* Public Routes */}
        <Private unauthenticated="home" roles="admin">
          <Route path="/admin/posts/new" page={AdminPostNewPostPage} name="newPost" />
          <Route path="/admin/posts/{id:Int}/edit" page={AdminPostEditPostPage} name="editPost" />
          <Route path="/admin/posts/{id:Int}" page={AdminPostPostPage} name="post" />
          <Route path="/admin/posts" page={AdminPostPostsPage} name="posts" />
        </Private>

        {/* Public Routes */}
        <Route path="/" page={HomePage} name="home" />
        <Route path="/blog" page={BlogPage} name="blog" />
        <Route path="/post/{id:Int}" page={PostPage} name="postdetailed" />
        <Route path="/login" page={LoginPage} name="login" />
        <Route path="/signup" page={SignupPage} name="signup" />
        <Route notfound page={NotFoundPage} />
      </Set>
      <Route path="/admin" page={() => <Redirect to={routes.login()} />} name="admin" />
    </Router>
  )
}

export default Routes
