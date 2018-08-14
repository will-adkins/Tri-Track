import React from 'react'
import {
  MenuItem,
  Select,
  FormControl,
  Grid,
  withStyles
} from '@material-ui/core'
import { equals } from 'ramda'
const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 160
  }
})

class CustomSelect extends React.Component {
  state = {
    open: false
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  render() {
    const { classes, field, value, onSelect } = this.props

    const value1 = equals(field, 'category') ? 'Swim' : 1
    const value2 = equals(field, 'category') ? 'Bike' : 2
    const value3 = equals(field, 'category') ? 'Run' : 3

    return (
      <Grid item>
        <FormControl className={classes.formControl}>
          <Select
            open={this.state.open}
            onClose={this.handleClose}
            onOpen={this.handleOpen}
            value={value}
            onChange={e => onSelect(field, e.target.value)}
            inputProps={{
              name: field,
              id: 'demo-controlled-open-select'
            }}
          >
            <MenuItem value={value1}>{value1}</MenuItem>
            <MenuItem value={value2}>{value2}</MenuItem>
            <MenuItem value={value3}>{value3}</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    )
  }
}

export default withStyles(styles)(CustomSelect)
