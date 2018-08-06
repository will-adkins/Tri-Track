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
    height: 45,
    paddingTop: '56%',
    paddingBottom: '30%'
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
      <Card className={classes.card}>
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
            >
              <Typography variant="headline" style={{ color: 'white' }}>
                Sign Up
              </Typography>
            </Button>
          </CardActions>
        </div>
      </Card>
    </div>
  )
}

export default withStyles(styles)(Welcome)
