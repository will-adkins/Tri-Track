import React from 'react'
import { connect } from 'react-redux'
import {
  CircularProgress,
  withStyles,
  ListItem,
  FormControl,
  InputLabel,
  InputAdornment,
  Input,
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Button
} from '@material-ui/core'
import {
  Edit,
  Delete,
  CalendarToday,
  Terrain,
  AccessTime,
  Timer,
  Whatshot,
  Waves
} from '@material-ui/icons'
import { map } from 'ramda'

import { setCurrentWorkout } from '../../action-creators/workouts'
import MotivationWellnessIcon from '../../components/motivationWellnessIcon'
import dateDisplayParser from '../../lib/dateDisplayParser'
import secToMin from '../../lib/secToMin'

import MenuAppBar from '../../components/menuAppBar'
import CenterLogo from '../../components/centerLogo'
import SnackBar from '../../components/customSnackBar'
import WorkoutIcon from '../../components/workoutIcon'

const styles = theme => ({
  card: {
    paddingTop: '10%'
  },
  workout: {
    paddingTop: '10%'
  },
  row: {
    display: 'flex',
    justifyContent: 'space-evenly'
  }
})

class ViewWorkout extends React.Component {
  componentDidMount() {
    const { setWorkout, match } = this.props
    setWorkout(match.params.id)
  }

  render() {
    const { classes, match, isError, errMsg } = this.props
    const {
      _id,
      category,
      dateTime,
      distanceMi,
      durationSec,
      paceSecPerMi,
      calories,
      motivation,
      wellness,
      stroke
    } = this.props.workout

    const DateStroke = () =>
      stroke ? (
        <React.Fragment>
          <ListItem>
            <FormControl className={classes.margin}>
              <InputLabel>Date</InputLabel>
              <Input
                id="input-with-icon-adornment"
                value={dateDisplayParser(dateTime)}
                startAdornment={
                  <InputAdornment position="start">
                    <CalendarToday />
                  </InputAdornment>
                }
              />
            </FormControl>
          </ListItem>
          <ListItem>
            <FormControl className={classes.margin}>
              <InputLabel>Stroke</InputLabel>
              <Input
                id="input-with-icon-adornment"
                value={stroke}
                startAdornment={
                  <InputAdornment position="start">
                    <Waves />
                  </InputAdornment>
                }
              />
            </FormControl>
          </ListItem>
        </React.Fragment>
      ) : (
        <center style={{ paddingBottom: '5%' }}>
          <FormControl className={classes.margin}>
            <InputLabel>Date</InputLabel>
            <Input
              id="input-with-icon-adornment"
              value={dateDisplayParser(dateTime)}
              startAdornment={
                <InputAdornment position="start">
                  <CalendarToday />
                </InputAdornment>
              }
            />
          </FormControl>
        </center>
      )

    if (_id !== match.params.id) {
      return (
        <center>
          <MenuAppBar back title="View Workout" />
          <CenterLogo title="Loading Your Workout..." />
          {!isError && <CircularProgress />}
          {isError && <SnackBar type="error" msg={errMsg} />}
        </center>
      )
    }

    return (
      <div>
        <MenuAppBar back />
        <center>
          <div>
            <Card className={classes.card}>
              <CardContent>
                <WorkoutIcon category={category} large />
              </CardContent>
              <CardContent className={classes.workout}>
                <div className={classes.row}>{<DateStroke />}</div>
                <div className={classes.row}>
                  <ListItem>
                    <FormControl className={classes.margin}>
                      <InputLabel>Distance</InputLabel>
                      <Input
                        id="input-with-icon-adornment"
                        value={`${distanceMi} miles`}
                        startAdornment={
                          <InputAdornment position="start">
                            <Terrain />
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  </ListItem>
                  <ListItem>
                    <FormControl className={classes.margin}>
                      <InputLabel>Duration</InputLabel>
                      <Input
                        id="input-with-icon-adornment"
                        value={secToMin(durationSec)}
                        startAdornment={
                          <InputAdornment position="start">
                            <AccessTime />
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  </ListItem>
                </div>
                <div className={classes.row}>
                  <ListItem>
                    <FormControl className={classes.margin}>
                      <InputLabel>Pace</InputLabel>
                      <Input
                        id="input-with-icon-adornment"
                        value={`${secToMin(paceSecPerMi)}  min / mile`}
                        startAdornment={
                          <InputAdornment position="start">
                            <Timer />
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  </ListItem>

                  <ListItem>
                    <FormControl className={classes.margin}>
                      <InputLabel>Calories</InputLabel>
                      <Input
                        id="input-with-icon-adornment"
                        value={calories}
                        startAdornment={
                          <InputAdornment position="start">
                            <Whatshot />
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  </ListItem>
                </div>
                <div className={classes.row}>
                  <ListItem>
                    <FormControl className={classes.margin}>
                      <InputLabel>Motivation</InputLabel>
                      <Input
                        id="input-with-icon-adornment"
                        value={`${motivation}`}
                        startAdornment={
                          <InputAdornment position="start">
                            <MotivationWellnessIcon
                              type="motivation"
                              value={motivation}
                            />
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  </ListItem>
                  <ListItem>
                    <FormControl className={classes.margin}>
                      <InputLabel>Wellness</InputLabel>
                      <Input
                        id="input-with-icon-adornment"
                        value={`${wellness}`}
                        startAdornment={
                          <InputAdornment position="start">
                            <MotivationWellnessIcon
                              type="wellness"
                              value={wellness}
                            />
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  </ListItem>
                </div>
              </CardContent>
              <CardActions style={{ justifyContent: 'flex-end' }}>
                <Button variant="fab" size="small" color="primary">
                  <Edit color="inherit" />
                </Button>
                <IconButton color="primary">
                  <Delete />
                </IconButton>
              </CardActions>
            </Card>
          </div>
        </center>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  workout: state.currentWorkout.data,
  isError: state.currentWorkout.isError,
  errMsg: state.currentWorkout.errMsg
})

const mapActionsToProps = dispatch => ({
  setWorkout: id => dispatch(setCurrentWorkout(id))
})

const connector = connect(
  mapStateToProps,
  mapActionsToProps
)

export default connector(withStyles(styles)(ViewWorkout))
