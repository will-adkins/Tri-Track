import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
  Typography,
  Divider,
  ListItemIcon,
  MenuList,
  MenuItem,
  Popper,
  Paper,
  Grow,
  ClickAwayListener,
  Button
} from '@material-ui/core'
import {
  Terrain,
  AccessTime,
  CalendarToday,
  Timer,
  Whatshot,
  Sort
} from '@material-ui/icons'
import { connect } from 'react-redux'

import { SORT_DRAWER_TOGGLED, SORT_OPTION_TOGGLED } from '../constants'

const styles = theme => ({
  root: {
    display: 'flex'
  },
  paper: {
    marginRight: theme.spacing.unit * 2,
    zIndex: theme.zIndex.tooltip
  },
  button: { marginLeft: '18%' }
})

class SortListComposition extends React.Component {
  render() {
    const { toggleSortDrawer, sortWorkouts, open } = this.props

    return (
      <React.Fragment>
        <Button
          variant="fab"
          mini
          color="secondary"
          onClick={e => toggleSortDrawer()}
          buttonRef={node => {
            this.anchorEl = node
          }}
        >
          <Sort color="primary" />
        </Button>
        <Popper
          open={open}
          anchorEl={this.anchorEl}
          transition
          disablePortal
          className="overlay"
          style={{ paddingTop: 6 }}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="menu-list-grow"
              style={{
                transformOrigin: placement === 'center bottom'
              }}
            >
              <ClickAwayListener onClickAway={e => toggleSortDrawer()}>
                <Paper
                  style={{
                    minWidth: '100%'
                  }}
                >
                  <MenuList>
                    <center style={{ margin: '5%' }}>
                      <Typography variant="title" color="secondary">
                        Sort Workouts
                      </Typography>
                    </center>
                    <hr style={{ borderColor: '#802BB1' }} />

                    <MenuItem
                      button
                      onClick={e => {
                        toggleSortDrawer()
                        sortWorkouts('distanceMi')
                      }}
                    >
                      <ListItemIcon>
                        <Terrain />
                      </ListItemIcon>
                      Distance
                    </MenuItem>
                    <MenuItem
                      button
                      onClick={e => {
                        toggleSortDrawer()
                        sortWorkouts('durationSec')
                      }}
                    >
                      <ListItemIcon>
                        <AccessTime />
                      </ListItemIcon>
                      Duration
                    </MenuItem>
                    <MenuItem
                      button
                      onClick={e => {
                        sortWorkouts('paceSecPerMi')
                        toggleSortDrawer()
                      }}
                    >
                      <ListItemIcon>
                        <Timer />
                      </ListItemIcon>
                      Pace
                    </MenuItem>
                    <MenuItem
                      button
                      onClick={e => {
                        sortWorkouts('calories')
                        toggleSortDrawer()
                      }}
                    >
                      <ListItemIcon>
                        <Whatshot />
                      </ListItemIcon>
                      Calories Burned
                    </MenuItem>
                    <MenuItem
                      button
                      onClick={e => {
                        sortWorkouts('dateTime')
                        toggleSortDrawer()
                      }}
                    >
                      <ListItemIcon>
                        <CalendarToday />
                      </ListItemIcon>
                      Date
                    </MenuItem>
                  </MenuList>
                </Paper>
              </ClickAwayListener>
            </Grow>
          )}
        </Popper>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    open: state.listOptions.showSortDrawer
  }
}
const mapActionsToProps = dispatch => ({
  toggleSortDrawer: () => dispatch({ type: SORT_DRAWER_TOGGLED }),
  sortWorkouts: field => dispatch({ type: SORT_OPTION_TOGGLED, payload: field })
})

const connector = connect(
  mapStateToProps,
  mapActionsToProps
)

export default connector(withStyles(styles)(SortListComposition))
