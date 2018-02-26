import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import style from './style.styl';
import logo from "../../assets/logo.svg"



export default class Header extends Component {
	render() {
		return (
			<header class={style.header}>
				<h1>Athlete Portfolio</h1>
        <img src={logo} height="50" />
			</header>
		);
	}
}
