import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  withStyles
} from '@material-ui/core'
import { Delete } from '@material-ui/icons'

import { deleteWorkout } from '../action-creators/workouts'
import {
  CURRENT_WORKOUT_DELETING_CANCELED,
  CURRENT_WORKOUT_DELETE_CONFIRMATION_ENDED
} from '../constants'

const styles = theme => ({
  rightIcon: {
    marginLeft: theme.spacing.unit
  }
})

function Transition(props) {
  return <Slide direction="up" {...props} />
}

class AlertDialogSlide extends React.Component {
  render() {
    const { classes, history, open, onCancel, onDelete } = this.props
    return (
      <div>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={onCancel}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {'Are you sure you want to delete this workout?'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Clicking Delete will permanently delete your workout from the
              database. Click Cancel to view your workout again.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={onCancel} color="primary">
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={onDelete(history)}
              color="secondary"
            >
              Delete
              <Delete className={classes.rightIcon} />
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  open: state.currentWorkout.isConfirmingDelete
})

const mapActionsToProps = dispatch => ({
  onDelete: history => e => dispatch(deleteWorkout(history)),
  onCancel: e => dispatch({ type: CURRENT_WORKOUT_DELETE_CONFIRMATION_ENDED })
})

const connector = connect(
  mapStateToProps,
  mapActionsToProps
)

export default connector(withRouter(withStyles(styles)(AlertDialogSlide)))
