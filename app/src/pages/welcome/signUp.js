import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  Typography,
  TextField,
  Grid,
  InputAdornment,
  FormControl,
  Input,
  InputLabel,
  Button,
  withStyles
} from '@material-ui/core'
import {
  AccountCircle,
  VpnKey,
  Info,
  FitnessCenter,
  AccessibilityNew
} from '@material-ui/icons'

import { NEW_PROFILE_FORM_TOGGLED } from '../../constants'
import MenuAppBar from '../../components/menuAppBar'

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
  const { classes, history, isDetailsForm, toggleForm } = props

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
                value=""
                className={classes.textfield}
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
                value=""
                className={classes.textfield}
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
            Sign Up
          </Button>
          <Link to="/" className="router-link">
            <Button variant="flat" type="button">
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </center>
  )

  const DetailsForm = (
    <center>
      <form style={{ marginLeft: '25%' }}>
        <div className={classes.margin}>
          <Grid container spacing={8} alignItems="flex-end">
            <Grid item>
              <Info />
            </Grid>
            <Grid item>
              <TextField
                id="firstName"
                label="First Name"
                value=""
                className={classes.textfield}
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
                value=""
                className={classes.textfield}
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
                value=""
                className={classes.textfield}
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
                value=""
                className={classes.textfield}
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
        <center>
          <div style={{ paddingTop: '10%' }}>
            <Typography variant="display2" color="secondary">
              Tri-Track
            </Typography>
          </div>
          <img
            alt="Tri-Track icon"
            src="/static/tri-symbol-1.jpg"
            width="50%"
          />
        </center>
      </div>
      {!isDetailsForm ? ProfileForm : DetailsForm}
    </React.Fragment>
  )
}

const mapStateToProps = state => ({
  isDetailsForm: state.newProfile.isDetailsForm
})

const mapActionsToProps = dispatch => ({
  toggleForm: () => dispatch({ type: NEW_PROFILE_FORM_TOGGLED })
})

const connector = connect(
  mapStateToProps,
  mapActionsToProps
)
export default connector(withStyles(styles)(SignUp))
