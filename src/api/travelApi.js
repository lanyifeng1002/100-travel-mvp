async function request(path, options = {}) {
  const requestOptions = {
    method: options.method || 'GET',
    headers: {
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...(options.headers || {})
    }
  }

  if (options.body) {
    requestOptions.body = typeof options.body === 'string' ? options.body : JSON.stringify(options.body)
  }

  const response = await fetch(path, requestOptions)

  if (!response.ok) {
    let message = 'Request failed.'

    try {
      const errorPayload = await response.json()
      if (errorPayload?.error) {
        message = errorPayload.error
      }
    } catch {
      // Ignore invalid JSON error payloads.
    }

    const error = new Error(message)
    error.status = response.status
    throw error
  }

  return response.json()
}

export function fetchTravelTags() {
  return request('/api/tags')
}

export function fetchTravels() {
  return request('/api/travels')
}

export function fetchRandomTravel(filters = {}) {
  const query = new URLSearchParams()

  if (filters.q) {
    query.set('q', filters.q)
  }

  if (filters.tag && filters.tag !== '全部') {
    query.set('tag', filters.tag)
  }

  const suffix = query.toString() ? `?${query.toString()}` : ''

  return request(`/api/travels/random${suffix}`)
}

export function fetchTravelBySlug(slug) {
  return request(`/api/travels/${slug}`)
}

export function fetchRelatedTravels(slug, limit = 3) {
  return request(`/api/travels/${slug}/related?limit=${limit}`)
}

export function fetchTravelStats() {
  return request('/api/stats')
}

export function fetchRecentAdminTravels(limit = 10) {
  return request(`/api/admin/travels?limit=${limit}`)
}

export function createTravel(payload) {
  return request('/api/admin/travels', {
    method: 'POST',
    body: payload
  })
}
