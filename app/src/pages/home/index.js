import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { last, isEmpty } from 'ramda'
import {
  Typography,
  CircularProgress,
  Card,
  Tooltip,
  Button,
  withStyles
} from '@material-ui/core'
import { Add, Assignment } from '@material-ui/icons'

import { setWorkouts } from '../../action-creators/workouts'

import MenuAppBar from '../../components/menuAppBar'
import CenterLogo from '../../components/centerLogo'
import WorkoutListItem from '../../components/workoutListItem'
import withDrawer from '../../components/withDrawer'

const styles = theme => ({
  placeholder: { maxWidth: '90%', marginTop: '10%' },
  workouts: { marginBottom: '10%' },
  button: { padding: '5%' }
})

class Home extends React.Component {
  componentDidMount() {
    const { setWorkouts } = this.props
    setWorkouts()
  }

  render() {
    const { classes, history, workouts } = this.props
    const { firstName } = this.props.profile

    const RecentWorkouts = isEmpty(workouts) ? (
      <center style={{ marginBottom: '20%' }}>
        <Card className={classes.placeholder}>
          <Typography variant="headline">No Workouts Recorded.</Typography>
          <Typography variant="subheading">
            Click the <Add style={{ marginBottom: '-1%' }} /> icon below to get
            started!
          </Typography>
        </Card>
      </center>
    ) : (
      <div className={classes.workouts}>
        <Typography style={{ paddingTop: '10%' }} variant="headline">
          Most Recent Workout
        </Typography>
        <WorkoutListItem workout={last(workouts)} recentOnly />
      </div>
    )

    return (
      <div>
        <MenuAppBar highLevel />
        <CenterLogo title={`Welcome, ${firstName}`} />

        <div>{RecentWorkouts}</div>
        <center
          style={{
            display: 'flex',
            justifyContent: 'space-evenly'
          }}
        >
          <Link to="/workouts">
            <Tooltip title="List Your Workouts">
              <Button
                variant="extendedFab"
                type="button"
                color="primary"
                size="large"
              >
                <Assignment style={{ color: 'white' }} className="svg_icon" />
              </Button>
            </Tooltip>
          </Link>
          <Link to="/workouts">
            <Tooltip title="Create a Workout">
              <Button
                variant="extendedFab"
                size="large"
                type="button"
                color="primary"
              >
                <Add style={{ color: 'white' }} className="svg_icon" />
              </Button>
            </Tooltip>
          </Link>
        </center>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  workouts: state.workouts,
  profile: state.currentProfile.data
})

const mapActionsToProps = dispatch => ({
  setWorkouts: () => dispatch(setWorkouts)
})

const connector = connect(
  mapStateToProps,
  mapActionsToProps
)

export default withDrawer(connector(withStyles(styles)(Home)))
