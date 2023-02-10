import { Link, NavLink, routes, useLocation } from "@redwoodjs/router"
import { Toaster } from "@redwoodjs/web/dist/toast"
import { useMemo } from "react"
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

  const pagesToIgnore = [`post`]

  const navLinks: Array<NavLinkObject> = useMemo(() => Object.entries(routes).filter(([navlink]) => !pagesToIgnore.includes(navlink)).map(([routeName, routePath]) => ({
    routeName: titleCaseWord(routeName),
    routePath: routePath(),
    isActive: pathname === routePath()
  })), [routes]).sort(((navLink) => navLink.routeName === `Home` ? -1 : 1));

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
        </ul>
      </nav>
    </header>
    <main>{children}</main>
  </>)
}

export default ResponsiveLayout
