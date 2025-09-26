import { writeFileSync, readFileSync } from 'node:fs'
const users = [
  { name: 'Srimanjunath (Manju) Thangavel', email: 'manju.thangavel@bsu.edu' },
]
const usersJson = JSON.stringify(users)
writeFileSync('backend/users.json', usersJson)
const readUsersJson = readFileSync('backend/users.json')
const readUsers = JSON.parse(readUsersJson)
console.log(readUsers)
