import test from 'node:test'
import assert from 'node:assert/strict'

import { resetDatabase } from '../server/db/initDatabase.js'
import {
  createTravel,
  findTravelBySlug,
  getTravelStats,
  listRecentTravels,
  listTravels
} from '../server/repositories/travelRepository.js'

function createPayload() {
  return {
    slug: 'kyoto-editor-pick',
    name: '京都 · 编辑精选慢游',
    country: '日本',
    location: '京都',
    region: '东亚',
    image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=1200&q=80',
    shortDesc: '把寺院、步行街区和秋季氛围压缩进一次低风险的慢节奏体验。',
    summary: '适合第一次判断自己是否喜欢京都旅行方式的人。',
    fullDesc: '这条路线强调步行尺度、文化密度和停留感，不用赶太多点，也能形成完整记忆。',
    bestTime: '10月下旬 - 11月中旬',
    duration: '4-6天',
    budget: '中高预算',
    tags: ['慢旅行', '文化体验', '秋色'],
    idealFor: ['第一次去京都的人', '喜欢城市散步的人'],
    highlights: ['寺院与红叶组合', '街区步行体验'],
    tips: ['热门季节提前订房', '核心寺院尽量避开周末上午']
  }
}

test('repository returns the 100 seeded records after reset', () => {
  resetDatabase()

  const stats = getTravelStats()
  const travels = listTravels({ tag: '全部' })

  assert.equal(stats.totalTravels, 100)
  assert.equal(travels.length, 100)
  assert.ok(stats.totalRegions >= 5)
})

test('repository can create a travel record and return it from latest list', () => {
  resetDatabase()

  const created = createTravel(createPayload())
  const recentTravels = listRecentTravels(1)
  const found = findTravelBySlug(created.slug)

  assert.equal(created.slug, 'kyoto-editor-pick')
  assert.equal(found?.name, created.name)
  assert.equal(recentTravels[0]?.slug, created.slug)
  assert.equal(getTravelStats().totalTravels, 101)
})
