import http from '~/utils/http'

export const getPins = ({ rand_id, slug, sort, from, seen_ids, since_id }) => {
  return http.get(`flow/pin/${sort}`, {
    rand_id: rand_id || 0,
    slug: slug || '',
    from: from || 'index',
    seen_ids: seen_ids || [],
    last_id: since_id || ''
  })
}

export const API2 = () => {}
