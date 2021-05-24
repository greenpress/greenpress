export const actions = {
  init ({ commit, state }) {
    if (state.config.loaded) {
      return
    }
    return this.$axios.$get(`api/configurations/app-configuration`).then(({ metadata }) => {
      return commit('setConfig', metadata)
    })
  }
}

export const mutations = {
  setConfig (state, metadata) {
    return Object.assign(
      state.config,
      metadata,
      {
        titleSuffix: `${metadata.name} - ${metadata.slogan}`,
        loaded: true
      })
  }
}

export const state = () => ({
  config: {
    loaded: false,
    name: '',
    logoUrl: '',
    description: '',
    keywords: '',
    slogan: '',
    language: 'en',
    direction: 'ltr',
    titleSuffix: ''
  },
})
