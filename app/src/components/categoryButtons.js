import React from 'react'
import { withStyles, IconButton, Typography, Tooltip } from '@material-ui/core'

import { DirectionsRun, Pool, DirectionsBike } from '@material-ui/icons'
import { propEq, prop, isNil } from 'ramda'

const styles = theme => ({
  selected: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main
  },
  unselected: {
    margin: theme.spacing.unit
  }
})

const CategoryButtons = props => {
  const { classes, onClick, onNullClick, value, highOrderType } = props

  const keyToUpdate = isNil(highOrderType) ? value : prop(value, highOrderType)

  return (
    <React.Fragment>
      <Tooltip title="Select a Category">
        <div>
          <IconButton
            onClick={
              propEq('category', 'Swim', keyToUpdate)
                ? onNullClick('category')
                : onClick('category', 'Swim')
            }
            className={
              propEq('category', 'Swim', keyToUpdate)
                ? classes.selected
                : classes.unselected
            }
          >
            <Pool />
          </IconButton>
          <IconButton
            onClick={
              propEq('category', 'Bike', keyToUpdate)
                ? onNullClick('category')
                : onClick('category', 'Bike')
            }
            className={
              propEq('category', 'Bike', keyToUpdate)
                ? classes.selected
                : classes.unselected
            }
          >
            <DirectionsBike />
          </IconButton>
          <IconButton
            onClick={
              propEq('category', 'Run', keyToUpdate)
                ? onNullClick('category')
                : onClick('category', 'Run')
            }
            className={
              propEq('category', 'Run', keyToUpdate)
                ? classes.selected
                : classes.unselected
            }
          >
            <DirectionsRun />
          </IconButton>
        </div>
      </Tooltip>
    </React.Fragment>
  )
}

export default withStyles(styles)(CategoryButtons)
