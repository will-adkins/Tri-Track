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
  Add,
  DirectionsBike,
  DirectionsRun,
  Pool,
  ExitToApp
} from '@material-ui/icons'

import { DRAWER_TOGGLED, CURRENT_PROFILE_LOGGED_OUT } from '../constants'

const withDrawer = PageComponent => {
  const WrappedDrawerPageComponent = props => {
    const { logout, toggleDrawer, profileId } = props
    const NavListItems = (
      <div>
        <center style={{ margin: '5%' }}>
          <Typography variant="title" color="primary">
            Tri-Track
          </Typography>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-evenly',
              marginTop: '5%'
            }}
          >
            <Pool color="secondary" /> <DirectionsBike color="secondary" />{' '}
            <DirectionsRun color="secondary" />
          </div>
        </center>
        <Divider />
        <Link to="/home" className="router-link">
          <ListItem button onClick={e => toggleDrawer()}>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </Link>

        <Link to="/workouts" className="router-link">
          <ListItem button onClick={e => toggleDrawer()}>
            <ListItemIcon>
              <FitnessCenter />
            </ListItemIcon>
            <ListItemText primary="Your Workouts" />
          </ListItem>
        </Link>

        <Link to="/workouts/new" className="router-link">
          <ListItem button onClick={e => toggleDrawer()}>
            <ListItemIcon>
              <Add />
            </ListItemIcon>
            <ListItemText primary="Add Workout" />
          </ListItem>
        </Link>

        <Link to={`/profile/${profileId}/edit`} className="router-link">
          <ListItem button onClick={e => toggleDrawer()}>
            <ListItemIcon>
              <Edit />
            </ListItemIcon>
            <ListItemText primary="Edit Profile" />
          </ListItem>
        </Link>

        <Link to="/" className="router-link">
          <ListItem
            button
            onClick={e => {
              toggleDrawer()
              logout()
            }}
          >
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText primary="Sign Out" />
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
    open: state.drawer,
    profileId: state.currentProfile.data._id
  })

  const mapActionsToProps = dispatch => ({
    toggleDrawer: () => dispatch({ type: DRAWER_TOGGLED }),
    logout: () => dispatch({ type: CURRENT_PROFILE_LOGGED_OUT })
  })

  const connector = connect(
    mapStateToProps,
    mapActionsToProps
  )

  return connector(WrappedDrawerPageComponent)
}

export default withDrawer
