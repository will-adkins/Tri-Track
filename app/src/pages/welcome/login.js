import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { TextField, Grid, Button, withStyles } from '@material-ui/core'
import { AccountCircle, VpnKey } from '@material-ui/icons'

import {
  CURRENT_PROFILE_FORM_UPDATE,
  CURRENT_PROFILE_FORM_CLEAR,
  CURRENT_PROFILE_ERROR_CLEAR
} from '../../constants'
import { checkLogin } from '../../action-creators/profiles'
import CenterLogo from '../../components/centerLogo'
import MenuAppBar from '../../components/menuAppBar'
import SnackBar from '../../components/customSnackBar'

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

const Login = props => {
  const {
    classes,
    history,
    onChange,
    checkLogin,
    clearForm,
    clearError,
    isAuthenticating,
    isError,
    errMsg
  } = props
  const { email, password } = props.profile
  return (
    <div>
      <MenuAppBar welcome back history={history} />
      <CenterLogo title="Tri-Track" />
      <center>
        <form
          onSubmit={checkLogin(history)}
          style={{ marginLeft: '25%', paddingTop: '10%' }}
        >
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
                  autoComplete="off"
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
                  autoComplete="off"
                />
              </Grid>
            </Grid>
          </div>
          <div style={{ paddingTop: 12 }}>
            <Button variant="extendedFab" color="primary" type="submit">
              Sign In
            </Button>
            <Link to="/" className="router-link">
              <Button variant="flat" type="button" onClick={clearForm}>
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </center>
      {isAuthenticating && <SnackBar type="info" msg="Authenticating..." />}
      {isError && <SnackBar type="error" msg={errMsg} close={clearError} />}
    </div>
  )
}

const mapStateToProps = state => ({
  profile: state.currentProfile.data,
  isAuthenticating: state.currentProfile.isAuthenticating,
  isError: state.currentProfile.isError,
  errMsg: state.currentProfile.errMsg
})

const mapActionsToProps = dispatch => ({
  onChange: (field, value) =>
    dispatch({
      type: CURRENT_PROFILE_FORM_UPDATE,
      payload: { [field]: value }
    }),
  checkLogin: history => e => {
    e.preventDefault()
    dispatch(checkLogin(history))
  },
  clearForm: () => dispatch({ type: CURRENT_PROFILE_FORM_CLEAR }),
  clearError: () => dispatch({ type: CURRENT_PROFILE_ERROR_CLEAR })
})

const connector = connect(
  mapStateToProps,
  mapActionsToProps
)

export default connector(withStyles(styles)(Login))
