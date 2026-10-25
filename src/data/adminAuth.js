const ADMIN_USERNAME = 'Admin'
const ADMIN_PASSWORD = '1234'

export function authenticateAdmin({ username, password }) {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD
}
