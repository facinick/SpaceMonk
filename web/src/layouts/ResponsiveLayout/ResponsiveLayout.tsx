import { Link, navigate, NavLink, routes, useLocation } from "@redwoodjs/router"
import { Toaster } from "@redwoodjs/web/dist/toast"
import { useEffect, useMemo, useState } from "react"
import { useAuth } from "src/auth"
import { BlogIcon, HomeIcon, LoginIcon, LogoutIcon, NewPostIcon, ResetThemeIcon, UserRegisterIcon, ViewPostsIcon } from "src/components/Icons/icons"
import ModeToggle from "src/components/ModeToggle/ModeToggle"
import ThemeShuffle from "src/components/ThemeShuffle/ThemeShuffle"
import { useThemeStore } from "src/store/zustand/themeStore"
import { wait } from "src/utils/typescript"

type ResponsiveLayoutProps = {
  children?: React.ReactNode
}

const Constants = {
  HeaderTitle: "Website Title",
  HeaderLogoUrl: "https://flowbite.com/docs/images/logo.svg",
}

const ResponsiveLayout = ({ children }: ResponsiveLayoutProps) => {

  const { pathname } = useLocation()

  const { isAuthenticated, logOut, hasRole } = useAuth()

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const { reset } = useThemeStore()


  const onLogout = async () => {
    await logOut()
    setIsOpen(false)
    wait({ seconds: 0.5 })
    navigate(routes.home())
  }

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const isAdmin = hasRole('admin')

  const paths = useMemo(() => {
    return ("Home" + pathname).replace(/^\/?|\/?$/g, "").split("/")
  }, [pathname])

  return (<>
    {/* header content */}
    <header className="bg-base-300 text-base-content">
      <Toaster />
      <div className="navbar rounded-box px-3">
        <div className="flex-1 gap-2">
          <Link to={routes.home()} className="flex items-center">
            <button title="Please take me home" onClick={() => navigate(routes.home())}><HomeIcon /></button>
            {/* <img src={Constants.HeaderLogoUrl} className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" /> */}
          </Link>
          <div className="text-sm breadcrumbs">
            <ul>
              {paths.map((path) => <li key={path}>{path}</li>)}
            </ul>
          </div>
        </div>
        <div className="flex justify-end">
          <div className="flex gap-2 items-center justify-center">
            <Link to={routes.blog()} className="btn btn-primary btn-sm gap-2">Blog
              <BlogIcon />
            </Link>
            <ThemeShuffle />
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-sm btn-ghost rounded-btn">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
              </label>
              <ul tabIndex={0} className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-60 mt-4 gap-y-2">
                {isAdmin &&
                  <>
                    <li key={"create post"}>
                      <NavLink className={'flex justify-between'} activeClassName="active" to={routes.newPost()}><NewPostIcon />{`Create Post`}</NavLink>
                    </li>
                    <li key={"view posts"}>
                      <NavLink className={'flex justify-between'} activeClassName="active" to={routes.posts()}><ViewPostsIcon />{`View Posts`}</NavLink>
                  </li>
                  </>
                }
                {isAuthenticated &&
                  <>
                    <li key={`/logout`}>
                      <button onClick={onLogout} className={'flex justify-between'}><LogoutIcon />{`Logout`}</button>
                    </li>
                  </>
                }
                {!isAuthenticated &&
                  <>
                    <li key={"login"}>
                      <NavLink className={'flex justify-between'} activeClassName="active" to={routes.login()}><LoginIcon />{`Login`}</NavLink>
                    </li>
                    <li key={"signup"}>
                      <NavLink className={'flex justify-between'} activeClassName="active" to={routes.signup()}><UserRegisterIcon />{`Signup`}</NavLink>
                    </li>
                  </>
                }
                <li key={`/toggle_modes`}>
                  <ModeToggle />
                </li>
                <li key={`/reset_theme`}>
                  <button className='flex justify-between' onClick={reset} ><ResetThemeIcon /> Reset Theme</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
    {/* main content */}
    <main className="bg-base-300 text-base-content">
      <div className="flex flex-col items-center px-4 py-8 min-h-[100vh] h-[100%]">
        {children}
      </div>
    </main>
    {/* footer */}
    <footer className="bg-base-300 text-base-content footer footer-center p-4">
      <div>
        <p>Copyright © 2023 - All right reserved by Me</p>
      </div>
    </footer>
  </>)
}

export default ResponsiveLayout
