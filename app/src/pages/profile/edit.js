import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Paper, TextField, Button, withStyles } from '@material-ui/core'
import {
  AccountCircle,
  VpnKey,
  Info,
  FitnessCenter,
  AccessibilityNew
} from '@material-ui/icons'
import { isEmpty, not } from 'ramda'

import {
  EDIT_PROFILE_FORM_TOGGLED,
  EDIT_PROFILE_ERROR_CLEAR,
  EDIT_PROFILE_FORM_CLEAR,
  EDIT_PROFILE_SAVE_FAILED,
  EDIT_PROFILE_FORM_UPDATED
} from '../../constants'
import { updateProfile, setEditProfile } from '../../action-creators/profiles'
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

class ProfileEdit extends React.Component {
  componentDidMount() {
    const { load, loadProfile, isDetailsForm, toggleForm } = this.props

    load(loadProfile)
    if (isDetailsForm) toggleForm()
  }

  render() {
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
      errMsg,
      isValid
    } = this.props
    const {
      email,
      password,
      firstName,
      lastName,
      weightLbs,
      ft,
      inches
    } = this.props.profile

    const ProfileForm = (
      <center>
        <form style={{ paddingTop: '10%' }}>
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
              <Link to="/home" className="router-link">
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

            <Paper className={classes.lowerRow} style={{ width: 222.22 }}>
              <div
                style={{
                  alignSelf: 'center',
                  display: 'flex',
                  flexDirection: 'row'
                }}
              >
                <AccessibilityNew color="secondary" />
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-evenly',
                  width: '90%'
                }}
              >
                <TextField
                  id="ft"
                  label="Height"
                  value={ft}
                  onChange={e => onChange('ft', Number(e.target.value))}
                  style={{ width: 28 }}
                  inputProps={{ maxLength: 2, min: 0 }}
                  helperText="Ft"
                  autoComplete="off"
                />

                <TextField
                  id="in"
                  label=" "
                  value={inches}
                  onChange={e => onChange('inches', Number(e.target.value))}
                  style={{ width: 28 }}
                  inputProps={{ maxLength: 2, min: 0, max: 11 }}
                  helperText="In"
                  autoComplete="off"
                />
              </div>
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
          <MenuAppBar back history={history} title="Edit Your Profile" />
          <CenterLogo />
          {isError && <SnackBar type="error" msg={errMsg} close={clearError} />}
          {isSaving && <SnackBar type="info" msg="Saving Profile..." />}
        </div>
        {!isDetailsForm ? ProfileForm : DetailsForm}
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  isDetailsForm: state.editProfile.isDetailsForm,
  isSaving: state.editProfile.isSaving,
  isError: state.editProfile.isError,
  errMsg: state.editProfile.errMsg,
  profile: state.editProfile.data,
  loadProfile: state.currentProfile.data,
  isValid:
    not(isEmpty(state.editProfile.data.email)) &&
    not(isEmpty(state.editProfile.data.password))
})

const mapActionsToProps = dispatch => ({
  load: profile => dispatch(setEditProfile(profile)),
  toggleForm: () => dispatch({ type: EDIT_PROFILE_FORM_TOGGLED }),
  clearError: () => dispatch({ type: EDIT_PROFILE_ERROR_CLEAR }),
  clearForm: () => dispatch({ type: EDIT_PROFILE_FORM_CLEAR }),
  onChange: (field, value) => {
    if (Number.isNaN(value)) {
      dispatch({
        type: EDIT_PROFILE_SAVE_FAILED,
        payload: `Only numbers are valid entries in the ${field} field.`
      })
      return
    }
    dispatch({ type: EDIT_PROFILE_FORM_UPDATED, payload: { [field]: value } })
  },
  onSubmit: history => e => {
    e.preventDefault()
    dispatch(updateProfile(history))
  }
})

const connector = connect(
  mapStateToProps,
  mapActionsToProps
)
export default connector(withStyles(styles)(ProfileEdit))
