import React from 'react'
import { withStyles } from '@material-ui/core'
import { DirectionsBike, DirectionsRun, Pool } from '@material-ui/icons'
const styles = theme => ({
  largeSwim: { color: theme.palette.swim.main, transform: `scale(${5})` },
  largeRun: { color: theme.palette.run.main, transform: `scale(${5})` },
  largeBike: { color: theme.palette.bike.main, transform: `scale(${5})` },
  swim: { color: theme.palette.swim.main },
  run: { color: theme.palette.run.main },
  bike: { color: theme.palette.bike.main }
})
const WorkoutIcons = props => {
  const { classes, category, large } = props
  return (
    <React.Fragment>
      {category === 'Swim' ? (
        <Pool className={large ? classes.largeSwim : classes.swim} />
      ) : category === 'Bike' ? (
        <DirectionsBike
          color="secondary"
          className={large ? classes.largeBike : classes.bike}
        />
      ) : category === 'Run' ? (
        <DirectionsRun className={large ? classes.largeRun : classes.run} />
      ) : null}
    </React.Fragment>
  )
}

export default withStyles(styles)(WorkoutIcons)
