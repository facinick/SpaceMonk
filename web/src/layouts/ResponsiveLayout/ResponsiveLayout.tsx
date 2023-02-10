import { Link, navigate, NavLink, routes, useLocation } from "@redwoodjs/router"
import { Toaster } from "@redwoodjs/web/dist/toast"
import { useMemo } from "react"
import { useAuth } from "src/auth"
import { titleCaseWord } from "src/utils/string"

type ResponsiveLayoutProps = {
  children?: React.ReactNode
}

type NavLinkObject = {
  routeName: string
  routePath: string
  isActive: boolean
}

const ResponsiveLayout = ({ children }: ResponsiveLayoutProps) => {

  const { pathname } = useLocation()

  const { isAuthenticated, logOut, hasRole } = useAuth()

  const pagesToIgnore = [`post`, `editPost`, `postdetailed`, `admin`]

  if(isAuthenticated) {
    pagesToIgnore.push(`login`)
    pagesToIgnore.push(`signup`)
  }

  if(!hasRole('admin')) {
    pagesToIgnore.push(`newPost`)
    pagesToIgnore.push(`posts`)
  }

  const navLinks: Array<NavLinkObject> = useMemo(() => Object.entries(routes).filter(([navlink]) => !pagesToIgnore.includes(navlink)).map(([routeName, routePath]) => ({
    routeName: titleCaseWord(routeName),
    routePath: routePath(),
    isActive: pathname === routePath()
  })), [routes, isAuthenticated, pathname]).sort(((navLink) => navLink.routeName === `Home` ? -1 : 1));


  const onLogout = async () => {
    await logOut()
    navigate(routes.home())
  }

  return (<>
    <header>
      <h1>[Blog]</h1>
      <Toaster />
      <nav>
        <ul className={`flex flex-row gap-2`}>
          {navLinks.map((navlinkObject) => (
            <li key={navlinkObject.routePath}>
              <NavLink className={`underline ${navlinkObject.isActive ? "text-blue-700" : ""}`} activeClassName="active" to={navlinkObject.routePath}>{navlinkObject.routeName}</NavLink>
            </li>
          ))}
          {isAuthenticated && <li key={`/logout`}>
            <button onClick={onLogout} className={`underline`}>{`Logout`}</button>
          </li>}
        </ul>
      </nav>
    </header>
    <main>{children}</main>
  </>)
}

export default ResponsiveLayout
