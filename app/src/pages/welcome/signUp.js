import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { TextField, Grid, Button, withStyles } from '@material-ui/core'
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
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  margin: {
    margin: theme.spacing.unit
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3
  },
  textField: {
    width: '50%'
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
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
      <form style={{ marginLeft: '25%', paddingTop: '10%' }}>
        <div className={classes.margin}>
          <Grid container spacing={8} alignItems="flex-end">
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
          </Grid>
        </div>
        <div className={classes.margin}>
          <Grid container spacing={8} alignItems="flex-end">
            <Grid item>
              <VpnKey />
            </Grid>
            <Grid item>
              <TextField
                id="password"
                label="Password"
                type="password"
                value={password}
                onChange={e => onChange('password', e.target.value)}
                className={classes.textfield}
                required
              />
            </Grid>
          </Grid>
        </div>
        <div style={{ paddingTop: 12 }}>
          <Button
            variant="extendedFab"
            color="primary"
            type="button"
            onClick={e => toggleForm()}
          >
            Next
          </Button>
          <Link to="/" className="router-link">
            <Button variant="flat" type="button" onClick={e => clearForm()}>
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </center>
  )

  const DetailsForm = (
    <center>
      <form
        style={{ marginLeft: '25%', marginTop: '-5%' }}
        onSubmit={onSubmit(history)}
      >
        <div className={classes.margin}>
          <Grid container spacing={8} alignItems="flex-end">
            <Grid item>
              <Info />
            </Grid>
            <Grid item>
              <TextField
                id="firstName"
                label="First Name"
                value={firstName}
                onChange={e => onChange('firstName', e.target.value)}
                className={classes.textfield}
                required
              />
            </Grid>
          </Grid>
        </div>
        <div className={classes.margin}>
          <Grid container spacing={8} alignItems="flex-end">
            <Grid item>
              <Info />
            </Grid>
            <Grid item>
              <TextField
                id="lastName"
                label="Last Name"
                value={lastName}
                onChange={e => onChange('lastName', e.target.value)}
                className={classes.textfield}
                required
              />
            </Grid>
          </Grid>
        </div>
        <div className={classes.margin}>
          <Grid container spacing={8} alignItems="flex-end">
            <Grid item>
              <AccessibilityNew />
            </Grid>
            <Grid item>
              <TextField
                id="heightIn"
                label="Height (In)"
                value={heightIn}
                onChange={e => onChange('heightIn', Number(e.target.value))}
                className={classes.textfield}
                required
              />
            </Grid>
          </Grid>
        </div>
        <div className={classes.margin}>
          <Grid container spacing={8} alignItems="flex-end">
            <Grid item>
              <FitnessCenter />
            </Grid>
            <Grid item>
              <TextField
                id="weightLbs"
                label="Weight (Lbs)"
                value={weightLbs}
                onChange={e => onChange('weightLbs', Number(e.target.value))}
                className={classes.textfield}
                required
              />
            </Grid>
          </Grid>
        </div>
        <div style={{ paddingTop: 12 }}>
          <Button variant="extendedFab" color="primary" type="submit">
            Sign Up
          </Button>
          <Button variant="flat" type="button" onClick={e => toggleForm()}>
            Go Back
          </Button>
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
  profile: state.newProfile.data
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
