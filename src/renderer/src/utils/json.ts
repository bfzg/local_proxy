export function ParseJSON(str?: string) {
  if (!str) return
  let data
  try {
    data = JSON.parse(str)
  } catch (error) {
    data = str
  }
  return data
}
