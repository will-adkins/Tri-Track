import React from 'react'
import { equals } from 'ramda'
import { Mood, SentimentSatisfied, MoodBad } from '@material-ui/icons'

export default props => {
  const { type, value } = props
  if (equals(type, 'motivation')) {
    return equals(value, 1) ? (
      <MoodBad color="secondary" />
    ) : equals(value, 2) ? (
      <SentimentSatisfied color="secondary" />
    ) : (
      <Mood color="secondary" />
    )
  }
  if (equals(type, 'wellness')) {
    return equals(value, 1) ? (
      <img src="/static/sick.svg" alt="Sick Icon" style={{ height: 22 }} />
    ) : equals(value, 2) ? (
      <img src="/static/fever.svg" alt="Fever Icon" style={{ height: 22 }} />
    ) : (
      <img src="/static/well.svg" alt="Well Icon" style={{ height: 32 }} />
    )
  }
}
