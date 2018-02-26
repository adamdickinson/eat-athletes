import Column from "../../components/column"
import NavBar from "../../components/navBar"
import Profile from "../../components/profile"
import style from "./style.styl"
import { h } from 'preact'



export const Sidebar = props => (
  <div class={style.sidebar}>
    <div style={{ height: "70px", background: "#263740", marginBottom: "-70px" }} />
    <Profile />
    <NavBar />
  </div>
)



export default Sidebar
