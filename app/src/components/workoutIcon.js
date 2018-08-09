import React from 'react'
import { DirectionsBike, DirectionsRun, Pool } from '@material-ui/icons'

export default props => (
  <React.Fragment>
    {props.category === 'Swim' ? (
      <Pool color="secondary" />
    ) : props.category === 'Bike' ? (
      <DirectionsBike color="secondary" />
    ) : props.category === 'Run' ? (
      <DirectionsRun color="secondary" />
    ) : null}
  </React.Fragment>
)
