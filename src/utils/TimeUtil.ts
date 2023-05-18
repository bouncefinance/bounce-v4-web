export function timestampToCountdown(timestamp: number | string): string[] {
  const current_time = Date.now() / 1000
  const timestampNum = Number(timestamp) * 1000
  let time_remaining = timestampNum - current_time

  if (time_remaining <= 0) {
    return ['0d', '0h', '0m', '0s']
  }

  const days = Math.floor(time_remaining / 86400)
  time_remaining -= days * 86400

  const hours = Math.floor(time_remaining / 3600) % 24
  time_remaining -= hours * 3600

  const minutes = Math.floor(time_remaining / 60) % 60
  time_remaining -= minutes * 60

  const seconds = Math.floor(time_remaining % 60)

  return [`${days}d`, `${hours}h`, `${minutes}m`, `${seconds}s`]
}
