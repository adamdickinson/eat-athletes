import { Component } from "react"
import style from "./style.styl"
import PlusIcon from "react-material-icon-svg/dist/PlusIcon"
import CloseIcon from "react-material-icon-svg/dist/CloseIcon"
import CheckIcon from "react-material-icon-svg/dist/CheckIcon"
import PropTypes from "prop-types"



export class ShotTracker extends Component {

  render({ disabled }) {
    return (
      <div 
        class={style["shot-tracker"]} 
      >
        { !this.state.shotTime && (
          <div class={style.wrap}>
            <button 
              disabled={disabled}
              class={style.button}
              style={{ backgroundImage: "linear-gradient(to right, #4DD0E1, #00B0FF)" }}
              onMouseDown={() => this.shotTaken()} 
              onTouchDown={() => this.shotTaken()}
            >
              <PlusIcon />
              Shot attempted
            </button>
          </div>
        ) }

        { this.state.shotTime && (
          <div class={style.wrap}>
            <button 
              class={style.button}
              style={{ backgroundImage: "linear-gradient(to right, #E14C86, #FE0334)" }}
              onMouseUp={() => this.shotMissed()} 
              onTouchUp={() => this.shotMissed()}
            >
              <CloseIcon />
              Shot missed
            </button>

            <button 
              class={style.button}
              style={{ backgroundImage: "linear-gradient(to right, #00AB9D, #2AA167)" }}
              onMouseUp={() => this.shotMade()} 
              onTouchUp={() => this.shotMade()}
            >
              <CheckIcon />
              Shot made
            </button>
          </div>
        ) }
      </div>
    )
  }



  shotMade() {
    this.props.onShot({ time: this.state.shotTime, made: true })
    this.setState({ shotTime: null })
  }



  shotMissed() {
    this.props.onShot({ time: this.state.shotTime, made: false })
    this.setState({ shotTime: null })
  }



  shotTaken() {
    this.setState({ shotTime: Date.now() })
  }

}



ShotTracker.propTypes = ({
  disabled: PropTypes.bool,
  onShot: PropTypes.func.isRequired
})



export default ShotTracker
