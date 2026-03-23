import { after, before, beforeEach, test } from 'node:test'
import assert from 'node:assert/strict'

import { resetDatabase } from '../server/db/initDatabase.js'
import { app } from '../server/index.js'

let server
let baseUrl = ''

function createPayload() {
  return {
    slug: 'lisbon-rooftop-weekend',
    name: '里斯本 · 屋顶日落周末线',
    country: '葡萄牙',
    location: '里斯本',
    region: '南欧',
    image: 'https://images.unsplash.com/photo-1513735492246-483525079686?auto=format&fit=crop&w=1200&q=80',
    shortDesc: '用坡城、海风和傍晚光线，快速判断自己是否喜欢里斯本。',
    summary: '适合假期不长，但希望有城市气氛和视觉记忆点的人。',
    fullDesc: '这条路线优先保留老城、观景台和电车体验，节奏不会过满，适合第一次尝试葡萄牙城市旅行。',
    bestTime: '4月 - 6月，9月 - 10月',
    duration: '3-4天',
    budget: '中预算',
    tags: ['城市漫游', '海风', '周末旅行'],
    idealFor: ['想做短假期出行的人', '喜欢老城与日落的人'],
    highlights: ['观景台串联', '海边城市氛围'],
    tips: ['老城区道路起伏较大', '热门日落点建议提前到']
  }
}

before(async () => {
  await new Promise((resolve) => {
    server = app.listen(0, '127.0.0.1', () => {
      const address = server.address()
      baseUrl = `http://127.0.0.1:${address.port}`
      resolve()
    })
  })
})

after(async () => {
  await new Promise((resolve, reject) => {
    server.close((error) => {
      if (error) {
        reject(error)
        return
      }

      resolve()
    })
  })
})

beforeEach(() => {
  resetDatabase()
})

test('GET /api/health returns live database stats', async () => {
  const response = await fetch(`${baseUrl}/api/health`)
  const payload = await response.json()

  assert.equal(response.status, 200)
  assert.equal(payload.status, 'ok')
  assert.equal(payload.totalTravels, 100)
  assert.ok(payload.totalTags > 10)
})

test('POST /api/admin/travels creates a travel that can be queried by slug', async () => {
  const payload = createPayload()

  const createResponse = await fetch(`${baseUrl}/api/admin/travels`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
  const created = await createResponse.json()

  assert.equal(createResponse.status, 201)
  assert.equal(created.slug, payload.slug)

  const detailResponse = await fetch(`${baseUrl}/api/travels/${payload.slug}`)
  const detail = await detailResponse.json()

  assert.equal(detailResponse.status, 200)
  assert.equal(detail.name, payload.name)
})
