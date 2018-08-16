import React from 'react'
import { Typography } from '@material-ui/core'

const CenterLogo = props => {
  const { title } = props
  return (
    <center>
      <div style={{ paddingTop: '5%' }}>
        <Typography variant="display2" color="secondary">
          {title}
        </Typography>
      </div>
      <img
        alt="Tri-Track icon"
        src="/static/tri-symbol-1.jpg"
        width="50%"
        className="underlay"
      />
    </center>
  )
}

export default CenterLogo
