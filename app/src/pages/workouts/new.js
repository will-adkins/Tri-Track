import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core'

import MenuAppBar from '../../components/menuAppBar'
import CenterLogo from '../../components/centerLogo'
import SnackBar from '../../components/customSnackBar'
import WorkoutForm from '../../components/workoutForm'

import {
  NEW_WORKOUT_FORM_TOGGLE,
  NEW_WORKOUT_ERROR_CLEAR,
  NEW_WORKOUT_SAVE_FAILED,
  NEW_WORKOUT_FORM_CLEAR
} from '../../constants'
import {
  addWorkout,
  newWorkoutFormUpdate
} from '../../action-creators/workouts'

const styles = theme => ({
  card: {
    paddingTop: '10%'
  },
  actions: { justifyContent: 'flex-end' },
  form: { width: '50%' }
})

class WorkoutNew extends React.Component {
  componentDidMount() {
    const { errorClear } = this.props
    errorClear()
  }

  render() {
    const {
      classes,
      history,
      workout,
      onChange,
      onSubmit,
      toggleForm,
      formClear,
      isFirstForm,
      errorClear,
      isSaving,
      isError,
      errMsg
    } = this.props
    return (
      <div>
        <MenuAppBar back title="Add Workout" />
        <CenterLogo className="underlay" />
        <div className={classes.form}>
          <WorkoutForm
            onChange={onChange}
            onSubmit={onSubmit(history)}
            toggleForm={toggleForm}
            formClear={formClear}
            workout={workout}
            isFirstForm={isFirstForm}
          />
        </div>
        {isError && <SnackBar type="error" msg={errMsg} close={errorClear} />}
        {isSaving && <SnackBar type="info" msg="Saving your workout..." />}
      </div>
    )
  }
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
  errorClear: () => dispatch({ type: NEW_WORKOUT_ERROR_CLEAR }),
  formClear: () => dispatch({ type: NEW_WORKOUT_FORM_CLEAR })
})

const connector = connect(
  mapStateToProps,
  mapActionsToProps
)

export default connector(withStyles(styles)(WorkoutNew))
