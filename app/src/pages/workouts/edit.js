import React from 'react'
import { connect } from 'react-redux'
import { CircularProgress, withStyles } from '@material-ui/core'
import { isEmpty } from 'ramda'

import MenuAppBar from '../../components/menuAppBar'
import CenterLogo from '../../components/centerLogo'
import SnackBar from '../../components/customSnackBar'
import WorkoutForm from '../../components/workoutForm'

import {
  updateWorkout,
  editWorkoutFormUpdate,
  setEditWorkout
} from '../../action-creators/workouts'
import {
  EDIT_WORKOUT_LOADED,
  EDIT_WORKOUT_FORM_TOGGLE,
  EDIT_WORKOUT_ERROR_CLEAR,
  EDIT_WORKOUT_SAVE_FAILED,
  CALENDAR_RESET
} from '../../constants'

const styles = theme => ({
  card: {
    paddingTop: '10%'
  },
  actions: { justifyContent: 'flex-end' }
})

class WorkoutEdit extends React.Component {
  componentDidMount() {
    const { setWorkout, load, calendarReset } = this.props
    calendarReset()
    setWorkout(load)
  }

  render() {
    const {
      match,
      history,
      workout,
      onChange,
      onSubmit,
      toggleForm,
      isFirstForm,
      errorClear,
      isSaving,
      isError,
      errMsg,
      isValid
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
        <CenterLogo className="underlay" />

        <WorkoutForm
          id={match.params.id}
          onChange={onChange}
          onSubmit={onSubmit(match.params.id, history)}
          toggleForm={toggleForm}
          formClear={() => null}
          workout={workout}
          isFirstForm={isFirstForm}
          className="overlay"
        />

        {isError && <SnackBar type="error" msg={errMsg} close={errorClear} />}
        {isSaving && <SnackBar type="info" msg="Updating your workout..." />}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  load: state.currentWorkout.data,
  workout: state.editWorkout.data,
  isFirstForm: state.editWorkout.isFirstForm,
  isSaving: state.editWorkout.isSaving,
  isError: state.editWorkout.isError,
  errMsg: state.editWorkout.errMsg
})

const mapActionsToProps = dispatch => ({
  setWorkout: workout => dispatch(setEditWorkout(workout)),
  onChange: (field, value) => {
    if (Number.isNaN(value)) {
      dispatch({
        type: EDIT_WORKOUT_SAVE_FAILED,
        payload: `Only numbers are valid entries in the ${field} field.`
      })
      return
    }
    dispatch(editWorkoutFormUpdate(field, value))
  },
  onSubmit: (id, history) => e => {
    e.preventDefault()
    dispatch(updateWorkout(id, history))
  },
  toggleForm: e => dispatch({ type: EDIT_WORKOUT_FORM_TOGGLE }),
  errorClear: () => dispatch({ type: EDIT_WORKOUT_ERROR_CLEAR }),
  calendarReset: () => dispatch({ type: CALENDAR_RESET })
})

const connector = connect(
  mapStateToProps,
  mapActionsToProps
)

export default connector(withStyles(styles)(WorkoutEdit))
