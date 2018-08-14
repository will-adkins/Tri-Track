import React from 'react'
import { equals } from 'ramda'
import { Mood, SentimentSatisfied, MoodBad } from '@material-ui/icons'

export default props => {
  const { type, value } = props
  if (equals(type, 'motivation')) {
    return equals(value, 1) ? (
      <MoodBad />
    ) : equals(value, 2) ? (
      <SentimentSatisfied />
    ) : (
      <Mood />
    )
  }
  if (equals(type, 'wellness')) {
    return equals(value, 1) ? (
      <img src="/static/sick.png" alt="Sick Icon" />
    ) : equals(value, 2) ? (
      <img src="/static/fever.png" alt="Fever Icon" />
    ) : (
      <img src="/static/well.png" alt="Well Icon" />
    )
  }
}
