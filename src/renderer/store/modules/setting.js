const state = {
    width: '',
    height: '',
    quality: 100,
    format: ''
}

const mutations = {
    UPDATE_SETTING(state, data) {
        state.width = data.width
        state.height = data.height
        state.quality = data.quality
        state.format = data.format
    }
}

const actions = {
    updateSetting({ commit }, data) {
        commit('UPDATE_SETTING', data)
    }
}

export default {
    state,
    mutations,
    actions
}
