import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import express from 'express'

import { databaseFilePath } from './db/database.js'
import { initializeDatabase } from './db/initDatabase.js'
import {
  createTravel,
  findRandomTravel,
  findTravelBySlug,
  getTravelStats,
  listRecentTravels,
  listRelatedTravels,
  listTravelTags,
  listTravels
} from './repositories/travelRepository.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '..')
const distDirectory = path.join(projectRoot, 'dist')
const port = Number(process.env.PORT || 3000)

initializeDatabase()

const app = express()

app.use(express.json({ limit: '1mb' }))

app.use((request, response, next) => {
  response.setHeader('Cache-Control', 'no-store')
  next()
})

app.get('/api/health', (request, response) => {
  response.json({
    status: 'ok',
    databaseFilePath,
    ...getTravelStats()
  })
})

app.get('/api/tags', (request, response) => {
  response.json(listTravelTags())
})

app.get('/api/travels', (request, response) => {
  response.json(
    listTravels({
      q: String(request.query.q || ''),
      tag: String(request.query.tag || '')
    })
  )
})

app.get('/api/travels/random', (request, response) => {
  const travel = findRandomTravel({
    q: String(request.query.q || ''),
    tag: String(request.query.tag || '')
  })

  if (!travel) {
    response.status(404).json({ error: 'No travel matches the current filters.' })
    return
  }

  response.json(travel)
})

app.get('/api/travels/:slug/related', (request, response) => {
  const currentTravel = findTravelBySlug(request.params.slug)

  if (!currentTravel) {
    response.status(404).json({ error: 'Travel not found.' })
    return
  }

  const requestedLimit = Number(request.query.limit || 3)
  const safeLimit = Number.isFinite(requestedLimit) ? Math.max(1, Math.min(requestedLimit, 6)) : 3

  response.json(listRelatedTravels(request.params.slug, safeLimit))
})

app.get('/api/travels/:slug', (request, response) => {
  const travel = findTravelBySlug(request.params.slug)

  if (!travel) {
    response.status(404).json({ error: 'Travel not found.' })
    return
  }

  response.json(travel)
})

app.get('/api/stats', (request, response) => {
  response.json(getTravelStats())
})

app.get('/api/admin/travels', (request, response) => {
  const requestedLimit = Number(request.query.limit || 10)
  response.json(listRecentTravels(requestedLimit))
})

app.post('/api/admin/travels', (request, response) => {
  try {
    const createdTravel = createTravel(request.body || {})
    response.status(201).json(createdTravel)
  } catch (error) {
    const status = Number(error.status || 500)
    response.status(status).json({
      error: status >= 500 ? 'Failed to create travel.' : error.message
    })
  }
})

if (fs.existsSync(distDirectory)) {
  app.use(express.static(distDirectory))

  app.use((request, response, next) => {
    if (request.path.startsWith('/api')) {
      next()
      return
    }

    response.sendFile(path.join(distDirectory, 'index.html'))
  })
}

if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  app.listen(port, () => {
    console.log(`Travel MVP server is running at http://localhost:${port}`)
    console.log(`SQLite database: ${databaseFilePath}`)
  })
}

export { app }
