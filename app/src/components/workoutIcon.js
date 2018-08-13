import React from 'react'
import { DirectionsBike, DirectionsRun, Pool } from '@material-ui/icons'

export default props => {
  const { category, large } = props
  return (
    <React.Fragment>
      {category === 'Swim' ? (
        <Pool
          color="secondary"
          className={large ? 'svg_workout_category' : null}
        />
      ) : category === 'Bike' ? (
        <DirectionsBike
          color="secondary"
          className={large ? 'svg_workout_category' : null}
        />
      ) : category === 'Run' ? (
        <DirectionsRun
          color="secondary"
          className={large ? 'svg_workout_category' : null}
        />
      ) : null}
    </React.Fragment>
  )
}
