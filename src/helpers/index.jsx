export function upperCase(str) {
  if (!str) return str
  if (typeof str === 'object') return str

  return str[0].toUpperCase() + str.slice(1)
}
export function byField(field) {
  return (a, b) => (a[field]?.name > b[field]?.name ? 1 : -1)
}
