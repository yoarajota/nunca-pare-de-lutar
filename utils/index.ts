export function getCurrentTimeInSPTimezone() {
  const timezoneOffset = -180 // São Paulo está 180 minutos (3 horas) atrás do UTC

  const now = new Date()

  return new Date(now.getTime() + timezoneOffset * 60 * 1000)
}
