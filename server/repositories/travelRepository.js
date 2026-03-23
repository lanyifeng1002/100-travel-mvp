import { db } from '../db/database.js'

const ALL_TAG = '全部'

function parseJsonArray(value) {
  try {
    return JSON.parse(value)
  } catch {
    return []
  }
}

function mapTravel(row) {
  if (!row) {
    return null
  }

  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    country: row.country,
    location: row.location,
    region: row.region,
    image: row.image,
    shortDesc: row.short_desc,
    summary: row.summary,
    fullDesc: row.full_desc,
    bestTime: row.best_time,
    duration: row.duration,
    budget: row.budget,
    tags: parseJsonArray(row.tags_json),
    idealFor: parseJsonArray(row.ideal_for_json),
    highlights: parseJsonArray(row.highlights_json),
    tips: parseJsonArray(row.tips_json)
  }
}

function getAllTravels() {
  return db.prepare('SELECT * FROM travels ORDER BY id').all().map(mapTravel)
}

function matchesKeyword(travel, keyword) {
  if (!keyword) {
    return true
  }

  const sourceText = [
    travel.name,
    travel.country,
    travel.location,
    travel.region,
    travel.shortDesc,
    travel.summary,
    travel.tags.join(' ')
  ]
    .join(' ')
    .toLowerCase()

  return sourceText.includes(keyword)
}

function matchesTag(travel, tag) {
  if (!tag || tag === ALL_TAG) {
    return true
  }

  return travel.tags.includes(tag)
}

function sanitizeText(value, { maxLength = 3000 } = {}) {
  if (typeof value !== 'string') {
    return ''
  }

  return value.trim().slice(0, maxLength)
}

function sanitizeList(value, { maxItems = 8, maxLength = 120 } = {}) {
  if (!Array.isArray(value)) {
    return []
  }

  return [...new Set(value.map((item) => sanitizeText(item, { maxLength })).filter(Boolean))].slice(
    0,
    maxItems
  )
}

function validationError(message, status = 400) {
  const error = new Error(message)
  error.status = status
  return error
}

function normalizeTravelPayload(payload = {}) {
  return {
    slug: sanitizeText(payload.slug, { maxLength: 80 }).toLowerCase(),
    name: sanitizeText(payload.name, { maxLength: 120 }),
    country: sanitizeText(payload.country, { maxLength: 80 }),
    location: sanitizeText(payload.location, { maxLength: 120 }),
    region: sanitizeText(payload.region, { maxLength: 80 }),
    image: sanitizeText(payload.image, { maxLength: 1000 }),
    shortDesc: sanitizeText(payload.shortDesc, { maxLength: 220 }),
    summary: sanitizeText(payload.summary, { maxLength: 320 }),
    fullDesc: sanitizeText(payload.fullDesc, { maxLength: 1200 }),
    bestTime: sanitizeText(payload.bestTime, { maxLength: 80 }),
    duration: sanitizeText(payload.duration, { maxLength: 40 }),
    budget: sanitizeText(payload.budget, { maxLength: 40 }),
    tags: sanitizeList(payload.tags, { maxItems: 6, maxLength: 32 }),
    idealFor: sanitizeList(payload.idealFor, { maxItems: 5, maxLength: 60 }),
    highlights: sanitizeList(payload.highlights, { maxItems: 5, maxLength: 80 }),
    tips: sanitizeList(payload.tips, { maxItems: 5, maxLength: 80 })
  }
}

function validateTravelPayload(payload) {
  const requiredFields = [
    ['slug', '请填写 slug。'],
    ['name', '请填写目的地名称。'],
    ['country', '请填写国家。'],
    ['location', '请填写地点。'],
    ['region', '请填写地区分类。'],
    ['image', '请填写图片地址。'],
    ['shortDesc', '请填写卡片简介。'],
    ['summary', '请填写摘要。'],
    ['fullDesc', '请填写详情描述。'],
    ['bestTime', '请填写最佳时间。'],
    ['duration', '请填写建议停留时长。'],
    ['budget', '请填写预算档位。']
  ]

  for (const [field, message] of requiredFields) {
    if (!payload[field]) {
      throw validationError(message)
    }
  }

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(payload.slug)) {
    throw validationError('slug 只能使用小写字母、数字和中划线。')
  }

  if (!/^https?:\/\//.test(payload.image)) {
    throw validationError('图片地址需要是 http 或 https 链接。')
  }

  if (!payload.tags.length) {
    throw validationError('请至少填写 1 个标签。')
  }

  if (!payload.idealFor.length) {
    throw validationError('请至少填写 1 条适合人群。')
  }

  if (!payload.highlights.length) {
    throw validationError('请至少填写 1 条亮点。')
  }

  if (!payload.tips.length) {
    throw validationError('请至少填写 1 条出行提醒。')
  }
}

function buildDatabasePayload(payload) {
  return {
    slug: payload.slug,
    name: payload.name,
    country: payload.country,
    location: payload.location,
    region: payload.region,
    image: payload.image,
    short_desc: payload.shortDesc,
    summary: payload.summary,
    full_desc: payload.fullDesc,
    best_time: payload.bestTime,
    duration: payload.duration,
    budget: payload.budget,
    tags_json: JSON.stringify(payload.tags),
    ideal_for_json: JSON.stringify(payload.idealFor),
    highlights_json: JSON.stringify(payload.highlights),
    tips_json: JSON.stringify(payload.tips)
  }
}

export function listTravels({ q = '', tag = '' } = {}) {
  const keyword = q.trim().toLowerCase()

  return getAllTravels().filter((travel) => matchesKeyword(travel, keyword) && matchesTag(travel, tag))
}

export function findTravelBySlug(slug) {
  const row = db.prepare('SELECT * FROM travels WHERE slug = ?').get(slug)
  return mapTravel(row)
}

export function listTravelTags() {
  const tags = new Set()

  for (const travel of getAllTravels()) {
    for (const tag of travel.tags) {
      tags.add(tag)
    }
  }

  return [ALL_TAG, ...tags]
}

export function findRandomTravel(filters = {}) {
  const source = listTravels(filters)

  if (!source.length) {
    return null
  }

  return source[Math.floor(Math.random() * source.length)]
}

export function listRelatedTravels(slug, limit = 3) {
  const currentTravel = findTravelBySlug(slug)

  if (!currentTravel) {
    return []
  }

  return getAllTravels()
    .filter((travel) => travel.slug !== slug)
    .sort((left, right) => {
      const leftScore = left.tags.filter((tag) => currentTravel.tags.includes(tag)).length
      const rightScore = right.tags.filter((tag) => currentTravel.tags.includes(tag)).length

      if (leftScore === rightScore) {
        return left.id - right.id
      }

      return rightScore - leftScore
    })
    .slice(0, limit)
}

export function listRecentTravels(limit = 10) {
  const safeLimit = Number.isFinite(limit) ? Math.max(1, Math.min(Number(limit), 20)) : 10
  return db.prepare('SELECT * FROM travels ORDER BY id DESC LIMIT ?').all(safeLimit).map(mapTravel)
}

export function createTravel(payload) {
  const normalizedPayload = normalizeTravelPayload(payload)
  validateTravelPayload(normalizedPayload)

  const insertTravel = db.prepare(`
    INSERT INTO travels (
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

  try {
    insertTravel.run(buildDatabasePayload(normalizedPayload))
  } catch (error) {
    if (String(error.message).includes('UNIQUE')) {
      throw validationError('这个 slug 已经存在，请换一个新的。', 409)
    }

    throw error
  }

  return findTravelBySlug(normalizedPayload.slug)
}

export function getTravelStats() {
  const allTravels = getAllTravels()

  return {
    totalTravels: allTravels.length,
    totalRegions: new Set(allTravels.map((travel) => travel.region)).size,
    totalTags: Math.max(listTravelTags().length - 1, 0)
  }
}
