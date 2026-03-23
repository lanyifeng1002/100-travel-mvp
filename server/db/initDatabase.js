import { travels } from '../../src/data/travels.js'
import { db } from './database.js'

function createSchema() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS travels (
      id INTEGER PRIMARY KEY,
      slug TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      country TEXT NOT NULL,
      location TEXT NOT NULL,
      region TEXT NOT NULL,
      image TEXT NOT NULL,
      short_desc TEXT NOT NULL,
      summary TEXT NOT NULL,
      full_desc TEXT NOT NULL,
      best_time TEXT NOT NULL,
      duration TEXT NOT NULL,
      budget TEXT NOT NULL,
      tags_json TEXT NOT NULL,
      ideal_for_json TEXT NOT NULL,
      highlights_json TEXT NOT NULL,
      tips_json TEXT NOT NULL
    );
  `)
}

function buildRecord(travel) {
  return {
    id: travel.id,
    slug: travel.slug,
    name: travel.name,
    country: travel.country,
    location: travel.location,
    region: travel.region,
    image: travel.image,
    short_desc: travel.shortDesc,
    summary: travel.summary,
    full_desc: travel.fullDesc,
    best_time: travel.bestTime,
    duration: travel.duration,
    budget: travel.budget,
    tags_json: JSON.stringify(travel.tags),
    ideal_for_json: JSON.stringify(travel.idealFor),
    highlights_json: JSON.stringify(travel.highlights),
    tips_json: JSON.stringify(travel.tips)
  }
}

function insertSeedData() {
  const insertTravel = db.prepare(`
    INSERT INTO travels (
      id,
      slug,
      name,
      country,
      location,
      region,
      image,
      short_desc,
      summary,
      full_desc,
      best_time,
      duration,
      budget,
      tags_json,
      ideal_for_json,
      highlights_json,
      tips_json
    ) VALUES (
      @id,
      @slug,
      @name,
      @country,
      @location,
      @region,
      @image,
      @short_desc,
      @summary,
      @full_desc,
      @best_time,
      @duration,
      @budget,
      @tags_json,
      @ideal_for_json,
      @highlights_json,
      @tips_json
    )
  `)

  const seedTransaction = db.transaction((items) => {
    for (const item of items) {
      insertTravel.run(buildRecord(item))
    }
  })

  seedTransaction(travels)
}

export function initializeDatabase() {
  createSchema()

  const { count } = db.prepare('SELECT COUNT(*) AS count FROM travels').get()

  if (count === 0) {
    insertSeedData()
  }

  const { finalCount } = db.prepare('SELECT COUNT(*) AS finalCount FROM travels').get()

  return {
    totalTravels: finalCount
  }
}

export function resetDatabase() {
  createSchema()
  db.exec('DELETE FROM travels')
  insertSeedData()

  return {
    totalTravels: travels.length
  }
}
