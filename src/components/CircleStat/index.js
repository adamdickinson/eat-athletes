/* eslint react/no-direct-mutation-state: "off" */

import ProgressBar from "progressbar.js"
import PropTypes from "prop-types"
import isEqual from "lodash/isEqual"
import render from "preact-render-to-string" 
import style from "./style.styl"
import { Component } from "preact"



export class CircleStat extends Component {


  _animateProgress(progress) {
    this.state.shape.animate(progress)
  }



  _create(props, oldProps) {
    if( this.state.shape )
      throw new Error("ProgressBar already created")

    const gradientId = props.gradient && `gradient-${props.gradient.from}-${props.gradient.to}`.replace(/#/g, "") 
    const gradientColor = props.gradient ? { color: `url(#${gradientId})` } : {}
    this.state.shape = new ProgressBar.Circle(this.container, { ...props.options, ...gradientColor })

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

    this._setText(props.result, props.label, props.change, props.changeType, props.gradient)
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



  _setText(result, label, change, type, gradient) {
    if( result || label || change ) {
      const typeColors = {
        good: "#00C853",
        bad:  "#E14C86"
      }

      const text = [
        <span key="result" style={{ fontSize: "36px", textAlign: "center", display: "block" }}>{result}</span>,
        <span key="label" style={{ 
          textAlign: "center", 
          display: "block",
          fontSize: "13px",
          background: `-webkit-linear-gradient(left, ${gradient.from}, ${gradient.to})`,
          "-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent",
          fontWeight: "bold"
        }}>{label}</span>,
        <span key="change" style={{ color: typeColors[type], fontSize: "18px", marginTop: "8px", textAlign: "center", display: "block" }}>{change}</span>
      ].map(render).join("\n")

      this.state.shape.setText(text)
    }
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
    this._setText(nextProps.result, nextProps.label, nextProps.change, nextProps.changeType, nextProps.gradient)
  }



  componentWillUnmount() {
    this._destroy()
  }



  render(props) {
    const { containerStyle } = props
    return <div class={style["progressbar-container"]} style={containerStyle} ref={ref => this.container = ref} />
  }

}



CircleStat.propTypes = ({
  containerStyle: PropTypes.object,
  change:     PropTypes.string,
  changeType: PropTypes.string,
  gradient:   PropTypes.shape({
    from:       PropTypes.string.isRequired,
    to:         PropTypes.string.isRequired,
  }),
  label:      PropTypes.string,
  options:    PropTypes.object,
  progress:   PropTypes.float,
  result:     PropTypes.string,
})



export default CircleStat
