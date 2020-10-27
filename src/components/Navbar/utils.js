import cache from '~/utils/cache'

const systemInfo = cache.get('SYSTEM_INFO')

export const wrapStyle = (state) => {
  return {
    height: `${state.rect ? state.rect.height + state.rect.margin * 2 : '50'}px`,
    paddingTop: `${systemInfo.statusBarHeight}px`
  }
}

export const coreStyle = (state) => {
  if (!state.rect) {
    return {}
  }

  return {
    width: `${state.rect.width}px`,
    height: `${state.rect.height}px`,
    marginBottom: `${state.rect.margin}px`
  }
}

export const shimStyle = (state) => {
  return {
    paddingTop: `${(state.rect ? state.rect.navbar : 100)}px`
  }
}
