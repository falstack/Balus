import http from '~/utils/http'

export const getHotBangumis = ({ page, from, slug }) => {
  return http.get('bangumi/hot', {
    page,
    from,
    slug
  })
}

export const getUserLikeBangumis = ({ page, from, slug }) => {
  return http.get('user/like_bangumi', {
    page,
    from,
    slug
  })
}

export const getPins = ({ rand_id, slug, sort, from, seen_ids, since_id }) => {
  return http.get(`flow/pin/${sort}`, {
    rand_id: rand_id || 0,
    slug: slug || '',
    from: from || 'index',
    seen_ids: seen_ids || [],
    last_id: since_id || ''
  })
}

export const getIdols = ({ rand_id, slug, sort, from, seen_ids, since_id }) => {
  return http.get(`flow/idol/${sort}`, {
    rand_id: rand_id || 0,
    slug: slug || '',
    from: from || 'index',
    seen_ids: seen_ids || [],
    last_id: since_id || ''
  })
}

export const getUnreadUserFollowList = ({ since_id }) => {
  return http.get('message/message_user_follow', {
    last_id: since_id
  })
}

export const getUnreadRewardList = ({ since_id }) => {
  return http.get('message/message_pin_reward', {
    last_id: since_id
  })
}

export const getUnreadCommentList = ({ since_id }) => {
  return http.get('message/message_pin_comment', {
    last_id: since_id
  })
}

export const getUnreadAgreeList = ({ page }) => {
  return http.get('message/message_agree', {
    page
  })
}

export const getSearchList = ({ page, type }) => {
  return http.get('search/mixin', {
    page,
    type
  })
}

export const getMessageMenu = ({ page }) => {
  return http.get('message/menu', {
    page
  })
}

export const getChatList = ({ channel, since_id }) => {
  return http.get('message/history', {
    channel,
    is_up: 1,
    last_id: since_id
  })
}
