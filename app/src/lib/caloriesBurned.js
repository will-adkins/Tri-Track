import { equals } from 'ramda'
//calories burned
// Runing = distance run (kilometres) x weight of runner (kilograms) x 1.036
// Biking = 0.35 * distance * weight
// Swim Freestyle = ((9.8 * weight(kg) * 3.5) / 200)) * time(min)
// BackStroke 9.5, Breastroke 10.3, Butterfly 13.8
export default (category, distance, duration, stroke) => (
  dispatch,
  getState
) => {
  const weightKg = getState().currentProfile.data.weightLbs * 0.454
  const distanceKm = distance * 1.61
  const durationMin = duration / 60

  if (equals(category, 'Swim')) {
    const calories = equals(stroke, 'Freestyle')
      ? ((9.8 * weightKg * 3.5) / 200) * durationMin
      : equals(stroke, 'Backstroke')
        ? ((9.5 * weightKg * 3.5) / 200) * durationMin
        : equals(stroke, 'Breaststroke')
          ? ((10.3 * weightKg * 3.5) / 200) * durationMin
          : ((13.8 * weightKg * 3.5) / 200) * durationMin
    return Math.floor(calories)
  } else if (equals(category, 'Bike')) {
    const calories = 0.35 * distanceKm * (weightKg + 6.8)
    return Math.floor(calories)
  } else {
    const calories = distanceKm * weightKg * 1.036
    return Math.floor(calories)
  }
}
