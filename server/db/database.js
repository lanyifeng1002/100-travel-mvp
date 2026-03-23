import fs from 'node:fs'
import path from 'node:path'

import Database from 'better-sqlite3'

const databaseDirectory = path.resolve(process.cwd(), 'server', 'db')

fs.mkdirSync(databaseDirectory, { recursive: true })

export const databaseFilePath = path.join(databaseDirectory, 'travel-mvp.sqlite')

export const db = new Database(databaseFilePath)

db.pragma('journal_mode = WAL')
db.pragma('foreign_keys = ON')
