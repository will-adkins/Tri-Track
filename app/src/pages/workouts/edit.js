import React from 'react'
import { connect } from 'react-redux'
import {
  CardActions,
  Card,
  Button,
  CircularProgress,
  withStyles
} from '@material-ui/core'

import MenuAppBar from '../../components/menuAppBar'
import CenterLogo from '../../components/centerLogo'
import SnackBar from '../../components/customSnackBar'
import WorkoutForm from '../../components/workoutForm'
import { updateWorkout } from '../../action-creators/workouts'
import { EDIT_WORKOUT_FORM_UPDATED, EDIT_WORKOUT_LOADED } from '../../constants'

const styles = theme => ({
  card: {
    paddingTop: '10%'
  },
  actions: { justifyContent: 'flex-end' }
})

class EditWorkout extends React.Component {
  componentDidMount() {
    const { setWorkout, load } = this.props
    setWorkout(load)
  }

  render() {
    const {
      classes,
      match,
      workout,
      onChange,
      onSubmit,
      isError,
      errMsg
    } = this.props

    if (workout._id !== match.params.id) {
      return (
        <center>
          <MenuAppBar back title="Edit Workout" />
          <CenterLogo title="Loading Your Workout..." />
          {!isError && <CircularProgress />}
          {isError && <SnackBar type="error" msg={errMsg} />}
        </center>
      )
    }

    return (
      <div>
        <MenuAppBar back title="Edit Workout" />
        <CenterLogo />
        <Card>
          <WorkoutForm
            onChange={onChange}
            onSubmit={onSubmit}
            workout={workout}
          />
          <CardActions className={classes.actions} style={{ paddingTop: 16 }}>
            <Button variant="extendedFab" color="primary">
              Submit
            </Button>
            <Button>Cancel</Button>
          </CardActions>
        </Card>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  load: state.currentWorkout.data,
  workout: state.editWorkout.data,
  isSaving: state.editWorkout.isSaving,
  isError: state.currentWorkout.isError,
  errMsg: state.currentWorkout.errMsg
})

const mapActionsToProps = dispatch => ({
  setWorkout: workout =>
    dispatch({ type: EDIT_WORKOUT_LOADED, payload: workout }),
  onChange: (field, value) =>
    dispatch({ type: EDIT_WORKOUT_FORM_UPDATED, payload: { [field]: value } }),
  onSubmit: (id, history) => dispatch(updateWorkout(id, history))
})

const connector = connect(
  mapStateToProps,
  mapActionsToProps
)

export default connector(withStyles(styles)(EditWorkout))
