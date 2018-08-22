import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { TextField, Paper, Button, withStyles } from '@material-ui/core'
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
        <form onSubmit={checkLogin(history)} className={classes.center}>
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
          {/* <div className={classes.margin}>
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
          </div> */}
          <div className={classes.actions}>
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
