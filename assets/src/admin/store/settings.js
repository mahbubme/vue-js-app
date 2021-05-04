// Initial state
const state = {
    emails: false,
    humandate: false,
    numrows: false,
};

// Getters
const getters = {
    getSettings: (state) => state,
};

// Actions
const actions = {
    setSettings({ commit }, data) {
        commit('setSettings', data);
    },

    addNewEmail({ commit }, email) {
        commit('addNewEmail', email);
    },

    removeEmail({ commit }, index) {
        commit('removeEmail', index);
    }
};

// Mutations
const mutations = {
    setSettings(state, data) {
        state.emails    = data.emails;
        state.humandate = data.humandate;
        state.numrows   = data.numrows;
    },

    addNewEmail(state, email) {
        state.emails.push( email );
    },

    removeEmail(state, index) {
        state.emails.splice(index, 1);
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};