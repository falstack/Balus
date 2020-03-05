export const isArray = data => Object.prototype.toString.call(data) === '[object Array]'

export const getObjectDeepValue = (field, keys) => {
  if (!keys) {
    return field
  }
  let result = field
  const keysArr = isArray(keys) ? keys : keys.split('.')
  keysArr.forEach(key => {
    result = result[key]
  })
  return result
}

export const computeResultLength = data => {
  let result = 0
  if (isArray(data)) {
    result = data.length
  } else {
    Object.keys(data).forEach(key => {
      result += data[key].length
    })
  }
  return result
}

export const generateRequestParams = (field, params, type) => {
  const result = {}
  const query = params || {}
  if (field.flow_fetched) {
    const changing = query.changing || 'slug'
    if (type === 'seenIds') {
      result.seen_ids = field.flow_result.map(_ => getObjectDeepValue(_, changing)).join(',')
    } else if (type === 'lastId') {
      result.last_id = getObjectDeepValue(field.flow_result[field.flow_result.length - 1], changing)
    } else if (type === 'sinceId') {
      result.since_id = getObjectDeepValue(query.is_up ? field.flow_result[0] : field.flow_result[field.flow_result.length - 1], changing)
      result.is_up = query.is_up ? 1 : 0
    } else if (type === 'jump') {
      result.page = query.page || 1
    } else {
      result.page = field.flow_page + 1
    }
  } else {
    if (type === 'seenIds') {
      result.seen_ids = ''
    } else if (type === 'lastId') {
      result.last_id = 0
    } else if (type === 'sinceId') {
      result.since_id = query.sinceId || (query.is_up ? 999999999 : 0)
      result.is_up = query.is_up ? 1 : 0
    } else if (type === 'jump') {
      result.page = query.page || 1
    } else {
      result.page = 1
    }
  }
  return Object.assign(query, result)
}

export const setReactivityField = (oldVal, newVal, type, insertBefore ) => {
  if (oldVal) {
    if (type === 'jump' || !isArray(newVal)) {
      return newVal
    } else {
      return insertBefore ? newVal.concat(oldVal) : oldVal.concat(newVal)
    }
  } else {
    return newVal
  }
}

export const defaultFlowField = {
  flow_result: [],
  flow_noMore: false,
  flow_nothing: false,
  flow_loading: false,
  flow_refreshing: false,
  flow_fetched: false,
  flow_error: null,
  flow_extra: null,
  flow_page: 0,
  flow_total: 0
}

export const flowEventKey = (prefix, type, id) => {
  return `${prefix || 'flow'}-${type}-${id || 0}`
}
