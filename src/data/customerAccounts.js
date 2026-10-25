const ACCOUNTS_KEY = 'bubble-n-tee-customer-accounts'
const PASSWORD_ITERATIONS = 120000

function normalizePhone(phone) {
  return phone.replace(/\D/g, '')
}

function getAccounts() {
  const savedAccounts = window.localStorage.getItem(ACCOUNTS_KEY)
  if (!savedAccounts) return []

  const accounts = JSON.parse(savedAccounts)
  if (!Array.isArray(accounts)) {
    throw new Error('Saved customer accounts are not in the expected format.')
  }

  const validAccounts = accounts.every((account) => (
    account &&
    typeof account.name === 'string' &&
    typeof account.phone === 'string' &&
    typeof account.normalizedPhone === 'string' &&
    typeof account.salt === 'string' &&
    typeof account.passwordHash === 'string'
  ))
  if (!validAccounts) {
    throw new Error('Saved customer accounts contain an invalid entry.')
  }

  return accounts
}

function toBase64(bytes) {
  return window.btoa(String.fromCharCode(...new Uint8Array(bytes)))
}

async function hashPassword(password, salt) {
  const key = await window.crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    'PBKDF2',
    false,
    ['deriveBits'],
  )
  const hash = await window.crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt,
      iterations: PASSWORD_ITERATIONS,
      hash: 'SHA-256',
    },
    key,
    256,
  )
  return new Uint8Array(hash)
}

export async function registerCustomer({ name, phone, password }) {
  const normalizedPhone = normalizePhone(phone)
  if (!name.trim()) throw new Error('Enter your name.')
  if (normalizedPhone.length < 7) throw new Error('Enter a valid phone number.')
  if (password.length < 8) throw new Error('Password must be at least 8 characters.')

  const accounts = getAccounts()
  if (accounts.some((account) => account.normalizedPhone === normalizedPhone)) {
    throw new Error('An account with this phone number already exists. Please log in instead.')
  }

  const salt = window.crypto.getRandomValues(new Uint8Array(16))
  const passwordHash = await hashPassword(password, salt)
  const account = {
    name: name.trim(),
    phone: phone.trim(),
    normalizedPhone,
    salt: toBase64(salt),
    passwordHash: toBase64(passwordHash),
  }
  window.localStorage.setItem(ACCOUNTS_KEY, JSON.stringify([...accounts, account]))

  return { name: account.name, phone: account.phone }
}

export async function authenticateCustomer({ phone, password }) {
  const normalizedPhone = normalizePhone(phone)
  const account = getAccounts().find((savedAccount) => (
    savedAccount.normalizedPhone === normalizedPhone
  ))
  if (!account) throw new Error('Phone number or password is incorrect.')

  const salt = Uint8Array.from(window.atob(account.salt), (character) => character.charCodeAt(0))
  const passwordHash = await hashPassword(password, salt)
  if (toBase64(passwordHash) !== account.passwordHash) {
    throw new Error('Phone number or password is incorrect.')
  }

  return { name: account.name, phone: account.phone }
}
