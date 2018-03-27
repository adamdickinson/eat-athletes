import logo from "../../assets/logo.svg"
import style from "./style.styl"
import { Component } from "preact"



export default class Header extends Component {
  render() {
    return (
      <header class={style.header}>
        <h1>Athlete Portfolio</h1>
        <img src={logo} height="50" />
      </header>
    )
  }
}
