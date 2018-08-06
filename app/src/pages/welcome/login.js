import React from 'react'
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
import { VerifiedUser } from '@material-ui/icons'

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
    flexBasis: 200
  }
})

const Login = props => {
  const { classes, history } = props
  return (
    <div>
      <MenuAppBar welcome back history={history} />
      <center>
        <div style={{ paddingTop: 12 }}>
          <Typography variant="display1">Tri-Track</Typography>
        </div>
        <img alt="Tri-Track icon" src="/static/tri-symbol-1.jpg" width="50%" />
        <form>
          <div className={classes.margin}>
            <Grid container spacing={8} alignItems="flex-end">
              <Grid item>
                <VerifiedUser />
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
          <div style={{ paddingTop: 12 }}>
            <Button variant="raised" color="primary">
              Sign In
            </Button>
          </div>
        </form>
      </center>
    </div>
  )
}

export default withStyles(styles)(Login)
