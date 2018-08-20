import React from 'react'
import { withStyles, IconButton, Typography } from '@material-ui/core'

import { Mood, MoodBad, SentimentSatisfied } from '@material-ui/icons'
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

const MotivationButtons = props => {
  const { classes, onClick, onNullClick, value, highOrderType } = props
  const keyToUpdate = isNil(highOrderType) ? value : prop(value, highOrderType)
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center'
      }}
    >
      {/* <Typography variant="caption">Motivation: </Typography> */}

      <IconButton
        onClick={
          propEq('motivation', 1, keyToUpdate)
            ? onNullClick('motivation')
            : onClick('motivation', 1)
        }
        className={
          propEq('motivation', 1, keyToUpdate)
            ? classes.selected
            : classes.unselected
        }
      >
        <MoodBad />
      </IconButton>
      <IconButton
        onClick={
          propEq('motivation', 2, keyToUpdate)
            ? onNullClick('motivation')
            : onClick('motivation', 2)
        }
        className={
          propEq('motivation', 2, keyToUpdate)
            ? classes.selected
            : classes.unselected
        }
      >
        <SentimentSatisfied />
      </IconButton>
      <IconButton
        onClick={
          propEq('motivation', 3, keyToUpdate)
            ? onNullClick('motivation')
            : onClick('motivation', 3)
        }
        className={
          propEq('motivation', 3, keyToUpdate)
            ? classes.selected
            : classes.unselected
        }
      >
        <Mood />
      </IconButton>
    </div>
  )
}

export default withStyles(styles)(MotivationButtons)
