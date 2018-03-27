/* eslint react/no-direct-mutation-state: "off" */

import ProgressBar from "progressbar.js"
import PropTypes from "prop-types"
import isEqual from "lodash/isEqual"
import style from "./style.styl"
import { Component } from "preact"



export const textGradient = ({ from, to }) => ({
  background: `-webkit-linear-gradient(left, ${from}, ${to})`,
  "-webkit-background-clip": "text",
  "-webkit-text-fill-color": "transparent",
})



export class LineStat extends Component {


  _animateProgress(progress) {
    this.state.shape.animate(progress)
  }



  _create(props, oldProps) {
    if( this.state.shape )
      throw new Error("ProgressBar already created")

    const gradientId = props.gradient && `gradient-${props.gradient.from}-${props.gradient.to}`.replace(/#/g, "") 
    const gradientColor = props.gradient ? { color: `url(#${gradientId})` } : {}
    this.state.shape = new ProgressBar.Line(this.container, { ...props.options, ...gradientColor })

    if( props.gradient ) {
      const { from, to } = props.gradient
      this.state.shape.svg.insertAdjacentHTML("afterbegin", `
        <defs>
          <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="${from}"/>
            <stop offset="100%" stop-color="${to}"/>
          </linearGradient>
        </defs>
      `)
    }

    if( props.initialAnimate ) {
      if( oldProps ) this._setProgress(oldProps.progress)
      this._animateProgress(props.progress)

    } else
      this._setProgress(props.progress)
  }



  _destroy() {
    if( this.state.shape ) {
      this.state.shape.destroy()
      this.state.shape = null
    }
  }



  _setProgress(progress) {
    this.state.shape.set(progress)
  }



  componentDidMount() {
    this._create(this.props)
  }



  componentWillReceiveProps(nextProps) {
    if( !isEqual(this.props.options, nextProps.options) ) {
      this._destroy()
      this._create(nextProps, this.props)
      return
    }

    this._animateProgress(nextProps.progress)
  }



  componentWillUnmount() {
    this._destroy()
  }



  render(props) {
    const { change, containerStyle, gradient, label, value } = props
    return (
      <div class={style["line-stat"]}>
        <div class={style.info}>
          <h3 style={textGradient(gradient)}>{label}</h3>
          <span>{value} <small>{change}</small></span>
        </div>
        <div class={style["progressbar-container"]} style={containerStyle} ref={ref => this.container = ref} />
      </div>
    )
  }

}



LineStat.propTypes = ({
  gradient:   PropTypes.shape({
    from:       PropTypes.string.isRequired,
    to:         PropTypes.string.isRequired,
  }),
  options:    PropTypes.object,
  progress:   PropTypes.float,
})



export default LineStat
