import React from 'react'
import { connect } from 'react-redux'
import { Card, withStyles } from '@material-ui/core'

import MenuAppBar from '../../components/menuAppBar'
import CenterLogo from '../../components/centerLogo'
import SnackBar from '../../components/customSnackBar'
import WorkoutForm from '../../components/workoutForm'

import {
  NEW_WORKOUT_FORM_TOGGLE,
  NEW_WORKOUT_ERROR_CLEAR,
  NEW_WORKOUT_SAVE_FAILED
} from '../../constants'
import {
  addWorkout,
  newWorkoutFormUpdate
} from '../../action-creators/workouts'

const styles = theme => ({
  card: {
    paddingTop: '10%'
  },
  actions: { justifyContent: 'flex-end' }
})

const WorkoutNew = props => {
  const {
    history,
    workout,
    onChange,
    onSubmit,
    toggleForm,
    isFirstForm,
    errorClear,
    isSaving,
    isError,
    errMsg
  } = props
  return (
    <div>
      <MenuAppBar back title="Create Workout" />
      <CenterLogo />
      <Card>
        <WorkoutForm
          onChange={onChange}
          onSubmit={onSubmit(history)}
          toggleForm={toggleForm}
          workout={workout}
          isFirstForm={isFirstForm}
        />
      </Card>
      {isError && <SnackBar type="error" msg={errMsg} close={errorClear} />}
      {isSaving && <SnackBar type="info" msg="Saving your workout..." />}
    </div>
  )
}

const mapStateToProps = state => ({
  workout: state.newWorkout.data,
  isFirstForm: state.newWorkout.isFirstForm,
  isSaving: state.newWorkout.isSaving,
  isError: state.newWorkout.isError,
  errMsg: state.newWorkout.errMsg
})

const mapActionsToProps = dispatch => ({
  onChange: (field, value) => {
    if (Number.isNaN(value)) {
      dispatch({
        type: NEW_WORKOUT_SAVE_FAILED,
        payload: `Only numbers are valid entries in the ${field} field.`
      })
      return
    }
    dispatch(newWorkoutFormUpdate(field, value))
  },
  onSubmit: history => e => {
    e.preventDefault()
    dispatch(addWorkout(history))
  },
  toggleForm: e => dispatch({ type: NEW_WORKOUT_FORM_TOGGLE }),
  errorClear: () => dispatch({ type: NEW_WORKOUT_ERROR_CLEAR })
})

const connector = connect(
  mapStateToProps,
  mapActionsToProps
)

export default connector(withStyles(styles)(WorkoutNew))
