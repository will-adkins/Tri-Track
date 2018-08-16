import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Popper, Grow, ClickAwayListener, Button } from '@material-ui/core'
import { ArrowDropDown } from '@material-ui/icons'
import { connect } from 'react-redux'
import Calendar from 'react-calendar'

import { CALENDAR_TOGGLED, CALENDAR_RESET } from '../constants'

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

class CustomCalendar extends React.Component {
  render() {
    const {
      toggleCalendar,
      resetCalendar,
      open,
      onChange,
      dateTime
    } = this.props

    return (
      <React.Fragment>
        <Button
          onClick={open ? e => null : toggleCalendar}
          buttonRef={node => {
            this.anchorEl = node
          }}
        >
          <ArrowDropDown style={{ marginRight: '-130%' }} />
        </Button>
        <Popper
          open={open}
          anchorEl={this.anchorEl}
          transition
          disablePortal
          className="overlay"
          style={{ paddingTop: 6 }}
          placement="top"
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="menu-list-grow"
              style={{
                transformOrigin: placement === 'top left'
              }}
            >
              <ClickAwayListener onClickAway={open ? resetCalendar : e => null}>
                <Calendar
                  className="overlay"
                  calendarType="ISO 8601"
                  maxDate={new Date()}
                  value={new Date(dateTime)}
                  onChange={date => onChange('dateTime', date.toISOString())}
                />
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
    open: state.calendar
  }
}
const mapActionsToProps = dispatch => ({
  toggleCalendar: e => dispatch({ type: CALENDAR_TOGGLED }),
  resetCalendar: e => dispatch({ type: CALENDAR_RESET })
})

const connector = connect(
  mapStateToProps,
  mapActionsToProps
)

export default connector(withStyles(styles)(CustomCalendar))
