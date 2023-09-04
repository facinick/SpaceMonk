import { Link, navigate, NavLink, routes, useLocation } from '@redwoodjs/router'
import { toast, Toaster } from '@redwoodjs/web/dist/toast'
import { useMemo } from 'react'
import { useAuth } from 'src/auth'
import {
  BlogIcon,
  BurgerMenuIcon,
  HomeIcon,
  LoginIcon,
  LogoutIcon,
  NewPostIcon,
  ResetThemeIcon,
  SearchIcon,
  TagIcon,
  UserLoginIcon,
  UserRegisterIcon,
} from 'src/features/Icons/icons'
import ThemeModeToggleComponent from 'src/features/theme/ThemeModeToggleComponent/ThemeModeToggleComponent'
import ThemeSelectComponent from 'src/features/theme/ThemeSelectComponent/ThemeSelectComponent'
import { useBreakpoint } from 'src/hooks/useBreakpoint'
import { useThemeStore } from 'src/store/zustand/themeStore'
import { wait } from 'src/utils/misc'

type ResponsiveLayoutProps = {
  children?: React.ReactNode
}

const Constants = {
  HeaderTitle: 'Website Title',
  HeaderLogoUrl: 'https://flowbite.com/docs/images/logo.svg',
}

const ResponsiveLayout = ({ children }: ResponsiveLayoutProps) => {
  const { pathname } = useLocation()

  const { logOut, currentUser } = useAuth()

  const { reset: resetTheme } = useThemeStore()

  const { isMin } = useBreakpoint()

  const renderButtonTexts = isMin('sm')

  const onLogout = async () => {
    await logOut()
    wait({ seconds: 0.5 })
    toast.success("Logged out!")
    navigate(routes.home())
  }

  const paths = useMemo(() => {
    return ('Home' + pathname).replace(/^\/?|\/?$/g, '').split('/')
  }, [pathname])

  const currentUserOrFalse = currentUser ? currentUser : false
  const isAutenticated = currentUserOrFalse !== false
  const canCreate = currentUserOrFalse !== false
  const isAuthorizedToCreate = canCreate

  return (
    <>
      {/* header content */}
      <header className="bg-base-300 text-base-content">
        <Toaster
          toastOptions={{
            position: 'bottom-left',
            success: {
              className: 'alert alert-success',
            },
            error: {
              className: 'alert alert-error',
            },
          }}
        />
        <div className="flex justify-between navbar rounded-box px-3">
          <div className="gap-2 shrink-0">
            <Link to={routes.home()} className="btn-ghost btn-sm btn gap-2" title="Please take me home">
                {renderButtonTexts && "Home"}
                <HomeIcon />
            </Link>
            <Link to={routes.tags()} className="btn-ghost btn-sm btn gap-2" title="You're it!">
                {renderButtonTexts && "Tags"}
                <TagIcon />
            </Link>
            <Link to={routes.search()} className="btn-ghost btn-sm btn gap-2" title="Lost, but not for long. I always find my way.">
                {renderButtonTexts && "Search"}
                <SearchIcon />
            </Link>
          </div>
          <div className="flex justify-end">
            <div className="flex items-center justify-center gap-2">
              {/* BLOG LINK */}
              <Link to={routes.blog()} className="btn-primary btn-sm btn gap-2">
                {renderButtonTexts && "Blog"}
                <BlogIcon />
              </Link>
              {/* THEME SELECT */}
              <ThemeSelectComponent />
              {/* RIGHT BURGER MENU */}
              <div className="dropdown-end dropdown">
                {/* BURGER MENU ICON */}
                <label
                  tabIndex={0}
                  className="btn-ghost rounded-btn btn-sm btn"
                >
                  <BurgerMenuIcon />
                </label>
                {/* BURGER MENU CONTENT*/}
                <ul
                  tabIndex={0}
                  className="dropdown-content menu rounded-box mt-4 w-60 gap-y-2 bg-base-100 p-2 shadow"
                >
                  {/* PROFILE */}
                  {isAutenticated && (
                    <li key={'profile'}>
                      <NavLink
                        className={'flex justify-between'}
                        activeClassName="active"
                        to={routes.profile({
                          username: currentUserOrFalse.username,
                        })}
                      >
                        <div className="h-6 w-6">
                          <UserLoginIcon />
                        </div>
                        {`View Profile`}
                      </NavLink>
                    </li>
                  )}
                  {/* CREATE POST */}
                  {isAuthorizedToCreate && (
                    <li key={'create post'}>
                      <NavLink
                        className={'flex justify-between'}
                        activeClassName="active"
                        to={routes.newPost()}
                      >
                        <NewPostIcon />
                        {`Create Post`}
                      </NavLink>
                    </li>
                  )}
                  {/* LOGIN SIGNUP */}
                  {!isAutenticated && (
                    <>
                      <li key={'login'}>
                        <NavLink
                          className={'flex justify-between'}
                          activeClassName="active"
                          to={routes.login()}
                        >
                          <LoginIcon />
                          {`Login`}
                        </NavLink>
                      </li>
                      <li key={'signup'}>
                        <NavLink
                          className={'flex justify-between'}
                          activeClassName="active"
                          to={routes.signup()}
                        >
                          <UserRegisterIcon />
                          {`Signup`}
                        </NavLink>
                      </li>
                    </>
                  )}
                  {/* TOGLE DARK MARRYLAND NIGHT MODES */}
                  <li key={`/toggle_modes`}>
                    <ThemeModeToggleComponent />
                    {/* <kbd className="kbd">`</kbd> */}
                  </li>
                  {/* RESET THEME */}
                  <li key={`/reset_theme`}>
                    <button
                      className="flex justify-between"
                      onClick={resetTheme}
                    >
                      <ResetThemeIcon /> Reset Theme
                    </button>
                  </li>
                  {/* LOGOUT */}
                  {isAutenticated && (
                    <li key={`/logout`}>
                      <button
                        onClick={onLogout}
                        className={'flex justify-between'}
                      >
                        <LogoutIcon />
                        {`Logout`}
                      </button>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-box px-3">
          <div className="flex-1 gap-2">
            <div className="breadcrumbs text-sm">
              <ul>
                {paths.map((path) => (
                  <li key={path}>{path}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </header>
      {/* main content */}
      <main className="grow bg-base-300 text-base-content">
        <div className="h-min-[calc(100%-152px)] flex h-[100%] flex-col items-center px-4 py-8">
          {children}
        </div>
      </main>
      {/* footer */}
      <footer className="footer footer-center bg-base-300 p-4 text-base-content">
        <div>
          <p>Copyright © 2023 - All right reserved by Me</p>
        </div>
      </footer>
    </>
  )
}

export default ResponsiveLayout
