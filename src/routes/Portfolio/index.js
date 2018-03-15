import Column from "../../components/Column"
import ContentCell from "../../components/ContentCell"
import relayEnvironment from "../../config/relay"
import style from './style.styl'
import { CircleStat } from "../../components/CircleStat"
import { LineStat } from "../../components/LineStat"
import { graphql, QueryRenderer } from 'react-relay'
import { h, Component } from 'preact'



export default class Portfolio extends Component {

	render({ student }) {

    const PortfolioLineStat = ({ color, ...props }) => {
      const gradients = {
        good:    { from: "#00AB9D", to: "#2AA167" },
        average: { from: "#FF7614", to: "#D55D5D" },
        bad:     { to: "#E14C86", from: "#FE0334" }
      }
      return (
        <LineStat 
          {...props}
          gradient={gradients[color]}
          options={{ 
            strokeWidth: 4.5,
            trailWidth: 0.8,
            trailColor: "rgba(255,255,255,0.4)"
          }} 
        />
      )
    }

    const PortfolioCircleStat = ({ color, ...props }) => {
      const gradients = {
        good:    { from: "#00AB9D", to: "#2AA167" },
        average: { from: "#FF7614", to: "#D55D5D" },
        bad:     { from: "#E14C86", to: "#FE0334" }
      }
      return (
        <CircleStat 
          {...props}
          gradient={gradients[color]}
          containerStyle={{ width: "240px", height: "240px", margin: "0 30px 0 0" }} 
          options={{ 
            strokeWidth: 7,
            trailWidth: 1.5,
            trailColor: "rgba(255,255,255,0.4)"
          }} 
        />
      )
    }

		return (
      <div class={style.portfolio}>

        <Column>
          <ContentCell title="Performance Summary" style={{ margin: "30px", textAlign: "center" }}>
            <PortfolioCircleStat 
              progress={0.62} 
              color="average" 
              result="74cm" 
              label="Standing Vertical Leap" 
              change="-2cm"
              changeType="bad"
            />

            <PortfolioCircleStat 
              progress={0.85} 
              color="good" 
              result="122cm" 
              label="Max Vertical Leap" 
              change="+7cm"
              changeType="good"
            />

            <PortfolioCircleStat 
              progress={0.92} 
              color="good" 
              result="8.114s" 
              label="Lane Agility" 
              change="-0.321s" 
              changeType="good"
            />

            <PortfolioCircleStat 
              progress={0.45} 
              color="average" 
              result="63.82%" 
              label="Shuttle Run" 
              change="no change" 
            />

            <PortfolioCircleStat 
              progress={0.23} 
              color="bad" 
              result="16.23m" 
              label="3/4 Sprint" 
              change="-4.89%" 
              changeType="bad" 
            />

            <PortfolioCircleStat 
              progress={0.7} 
              color="good" 
              result="12:12" 
              label="Beep Test" 
              change="+0:4" 
              changeType="good" 
            />
          </ContentCell>
        </Column>

        <Column width="360px">
          <ContentCell title="Speed Test Summary" style={{ margin: "30px" }}>
            <PortfolioLineStat color="good" progress={0.96} label="35m Sprint" value="7.24" change="(Good)" />
            <PortfolioLineStat color="average" progress={0.67} label="50m Sprint" value="11.11" change="(Average)" />
            <PortfolioLineStat color="bad" progress={0.21} label="65m Sprint" value="15.29" change="(Bad)" />
          </ContentCell>
        </Column>

      </div>
    )
	}

}
