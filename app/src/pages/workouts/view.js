import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  CircularProgress,
  withStyles,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Button
} from '@material-ui/core'
import { Edit, Delete } from '@material-ui/icons'

import { setCurrentWorkout } from '../../action-creators/workouts'

import MenuAppBar from '../../components/menuAppBar'
import CenterLogo from '../../components/centerLogo'
import SnackBar from '../../components/customSnackBar'
import WorkoutData from '../../components/workoutData'
import WorkoutIcon from '../../components/workoutIcon'

const styles = theme => ({
  card: {
    paddingTop: '10%'
  },
  actions: { justifyContent: 'flex-end' }
})

class ViewWorkout extends React.Component {
  componentDidMount() {
    const { setWorkout, match } = this.props
    setWorkout(match.params.id)
  }

  render() {
    const { classes, match, isError, errMsg, workout } = this.props
    const { _id, category } = this.props.workout

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
        <MenuAppBar back backURL="/workouts" title="View Workout" />
        <center>
          <div>
            <Card className={classes.card}>
              <CardContent>
                <WorkoutIcon category={category} large />
              </CardContent>
              <WorkoutData workout={workout} />
              <CardActions className={classes.actions}>
                <Link to={`/workouts/${_id}/edit`} className="router-link">
                  <Button variant="fab" size="small" color="primary">
                    <Edit color="inherit" />
                  </Button>
                </Link>
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
