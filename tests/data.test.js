import test from 'node:test'
import assert from 'node:assert/strict'

import { travelTags, travels } from '../src/data/travels.js'

test('seed data contains exactly 100 travel records', () => {
  assert.equal(travels.length, 100)
})

test('seed data slugs are unique and tags include the all option', () => {
  assert.equal(new Set(travels.map((travel) => travel.slug)).size, 100)
  assert.equal(travelTags[0], '全部')
  assert.ok(travelTags.length > 10)
})
