import Vue from 'nativescript-vue';
import Vuex from 'vuex';
Vue.use(Vuex);

//const debug = process.env.NODE_ENV !== 'production';

export const store = new Vuex.Store({

    state: {
        record: {
            lastName: "",
            firstName: "",
            cellPhone: "",
            employeeId: "",
            email: "",
            
        },
    },
    mutations: {
        setRecord(state, payload) {
            console.log('mutation');
            state.record = payload;
        },
        setError(state, payload) {
            state.error = payload;
        },
        clearError(state) {
            state.error = null;
        },
        
    },
    actions: {
        setRecord({ commit }, payload) {
            commit('setRecord', payload);
        },
        clearError({ commit }) {
            commit("clearError");
        }
    },
    getters: {
        record(state) {
            return state.record;
        },
        user(state) {
            return state.user;
        },
        
    },
});

