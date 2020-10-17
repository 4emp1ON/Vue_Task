import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        beers: [],
    },
    mutations: {
        SET_BEERS: (state, beers) => {
            state.beers = beers;
        }
    },
    actions: {
        GET_BEERS_FROM_API({commit}, page) {
            axios
                .get(`https://api.punkapi.com/v2/beers?page=${page}&limit=25`)
                .then((res) => {
                    commit('SET_BEERS', res.data)
                    return res;
                })
                .catch(error => {
                    console.log(error);
                    return error;
                });
        }
    },
    getters: {
        BEERS(state) {
            return state.beers;
        }
    }
})

export default store;
