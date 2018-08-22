import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { not, isEmpty } from 'ramda'
import { Paper, TextField, Button, withStyles } from '@material-ui/core'
import {
  AccountCircle,
  VpnKey,
  Info,
  FitnessCenter,
  AccessibilityNew
} from '@material-ui/icons'

import {
  NEW_PROFILE_FORM_TOGGLED,
  NEW_PROFILE_FORM_UPDATED,
  NEW_PROFILE_SAVE_FAILED,
  NEW_PROFILE_ERROR_CLEAR,
  NEW_PROFILE_FORM_CLEAR
} from '../../constants'
import { addProfile } from '../../action-creators/profiles'
import MenuAppBar from '../../components/menuAppBar'
import SnackBar from '../../components/customSnackBar'
import CenterLogo from '../../components/centerLogo'

const styles = theme => ({
  row: { display: 'flex', flexDirection: 'row', padding: '5%' },
  lowerRow: {
    display: 'flex',
    flexDirection: 'row',
    padding: '3%',
    margin: '3%'
  },
  icon: { alignSelf: 'flex-end', marginRight: 8 },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: '5%',
    marginBottom: '5%',
    width: '75%'
  }
})

const SignUp = props => {
  const {
    classes,
    history,
    isDetailsForm,
    toggleForm,
    onChange,
    onSubmit,
    clearError,
    clearForm,
    isSaving,
    isValid,
    isError,
    errMsg
  } = props
  const {
    email,
    password,
    firstName,
    lastName,
    heightIn,
    weightLbs
  } = props.profile

  const ProfileForm = (
    <center>
      <form>
        <div className={classes.center}>
          <Paper className={classes.lowerRow}>
            <div className={classes.icon}>
              <AccountCircle color="secondary" />
            </div>
            <TextField
              id="username"
              label="User Name"
              value={email}
              onChange={e => onChange('email', e.target.value)}
              className={classes.textfield}
              autoComplete="off"
              required
            />
          </Paper>
          {/* <Grid container spacing={8} alignItems="flex-end">
              <Grid item>
                <AccountCircle />
              </Grid>
              <Grid item>
                <TextField
                  id="username"
                  label="User Name"
                  value={email}
                  onChange={e => onChange('email', e.target.value)}
                  className={classes.textfield}
                  required
                />
              </Grid>
            </Grid> */}
          <Paper className={classes.lowerRow}>
            <div className={classes.icon}>
              <VpnKey color="secondary" />
            </div>
            <TextField
              id="password"
              label="Password"
              type="password"
              value={password}
              onChange={e => onChange('password', e.target.value)}
              className={classes.textfield}
              autoComplete="off"
              required
            />
          </Paper>

          <div className={classes.actions}>
            <Button
              variant="extendedFab"
              color="primary"
              type="button"
              onClick={e => toggleForm()}
              disabled={isValid ? false : true}
            >
              Next
            </Button>
            <Link to="/" className="router-link">
              <Button variant="flat" type="button" onClick={e => clearForm()}>
                Cancel
              </Button>
            </Link>
          </div>
        </div>
      </form>
    </center>
  )
  const DetailsForm = (
    <center>
      <form onSubmit={onSubmit(history)}>
        <div className={classes.center}>
          <Paper className={classes.lowerRow}>
            <div className={classes.icon}>
              <Info color="secondary" />
            </div>
            <TextField
              id="firstName"
              label="First Name"
              value={firstName}
              onChange={e => onChange('firstName', e.target.value)}
              className={classes.textfield}
              required
              autoComplete="off"
            />
          </Paper>
          <Paper className={classes.lowerRow}>
            <div className={classes.icon}>
              <Info color="secondary" />
            </div>
            <TextField
              id="lastName"
              label="Last Name"
              value={lastName}
              onChange={e => onChange('lastName', e.target.value)}
              className={classes.textfield}
              required
              autoComplete="off"
            />
          </Paper>
          <Paper className={classes.lowerRow}>
            <div className={classes.icon}>
              <AccessibilityNew color="secondary" />
            </div>
            <TextField
              id="heightIn"
              label="Height (In)"
              value={heightIn}
              onChange={e => onChange('heightIn', Number(e.target.value))}
              className={classes.textfield}
              required
              autoComplete="off"
            />
          </Paper>
          <Paper className={classes.lowerRow}>
            <div className={classes.icon}>
              <FitnessCenter color="secondary" />
            </div>
            <TextField
              id="weightLbs"
              label="Weight (Lbs)"
              value={weightLbs}
              onChange={e => onChange('weightLbs', Number(e.target.value))}
              className={classes.textfield}
              required
              autoComplete="off"
            />
          </Paper>

          <div className={classes.actions}>
            <Button variant="extendedFab" color="primary" type="submit">
              Submit
            </Button>
            <Button variant="flat" type="button" onClick={e => toggleForm()}>
              Go Back
            </Button>
          </div>
        </div>
      </form>
    </center>
  )
  return (
    <React.Fragment>
      <div>
        <MenuAppBar welcome back history={history} />
        <CenterLogo title="Tri-Track" />
        {isError && <SnackBar type="error" msg={errMsg} close={clearError} />}
        {isSaving && <SnackBar type="info" msg="Saving Profile..." />}
      </div>
      {!isDetailsForm ? ProfileForm : DetailsForm}
    </React.Fragment>
  )
}

const mapStateToProps = state => ({
  isDetailsForm: state.newProfile.isDetailsForm,
  isSaving: state.newProfile.isSaving,
  isError: state.newProfile.isError,
  errMsg: state.newProfile.errMsg,
  profile: state.newProfile.data,
  isValid:
    not(isEmpty(state.newProfile.data.email)) &&
    not(isEmpty(state.newProfile.data.password))
})

const mapActionsToProps = dispatch => ({
  toggleForm: () => dispatch({ type: NEW_PROFILE_FORM_TOGGLED }),
  clearError: () => dispatch({ type: NEW_PROFILE_ERROR_CLEAR }),
  clearForm: () => dispatch({ type: NEW_PROFILE_FORM_CLEAR }),
  onChange: (field, value) => {
    if (Number.isNaN(value)) {
      dispatch({
        type: NEW_PROFILE_SAVE_FAILED,
        payload: `Only numbers are valid entries in the ${field} field.`
      })
      return
    }
    dispatch({ type: NEW_PROFILE_FORM_UPDATED, payload: { [field]: value } })
  },
  onSubmit: history => e => {
    e.preventDefault()
    dispatch(addProfile(history))
  }
})

const connector = connect(
  mapStateToProps,
  mapActionsToProps
)
export default connector(withStyles(styles)(SignUp))
