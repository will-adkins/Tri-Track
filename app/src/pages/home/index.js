import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { head, isEmpty } from 'ramda'
import {
  Typography,
  Card,
  Tooltip,
  Button,
  withStyles
} from '@material-ui/core'
import { Add, Assignment } from '@material-ui/icons'

import { setWorkouts } from '../../action-creators/workouts'
import sortWorkouts from '../../lib/sortWorkouts'

import MenuAppBar from '../../components/menuAppBar'
import CenterLogo from '../../components/centerLogo'
import WorkoutListItem from '../../components/workoutListItem'
import withDrawer from '../../components/withDrawer'

const styles = theme => ({
  placeholder: { margin: 16, marginBottom: '10%', padding: 16 },
  workouts: {
    marginBottom: '10%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: '10%'
  },
  button: { padding: '5%' }
})

class Home extends React.Component {
  componentDidMount() {
    const { setWorkouts } = this.props
    setWorkouts()
  }

  render() {
    const { classes, workouts, sortKey } = this.props
    const { firstName } = this.props.profile

    const RecentWorkouts = isEmpty(workouts) ? (
      <center>
        <div className={classes.row}>
          <Typography variant="headline" color="secondary">
            No Workouts Recorded
          </Typography>
        </div>
        <Card className={classes.placeholder}>
          <Typography variant="subheading">
            Click the <Add color="secondary" style={{ marginBottom: '-1%' }} />{' '}
            icon below to get started!
          </Typography>
        </Card>
      </center>
    ) : (
      <div className={classes.workouts}>
        <div className={classes.row}>
          <Typography variant="headline" color="secondary">
            Most Recent Workout
          </Typography>
        </div>
        <WorkoutListItem
          workout={head(sortWorkouts(sortKey, workouts))}
          recentOnly
        />
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
            <Tooltip title="Your Workouts">
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
          <Link to="/workouts/new">
            <Tooltip title="Add a Workout">
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
  profile: state.currentProfile.data,
  sortKey: state.listOptions.sort
})

const mapActionsToProps = dispatch => ({
  setWorkouts: () => dispatch(setWorkouts)
})

const connector = connect(
  mapStateToProps,
  mapActionsToProps
)

export default withDrawer(connector(withStyles(styles)(Home)))
