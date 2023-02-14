import { Link, navigate, NavLink, routes, useLocation } from "@redwoodjs/router"
import { Toaster } from "@redwoodjs/web/dist/toast"
import { useEffect, useMemo, useState } from "react"
import { useAuth } from "src/auth"
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

  return (<>
    <header>
      <Toaster />
      {/* <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800"> */}
        <div className="navbar bg-base-300 rounded-box">
          <div className="flex-1 px-2 lg:flex-none">
            <Link to={routes.home()} className="flex items-center">
              <img src={Constants.HeaderLogoUrl} className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
              <span className="text-lg font-bold whitespace-nowrap">{Constants.HeaderTitle}</span>
            </Link>
          </div>
          <div className="flex justify-end flex-1 px-2">
            <div className="flex items-stretch gap-2">
              <Link to={routes.blog()} className="btn btn-primary">Blog</Link>
              <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost rounded-btn">      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
</label>
                <ul tabIndex={0} className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 mt-4">
                  {isAdmin && <li key={"create post"}>
                    <NavLink className={pathname === routes.newPost() ? '' : ''} activeClassName="active" to={routes.newPost()}>{`Create Post`}</NavLink>
                  </li>}
                  {isAdmin && <li key={"view posts"}>
                    <NavLink className={pathname === routes.posts() ? '' : ''} activeClassName="active" to={routes.posts()}>{`View Posts`}</NavLink>
                  </li>}
                  {isAuthenticated && <li key={`/logout`}>
                    <button onClick={onLogout} className={''}>{`Logout`}</button>
                  </li>}
                  {!isAuthenticated && <li key={"login"}>
                    <NavLink className={pathname === routes.login() ? '' : ''} activeClassName="active" to={routes.login()}>{`Login`}</NavLink>
                  </li>}
                  {!isAuthenticated && <li key={"signup"}>
                    <NavLink className={pathname === routes.signup() ? '' : ''} activeClassName="active" to={routes.signup()}>{`Signup`}</NavLink>
                  </li>}
                </ul>
              </div>
            </div>
          </div>
        </div>
      {/* </nav> */}
    </header>
    <main>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center px-4 py-8 min-h-[100vh] h-[100%]">
          {children}
        </div>
      </section>
    </main>
    <footer className="footer footer-center p-4 bg-base-300 text-base-content">
      <div>
        <p>Copyright © 2023 - All right reserved by Me</p>
      </div>
    </footer>
  </>)
}

export default ResponsiveLayout
