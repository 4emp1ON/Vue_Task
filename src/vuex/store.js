import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        beers: [],
        droppedBeers: [],
        editedBeers: {},
    },
    mutations: {
        SET_BEERS: (state, beers) => {
            state.beers = beers;
        },
        ADD_BEERS: (state, beers) => {
            state.beers.push(...beers);
        },
        ADD_DROPPED_BEERS: (state, id) => {
            state.droppedBeers.push(id);
        },
        ADD_BEERS_CHANGES: (state, input) => {
            Vue.set(
                state.editedBeers,
                input.id, {
                    newName: input.newName,
                    newDescription: input.newDescription
                })
        }
    },
    actions: {
        GET_BEERS_FROM_API({commit}, page) {
            axios
                .get(`https://api.punkapi.com/v2/beers?page=${page}&limit=25`)
                .then((res) => {
                    commit(
                        page === 1 ? 'SET_BEERS' : 'ADD_BEERS',
                        res.data)
                    return res;
                })
                .catch(error => {
                    return error;
                });
        },
        DROP_BEER({commit}, id) {
            commit('ADD_DROPPED_BEERS', id);
            return id;
        },
        EDIT_BEER({commit}, input) {
            commit('ADD_BEERS_CHANGES', input);
            return input;
        },

    },
    getters:
        {
            BEERS(state) {
                return state.beers;
            },
            BEERS_VIEW(state) {
                return state.beers
                    .filter(b => !state.droppedBeers.includes(b.id))
                    .map(b => {
                        const edited = state.editedBeers[b.id];
                        return edited ? {...b, name: edited.newName, description: edited.newDescription} : b;
                    });
            },
            DROPPED_BEERS(state) {
                return state.droppedBeers;
            },
            EDITED_BEERS(state) {
                return state.editedBeers;
            }
        }
})

export default store;
