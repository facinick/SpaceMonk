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
      <Private unauthenticated="home">
        <Set wrap={ScaffoldLayout} title="Posts" titleTo="posts" buttonLabel="New Post" buttonTo="newPost">
          <Route path="/admin/posts/new" page={PostNewPostPage} name="newPost" />
          <Route path="/admin/posts/{id:Int}/edit" page={PostEditPostPage} name="editPost" />
          <Route path="/admin/posts/{id:Int}" page={PostPostPage} name="post" />
          <Route path="/admin/posts" page={PostPostsPage} name="posts" />
        </Set>
      </Private>
      <Set wrap={ResponsiveLayout}>
        <Route path="/blog" page={BlogPage} name="blog" />
        <Route path="/post/{id:Int}" page={PostPage} name="post" />
        <Route path="/" page={HomePage} name="home" />
        <Route notfound page={NotFoundPage} />
        <Route path="/login" page={LoginPage} name="login" />
        <Route path="/signup" page={SignupPage} name="signup" />
      </Set>
      <Route path="/admin" page={() => <Redirect to={routes.login()} />} name="signup" />
    </Router>
  )
}

export default Routes
