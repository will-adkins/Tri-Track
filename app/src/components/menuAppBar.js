import React from 'react'
import { connect } from 'react-redux'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { Icon, withStyles } from '@material-ui/core'
import {
  DirectionsBike,
  DirectionsRun,
  Pool,
  ChevronLeft,
  Menu,
  FilterList,
  MoreVert
} from '@material-ui/icons'
import { DRAWER_TOGGLED } from '../constants'

const styles = {
  icon: { marginRight: 24 },
  menu: { marginLeft: -12 },
  button: { marginLeft: '18%' }
}

const MenuAppBar = props => {
  const {
    classes,
    back,
    history,
    welcome,
    highLevel,
    toggleDrawer,
    listOptions
  } = props

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

  if (welcome) {
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

  if (highLevel) {
    return (
      <div>
        <AppBar position="static" style={{ display: 'flex' }}>
          <Toolbar>
            <div style={{ flexGrow: 5 }}>
              <Button className={classes.menu} onClick={toggleDrawer}>
                <Menu style={{ color: 'white' }} className="svg_icon" />
              </Button>
            </div>
            {listOptions && (
              <div style={{ flexGrow: 1, justifyContent: 'space-around' }}>
                <Button
                  variant="fab"
                  mini
                  color="secondary"
                  className={classes.button}
                >
                  <FilterList style={{ color: 'white' }} />
                </Button>
                <Button
                  variant="fab"
                  mini
                  color="secondary"
                  className={classes.button}
                >
                  <MoreVert style={{ color: 'white' }} />
                </Button>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}
const mapStateToProps = () => ({})
const mapActionsToProps = dispatch => ({
  toggleDrawer: () => dispatch({ type: DRAWER_TOGGLED })
})

const connector = connect(
  mapStateToProps,
  mapActionsToProps
)

export default connector(withStyles(styles)(MenuAppBar))
