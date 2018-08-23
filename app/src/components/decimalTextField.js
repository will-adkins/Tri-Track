import React from 'react'
import { TextField, withStyles } from '@material-ui/core'

const styles = theme => ({
  textField: {
    width: '50%'
  }
})

class DecimalTextField extends React.Component {
  state = {
    stringValue: this.props.value
  }

  handleChange = value => {
    if (!Number.isNaN(Number(value))) {
      this.setState({ stringValue: value })
    }
  }

  render() {
    const { classes, label, field, onChange } = this.props
    return (
      <TextField
        id="distance"
        label={label}
        value={this.state.stringValue}
        onChange={e => {
          onChange(field, Number(e.target.value))
          this.handleChange(e.target.value)
        }}
        className={classes.textfield}
        autoComplete="off"
        required
      />
    )
  }
}

export default withStyles(styles)(DecimalTextField)
