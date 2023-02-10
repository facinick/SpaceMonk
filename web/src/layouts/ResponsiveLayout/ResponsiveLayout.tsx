import { Link, navigate, NavLink, routes, useLocation } from "@redwoodjs/router"
import { Toaster } from "@redwoodjs/web/dist/toast"
import { useEffect, useMemo, useState } from "react"
import { useAuth } from "src/auth"
import { titleCaseWord } from "src/utils/string"

type ResponsiveLayoutProps = {
  children?: React.ReactNode
}

const Constants = {
  HeaderTitle: "Website Title",
  HeaderLogoUrl: "https://flowbite.com/docs/images/logo.svg",
}

const currentPageClasses = "block py-2 pr-4 pl-3 text-white rounded bg-primary-700 dark:text-white"
const otherPageClasses = "block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50  dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:border-gray-700"

const ResponsiveLayout = ({ children }: ResponsiveLayoutProps) => {

  const { pathname } = useLocation()

  const { isAuthenticated, logOut, hasRole } = useAuth()

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const onLogout = async () => {
    await logOut()
    navigate(routes.home())
  }

  useEffect(()=>{
    setIsOpen(false)
  },[pathname])

  const isAdmin = hasRole('admin')

  return (<>
    <header>
      <Toaster />
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to={routes.home()} className="flex items-center">
            <img src={Constants.HeaderLogoUrl} className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">{Constants.HeaderTitle}</span>
          </Link>
          <div className="flex items-center">
            <Link to={routes.blog()} className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">Blog</Link>
            <button onClick={() => setIsOpen((state) => !state)} data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
              <svg className={`${isOpen ? "hidden" : ""} w-6 h-6`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
              <svg className={`${!isOpen ? "hidden" : ""} w-6 h-6`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </button>
          </div>
          <div className={`${!isOpen ? "hidden" : ""} justify-between items-center w-full`} id="mobile-menu-2">
            <ul className="flex flex-col mt-4 font-medium gap-2">
              {isAdmin && <li key={"create post"}>
                <NavLink className={pathname === routes.newPost() ? currentPageClasses : otherPageClasses} activeClassName="active" to={routes.newPost()}>{`Create Post`}</NavLink>
              </li>}
              {isAdmin && <li key={"view posts"}>
                <NavLink className={pathname === routes.posts() ? currentPageClasses : otherPageClasses} activeClassName="active" to={routes.posts()}>{`View Posts`}</NavLink>
              </li>}
              {isAuthenticated && <li key={`/logout`}>
                <button onClick={onLogout} className={otherPageClasses}>{`Logout`}</button>
              </li>}
              {!isAuthenticated && <li key={"login"}>
                <NavLink className={pathname === routes.login() ? currentPageClasses : otherPageClasses} activeClassName="active" to={routes.login()}>{`Login`}</NavLink>
              </li>}
              {!isAuthenticated && <li key={"signup"}>
                <NavLink className={pathname === routes.signup() ? currentPageClasses : otherPageClasses} activeClassName="active" to={routes.signup()}>{`Signup`}</NavLink>
              </li>}
            </ul>
          </div>
        </div>
      </nav>
    </header>
    <main>{children}</main>
  </>)
}

export default ResponsiveLayout
