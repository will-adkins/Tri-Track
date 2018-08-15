import React from 'react'
import { connect } from 'react-redux'
import { Card, CircularProgress, withStyles } from '@material-ui/core'

import MenuAppBar from '../../components/menuAppBar'
import CenterLogo from '../../components/centerLogo'
import SnackBar from '../../components/customSnackBar'
import WorkoutForm from '../../components/workoutForm'

import {
  updateWorkout,
  editWorkoutFormUpdate
} from '../../action-creators/workouts'
import {
  EDIT_WORKOUT_LOADED,
  EDIT_WORKOUT_FORM_TOGGLE,
  EDIT_WORKOUT_ERROR_CLEAR,
  EDIT_WORKOUT_SAVE_FAILED
} from '../../constants'

const styles = theme => ({
  card: {
    paddingTop: '10%'
  },
  actions: { justifyContent: 'flex-end' }
})

class WorkoutEdit extends React.Component {
  componentDidMount() {
    const { setWorkout, load } = this.props
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
            id={match.params.id}
            onChange={onChange}
            onSubmit={onSubmit(match.params.id, history)}
            toggleForm={toggleForm}
            workout={workout}
            isFirstForm={isFirstForm}
          />
        </Card>
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
  setWorkout: workout =>
    dispatch({ type: EDIT_WORKOUT_LOADED, payload: workout }),
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
  errorClear: () => dispatch({ type: EDIT_WORKOUT_ERROR_CLEAR })
})

const connector = connect(
  mapStateToProps,
  mapActionsToProps
)

export default connector(withStyles(styles)(WorkoutEdit))
