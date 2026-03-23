import { resetDatabase } from '../db/initDatabase.js'

const result = resetDatabase()

console.log(`Database reset complete. Seeded ${result.totalTravels} travels.`)
