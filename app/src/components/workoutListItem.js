import React from 'react'
import {
  Card,
  CardHeader,
  IconButton,
  Avatar,
  Typography
} from '@material-ui/core'
import { Visibility } from '@material-ui/icons'
import { not, isNil, propOr } from 'ramda'

import secToMin from '../lib/secToMin'
import dateDisplayParser from '../lib/dateDisplayParser'

import WorkoutIcon from '../components/workoutIcon'

const WorkoutListItem = data => {
  const { category, distanceMi, durationSec, dateTime, paceSecPerMi } = propOr(
    data,
    'workout',
    data
  )
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar aria-label={category}>
            <WorkoutIcon color="primary" category={category} />
          </Avatar>
        }
        action={
          <IconButton>
            <Visibility />
          </IconButton>
        }
        title={dateDisplayParser(dateTime)}
        subheader={`Distance ${distanceMi}mi | Duration ${secToMin(
          durationSec
        )} | Pace ${secToMin(paceSecPerMi)}
        `}
      />
    </Card>
  )
}

export default WorkoutListItem
