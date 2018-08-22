import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Error, Info, Close, Warning, CheckCircle } from '@material-ui/icons'
import green from '@material-ui/core/colors/green'
import amber from '@material-ui/core/colors/amber'
import {
  IconButton,
  Snackbar,
  SnackbarContent,
  withStyles
} from '@material-ui/core'

const variantIcon = {
  success: CheckCircle,
  warning: Warning,
  error: Error,
  info: Info
}

const styles1 = theme => ({
  success: {
    backgroundColor: theme.palette.error.light
  },
  error: {
    backgroundColor: theme.palette.error.light
  },
  info: {
    backgroundColor: theme.palette.error.light
  },
  warning: {
    backgroundColor: amber[700]
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit
  },
  message: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

function MySnackbarContent(props) {
  const { classes, className, message, onClose, variant, ...other } = props
  const Icon = variantIcon[variant]

  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <center id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {message}
        </center>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <Close className={classes.icon} />
        </IconButton>
      ]}
      {...other}
    />
  )
}

MySnackbarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired
}

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent)

const styles2 = theme => ({
  margin: {
    margin: theme.spacing.unit
  }
})

class CustomizedSnackbars extends React.Component {
  state = {
    open: true
  }

  handleClose = (event, reason) => {
    const { close } = this.props
    if (reason === 'clickaway') {
      return
    }

    this.setState({ open: false })
    close && close()
  }

  render() {
    const { type, msg } = this.props

    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
        >
          <MySnackbarContentWrapper
            onClose={this.handleClose}
            variant={type}
            message={msg}
          />
        </Snackbar>
      </div>
    )
  }
}

export default withStyles(styles2)(CustomizedSnackbars)
