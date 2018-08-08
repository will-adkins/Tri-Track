import React from 'react'
import {
  Typography,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  withStyles
} from '@material-ui/core'
import { isEmpty } from 'ramda'

import MenuAppBar from '../../components/menuAppBar'

const styles = theme => ({
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    height: '100%'
  },
  media: {
    width: '80%',
    paddingTop: '50%',
    paddingBottom: '35%'
  },
  actions: {
    display: 'flex',
    justifyContent: 'center'
  },
  button: {
    margin: 16
  }
})

const Welcome = props => {
  const { classes, history } = props

  return (
    <div>
      <MenuAppBar welcome />
      <center>
        <CardContent>
          <div className={classes.title}>
            <Typography variant="headline" color="primary">
              Welcome To
            </Typography>
          </div>
          <div className={classes.title}>
            <Typography variant="display3" color="secondary">
              Tri-Track
            </Typography>
          </div>
        </CardContent>

        <CardMedia
          image="/static/tri-symbol-1.jpg"
          title="Tri-Track icon"
          className={classes.media}
        />
        <div className={classes.actions}>
          <CardActions>
            <Button
              variant="extendedFab"
              color="primary"
              className={classes.button}
              size="large"
              onClick={e => history.push('/login')}
            >
              <Typography variant="headline" style={{ color: 'white' }}>
                Sign In
              </Typography>
            </Button>
            <Button
              variant="extendedFab"
              color="primary"
              className={classes.button}
              size="large"
              onClick={e => history.push('/sign-up')}
            >
              <Typography variant="headline" style={{ color: 'white' }}>
                Sign Up
              </Typography>
            </Button>
          </CardActions>
        </div>
      </center>
    </div>
  )
}

export default withStyles(styles)(Welcome)
