import React from 'react'
import { withStyles } from '@material-ui/core'
import { DirectionsBike, DirectionsRun, Pool } from '@material-ui/icons'
const styles = theme => ({
  largeSwim: { color: theme.palette.secondary.main, transform: `scale(${5})` },
  largeRun: { color: theme.palette.secondary.main, transform: `scale(${5})` },
  largeBike: { color: theme.palette.secondary.main, transform: `scale(${5})` },
  swim: { color: theme.palette.secondary.main },
  run: { color: theme.palette.secondary.main },
  bike: { color: theme.palette.secondary.main }
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
