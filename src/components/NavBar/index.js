import { h } from "preact"
import { Link } from "preact-router/match"
import style from "./style.styl"



export const NavBar = ({ userType }) => {

  if( userType == "Coach" )
    return (
      <nav className={style.navBar}>
        <Link activeClassName={style.active} href="/test/beep">Beep Testing</Link>
        <Link activeClassName={style.active} href="/test/speed">Speed Testing</Link>
        <Link activeClassName={style.active} href="/test/agility">Agility Testing</Link>
        <Link activeClassName={style.active} href="/test/body">Body Size / Fat</Link>
        <Link activeClassName={style.active} href="/test/shooting">Shooting Performance</Link>
        <Link activeClassName={style.active} href="/test/ball">Ball Handling</Link>
        <Link activeClassName={style.active} href="/test/leap">Vertical Leap</Link>
      </nav>
    )


  return (
    <nav className={style.navBar}>
      <Link activeClassName={style.active} href="/">Portfolio</Link>
      <Link activeClassName={style.active} href="/beep">Beep Testing</Link>
      <Link activeClassName={style.active} href="/speed">Speed Testing</Link>
      <Link activeClassName={style.active} href="/agility">Agility Testing</Link>
      <Link activeClassName={style.active} href="/body">Body Size / Fat</Link>
      <Link activeClassName={style.active} href="/shooting">Shooting Performance</Link>
      <Link activeClassName={style.active} href="/ball">Ball Handling</Link>
      <Link activeClassName={style.active} href="/leap">Vertical Leap</Link>
    </nav>
  )
}



export default NavBar
