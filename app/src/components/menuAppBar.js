import React from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import {
  AppBar,
  Toolbar,
  Button,
  Icon,
  withStyles,
  IconButton,
  Typography
} from '@material-ui/core'
import {
  DirectionsBike,
  DirectionsRun,
  Pool,
  Menu,
  FilterList,
  ChevronLeft
} from '@material-ui/icons'
import {
  DRAWER_TOGGLED,
  FILTER_BAR_TOGGLED,
  SORT_DRAWER_TOGGLED
} from '../constants'

import SortMenu from '../components/sortMenu'

const styles = {
  icon: { marginRight: 24 },
  menu: { marginLeft: -12 },
  button: { marginLeft: '18%' },
  flex: { justifyContent: 'center' }
}

const MenuAppBar = props => {
  const {
    classes,
    welcome,
    highLevel,
    back,
    title,
    history,
    toggleDrawer,
    toggleFilterBar,
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
        <AppBar
          position="static"
          style={{ display: 'flex' }}
          className="overlay"
        >
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
                  onClick={toggleFilterBar}
                >
                  <FilterList style={{ color: 'white' }} />
                </Button>
                <SortMenu className="overlay" />
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    )
  }

  if (back) {
    return (
      <AppBar position="static">
        <Toolbar>
          <div style={{ display: 'flex' }}>
            <IconButton onClick={e => history.goBack()}>
              <ChevronLeft style={{ color: 'white' }} className="svg_icon" />
            </IconButton>
            <Typography
              variant="headline"
              style={{ color: 'white', marginTop: 8, marginLeft: 8 }}
              className={classes.flex}
            >
              {title}
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
    )
  }
}
const mapStateToProps = () => ({})
const mapActionsToProps = dispatch => ({
  toggleDrawer: () => dispatch({ type: DRAWER_TOGGLED }),
  toggleFilterBar: () => dispatch({ type: FILTER_BAR_TOGGLED }),
  toggleSortDrawer: () => dispatch({ type: SORT_DRAWER_TOGGLED })
})

const connector = connect(
  mapStateToProps,
  mapActionsToProps
)

export default connector(withRouter(withStyles(styles)(MenuAppBar)))
