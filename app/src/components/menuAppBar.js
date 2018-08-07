import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { Icon, withStyles } from '@material-ui/core'
import {
  DirectionsBike,
  DirectionsRun,
  Pool,
  ChevronLeft
} from '@material-ui/icons'

const styles = {
  icon: { marginRight: 24 }
}

const MenuAppBar = props => {
  const { classes, back, history } = props

  /* {back && (
              <div>
                <Button onClick={e => history.goBack()}>
                  <ChevronLeft
                    style={{
                      color: 'white',
                      display: 'flex',
                      justifyContent: 'left'
                    }}
                  />*/

  if (props.welcome) {
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <div style={{ display: 'flex', margin: 'auto' }}>
              <Icon color="inherit" aria-label="biker" className={classes.icon}>
                <DirectionsBike />
              </Icon>
              <Icon
                color="inherit"
                aria-label="runner"
                className={classes.icon}
              >
                <DirectionsRun />
              </Icon>
              <Icon
                color="inherit"
                aria-label="swimmer"
                className={classes.icon}
              >
                <Pool />
              </Icon>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default withStyles(styles)(MenuAppBar)
