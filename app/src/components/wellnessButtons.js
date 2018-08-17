import React from 'react'
import { withStyles, IconButton, Typography } from '@material-ui/core'

import { propEq, prop, isNil } from 'ramda'

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  selected: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main
  },
  unselected: {
    margin: theme.spacing.unit
  }
})

const WellnessButtons = props => {
  const { classes, onClick, onNullClick, value, highOrderType } = props
  const keyToUpdate = isNil(highOrderType) ? value : prop(value, highOrderType)
  return (
    <React.Fragment>
      <Typography variant="caption">Wellness: </Typography>
      <IconButton
        onClick={
          propEq('wellness', 1, keyToUpdate)
            ? onNullClick('wellness')
            : onClick('wellness', 1)
        }
        className={
          propEq('wellness', 1, keyToUpdate)
            ? classes.selected
            : classes.unselected
        }
      >
        <img src="/static/sick.png" alt="Sick Icon" />
      </IconButton>
      <IconButton
        onClick={
          propEq('wellness', 2, keyToUpdate)
            ? onNullClick('wellness')
            : onClick('wellness', 2)
        }
        className={
          propEq('wellness', 2, keyToUpdate)
            ? classes.selected
            : classes.unselected
        }
      >
        <img src="/static/fever.png" alt="Fever Icon" />
      </IconButton>
      <IconButton
        onClick={
          propEq('wellness', 3, keyToUpdate)
            ? onNullClick('wellness')
            : onClick('wellness', 3)
        }
        className={
          propEq('wellness', 3, keyToUpdate)
            ? classes.selected
            : classes.unselected
        }
      >
        <img src="/static/well.png" alt="Well Icon" />
      </IconButton>
    </React.Fragment>
  )
}

export default withStyles(styles)(WellnessButtons)
