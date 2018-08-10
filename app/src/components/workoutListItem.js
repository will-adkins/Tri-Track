import React from 'react'
import {
  Card,
  ListItem,
  Avatar,
  Typography,
  ListItemIcon,
  ListItemText
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import { propOr } from 'ramda'

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
      <Link to="/home" className="router-link">
        <ListItem button>
          <ListItemIcon>
            <Avatar aria-label={category}>
              <WorkoutIcon color="primary" category={category} />
            </Avatar>
          </ListItemIcon>
          <ListItemText>
            <Typography variant="title">
              {dateDisplayParser(dateTime)}
            </Typography>
            <Typography variant="subheading">
              {`Distance ${distanceMi}mi | Duration ${secToMin(
                durationSec
              )} | Pace ${secToMin(paceSecPerMi)}`}
            </Typography>
          </ListItemText>
        </ListItem>
      </Link>
    </Card>
  )
}

export default WorkoutListItem
