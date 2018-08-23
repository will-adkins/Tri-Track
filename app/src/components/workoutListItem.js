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
  const { recentOnly } = data
  const {
    _id,
    category,
    distanceMi,
    durationSec,
    dateTime,
    paceSecPerMi
  } = propOr(data, 'workout', data)

  return (
    <Link to={`/workouts/${_id}`} className="router-link" key={_id}>
      <Card
        style={
          recentOnly ? { margin: 16 } : { display: 'flex', marginBottom: 5 }
        }
      >
        <ListItem button>
          <ListItemIcon>
            <Avatar
              aria-label={category}
              style={{ backgroundColor: '#802BB1' }}
            >
              <WorkoutIcon color="primary" category={category} />
            </Avatar>
          </ListItemIcon>
          <ListItemText>
            <Typography
              variant="subheading"
              style={{ textDecoration: 'underline' }}
            >
              {dateDisplayParser(dateTime)}
            </Typography>
            <Typography variant="caption">
              {`Distance ${distanceMi}mi | Duration ${secToMin(
                durationSec
              )} | Pace ${secToMin(paceSecPerMi)}`}
            </Typography>
          </ListItemText>
        </ListItem>
      </Card>
    </Link>
  )
}

export default WorkoutListItem
