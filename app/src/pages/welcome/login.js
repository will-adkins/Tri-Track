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
import { AccountCircle, VpnKey } from '@material-ui/icons'

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

const Login = props => {
  const { classes, history } = props
  return (
    <div>
      <MenuAppBar welcome back history={history} />
      <center>
        <div style={{ paddingTop: '10%' }}>
          <Typography variant="display2" color="secondary">
            Tri-Track
          </Typography>
        </div>
        <img alt="Tri-Track icon" src="/static/tri-symbol-1.jpg" width="50%" />

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
            <Button variant="extendedFab" color="primary" type="submit">
              Sign In
            </Button>
            <Link to="/" className="router-link">
              <Button variant="flat" type="button">
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </center>
    </div>
  )
}

export default withStyles(styles)(Login)
