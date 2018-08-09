import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  Divider,
  Typography
} from '@material-ui/core'
import {
  Home,
  FitnessCenter,
  Edit,
  Star,
  DirectionsBike,
  DirectionsRun,
  Pool
} from '@material-ui/icons'

import { DRAWER_TOGGLED } from '../constants'

const withDrawer = function(PageComponent) {
  const WrappedDrawerPageComponent = props => {
    const NavListItems = (
      <div>
        <center style={{ margin: '5%' }}>
          <Typography variant="title" color="secondary">
            Tri-Track
          </Typography>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-evenly',
              marginTop: '5%'
            }}
          >
            <Pool /> <DirectionsBike /> <DirectionsRun />
          </div>
        </center>
        <Divider />
        <Link to="/home" className="router-link">
          <ListItem button onClick={e => props.toggleDrawer()}>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </Link>

        <Link to="/workouts" className="router-link">
          <ListItem button onClick={e => props.toggleDrawer()}>
            <ListItemIcon>
              <FitnessCenter />
            </ListItemIcon>
            <ListItemText primary="Your Workouts" />
          </ListItem>
        </Link>

        <Link to="/edit-profile" className="router-link">
          <ListItem button onClick={e => props.toggleDrawer()}>
            <ListItemIcon>
              <Edit />
            </ListItemIcon>
            <ListItemText primary="Edit Profile" />
          </ListItem>
        </Link>

        <Link to="/workouts/new" className="router-link">
          <ListItem button onClick={e => props.toggleDrawer()}>
            <ListItemIcon>
              <Star />
            </ListItemIcon>
            <ListItemText primary="Add Workout" />
          </ListItem>
        </Link>
      </div>
    )
    return (
      <div>
        <PageComponent {...props} />
        <Drawer
          anchor="left"
          open={props.open}
          onClose={e => props.toggleDrawer()}
        >
          <div tabIndex={0} role="button">
            {NavListItems}
          </div>
        </Drawer>
      </div>
    )
  }

  const mapStateToProps = state => ({
    open: state.drawer
  })

  const mapActionsToProps = dispatch => ({
    toggleDrawer: () => dispatch({ type: DRAWER_TOGGLED })
  })

  const connector = connect(
    mapStateToProps,
    mapActionsToProps
  )

  return connector(WrappedDrawerPageComponent)
}

export default withDrawer
