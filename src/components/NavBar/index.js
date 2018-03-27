import PropTypes from "prop-types"
import groupBy from "lodash/groupBy"
import map from "lodash/map"
import style from "./style.styl"
import uniqBy from "lodash/uniqBy"
import { Link } from "preact-router/match"
import { connect } from "preact-redux"
import { actions } from "../../config/redux"



export const NavBar = ({ downloadResults, userType, tests }) => {
  const links = groupBy(tests, "name")
  if( userType == "Coach" )
    return (
      <nav className={style.navBar}>
        { map(links, (sublinks, label) => {
          const slug = sublinks[0].id.split(":", 2)[1]
          return (
            <div>
              <Link activeClassName={sublinks.length == 1 && style.active} href={`/test/${slug}`}>{ sublinks[0].name }</Link>
              { sublinks.length > 1 && sublinks.map(link => {
                const slug = link.id.split(":", 2)[1]
                return <Link class={style.sublink} activeClassName={style.active} href={`/test/${slug}`}>{ link.variation }</Link>
              } ) }
            </div>
          )
        } ) }
        <Link activeClassName={style.active} href="/groups">Manage Groups</Link>
        <a onClick={() => downloadResults()} href="#">Download Results</a>
      </nav>
    )
}


NavBar.propTypes = ({
  userType: PropTypes.string
})



export const mapDispatchToProps = dispatch => ({
  downloadResults: () => dispatch(actions.downloadResults())
})



export default connect(undefined, mapDispatchToProps)(NavBar)
