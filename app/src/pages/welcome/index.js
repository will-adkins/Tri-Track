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
import { connect } from 'react-redux'

import { cacheLoginCheck } from '../../action-creators/profiles'

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

class Welcome extends React.Component {
  componentDidMount() {
    const { history, cacheCheck } = this.props
    cacheCheck(history)
  }

  render() {
    const { classes, history } = this.props

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
}

const mapStateToProps = state => ({
  profile: state.currentProfile
})

const mapActionsToProps = dispatch => ({
  cacheCheck: history => dispatch(cacheLoginCheck(history))
})

const connector = connect(
  mapStateToProps,
  mapActionsToProps
)

export default connector(withStyles(styles)(Welcome))
