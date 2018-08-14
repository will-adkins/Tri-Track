import React from 'react'
import { withRouter } from 'react-router'
import {
  Grid,
  TextField,
  CardContent,
  ListItem,
  Input,
  InputLabel,
  InputAdornment,
  FormControl,
  Button,
  withStyles
} from '@material-ui/core'
import { Terrain, AccessTime, Timer, Whatshot } from '@material-ui/icons'

import secToMin from '../lib/secToMin'
import WorkoutIcon from '../components/workoutIcon'
import CustomSelect from '../components/customSelect'

const styles = theme => ({
  workout: {
    paddingTop: '10%'
  },
  row: {
    display: 'flex',
    justifyContent: 'space-evenly'
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  margin: {
    margin: theme.spacing.unit
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3
  },
  textField: {
    width: '50%'
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

const WorkoutForm = props => {
  const { classes, history, onChange, onSubmit } = props
  const {
    category,
    wellness,
    motivation,
    distanceMi,
    durationSec,
    paceSecPerMi,
    calories
  } = props.workout

  const SoftForm = (
    <center>
      <form style={{ marginLeft: '25%', paddingTop: '10%' }}>
        <div className={classes.margin}>
          <Grid container spacing={8} alignItems="flex-end">
            <Grid item>
              <WorkoutIcon category={category} />
            </Grid>
            <CustomSelect
              field="category"
              value={category}
              onSelect={onChange}
            />
          </Grid>
        </div>
        <div className={classes.margin}>
          <Grid container spacing={8} alignItems="flex-end">
            <Grid item>
              <Terrain />
            </Grid>
            <Grid item>
              <TextField
                id="password"
                label="Wellness"
                type="password"
                className={classes.textfield}
                required
              />
            </Grid>
          </Grid>
        </div>
        <div className={classes.margin}>
          <Grid container spacing={8} alignItems="flex-end">
            <Grid item>
              <Terrain />
            </Grid>
            <Grid item>
              <TextField
                id="username"
                label="Motivation"
                className={classes.textfield}
                required
              />
            </Grid>
          </Grid>
        </div>
      </form>
    </center>
  )

  // const HardForm = (
  //   <center>
  //     <form
  //       style={{ marginLeft: '25%', marginTop: '-5%' }}
  //       onSubmit={onSubmit(history)}
  //     >
  //       <div className={classes.margin}>
  //         <Grid container spacing={8} alignItems="flex-end">
  //           <Grid item>
  //             <Info />
  //           </Grid>
  //           <Grid item>
  //             <TextField
  //               id="firstName"
  //               label="First Name"
  //               value={firstName}
  //               onChange={e => onChange('firstName', e.target.value)}
  //               className={classes.textfield}
  //               required
  //             />
  //           </Grid>
  //         </Grid>
  //       </div>
  //       <div className={classes.margin}>
  //         <Grid container spacing={8} alignItems="flex-end">
  //           <Grid item>
  //             <Info />
  //           </Grid>
  //           <Grid item>
  //             <TextField
  //               id="lastName"
  //               label="Last Name"
  //               value={lastName}
  //               onChange={e => onChange('lastName', e.target.value)}
  //               className={classes.textfield}
  //               required
  //             />
  //           </Grid>
  //         </Grid>
  //       </div>
  //       <div className={classes.margin}>
  //         <Grid container spacing={8} alignItems="flex-end">
  //           <Grid item>
  //             <AccessibilityNew />
  //           </Grid>
  //           <Grid item>
  //             <TextField
  //               id="heightIn"
  //               label="Height (In)"
  //               value={heightIn}
  //               onChange={e => onChange('heightIn', Number(e.target.value))}
  //               className={classes.textfield}
  //               required
  //             />
  //           </Grid>
  //         </Grid>
  //       </div>
  //       <div className={classes.margin}>
  //         <Grid container spacing={8} alignItems="flex-end">
  //           <Grid item>
  //             <FitnessCenter />
  //           </Grid>
  //           <Grid item>
  //             <TextField
  //               id="weightLbs"
  //               label="Weight (Lbs)"
  //               value={weightLbs}
  //               onChange={e => onChange('weightLbs', Number(e.target.value))}
  //               className={classes.textfield}
  //               required
  //             />
  //           </Grid>
  //         </Grid>
  //       </div>
  //       <div style={{ paddingTop: 12 }}>
  //         <Button variant="extendedFab" color="primary" type="submit">
  //           Sign Up
  //         </Button>
  //         <Button variant="flat" type="button" onClick={e => toggleForm()}>
  //           Go Back
  //         </Button>
  //       </div>
  //     </form>
  //   </center>
  // )

  // return (
  //   <CardContent>
  //     <div className={classes.row}>
  //       <ListItem>
  //         <FormControl className={classes.margin}>
  //           <InputLabel>Distance (miles)</InputLabel>
  //           <Input
  //             id="input-with-icon-adornment"
  //             value={`${distanceMi}`}
  //             startAdornment={
  //               <InputAdornment position="start">
  //                 <Terrain />
  //               </InputAdornment>
  //             }
  //           />
  //         </FormControl>
  //       </ListItem>

  //       <ListItem>
  //         <FormControl className={classes.margin}>
  //           <InputLabel>Duration</InputLabel>
  //           <Input
  //             id="input-with-icon-adornment"
  //             value={secToMin(durationSec)}
  //             startAdornment={
  //               <InputAdornment position="start">
  //                 <AccessTime />
  //               </InputAdornment>
  //             }
  //           />
  //         </FormControl>
  //       </ListItem>
  //     </div>
  //     <div className={classes.row}>
  //       <ListItem>
  //         <FormControl className={classes.margin}>
  //           <InputLabel>Pace</InputLabel>
  //           <Input
  //             id="input-with-icon-adornment"
  //             value={`${paceSecPerMi}`}
  //             startAdornment={
  //               <InputAdornment position="start">
  //                 <Timer />
  //               </InputAdornment>
  //             }
  //           />
  //         </FormControl>
  //       </ListItem>

  //       <ListItem>
  //         <FormControl className={classes.margin}>
  //           <InputLabel>Calories</InputLabel>
  //           <Input
  //             id="input-with-icon-adornment"
  //             value={calories}
  //             startAdornment={
  //               <InputAdornment position="start">
  //                 <Whatshot />
  //               </InputAdornment>
  //             }
  //           />
  //         </FormControl>
  //       </ListItem>
  //     </div>
  //   </CardContent>
  // )
  return SoftForm
}

export default withRouter(withStyles(styles)(WorkoutForm))
