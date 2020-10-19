<template>
    <div class="v-catalog">
        <h1>Catalog</h1>
        <div class="v-catalog__list">
            <catalog-item
                    v-for="beer in BEERS_VIEW"
                    :key="beer.id"
                    :beer_data="beer"
            />
        </div>
        <loading :active.sync="isLoading"
                 :is-full-page="fullPage"></loading>
        <v-btn @click="nextPage" v-if="!lastPage && !isLoading">Show next</v-btn>
    </div>
</template>

<script>
    import CatalogItem from './CatalogItem'
    import {mapActions, mapGetters} from 'vuex';
    import axios from "axios";
    import Loading from 'vue-loading-overlay';

    export default {
        name: 'Beers',
        components: {
            CatalogItem,
            Loading
        },
        data() {
            return {
                currentPage: 1,
                lastPage: false,
                isLoading: true,
                fullPage: true,
            }
        },
        methods: {
            ...mapActions([
                'GET_BEERS_FROM_API'
            ]),
            async nextPage() {
                this.isLoading = true;
                this.currentPage++;
                await this.GET_BEERS_FROM_API(this.currentPage)
                    .then(() => this.isLoading = false);
                await this.nextPageExists();
            },
            nextPageExists() {
                const nextPage = this.currentPage + 1;
                return axios
                    .get(`https://api.punkapi.com/v2/beers?page=${nextPage}&limit=25`)
                    .then((res) => {
                        if (res.data.length === 0) {
                            this.lastPage = true;
                        }
                    });
            },
        },
        computed: {
            ...mapGetters([
                'BEERS',
                'BEERS_VIEW',
                'DROPPED_BEERS',
                'EDITED_BEERS'
            ]),
            actualBeers() {
                return this.BEERS_VIEW;
            },
        },

        mounted() {
            setTimeout(() => {
                this.GET_BEERS_FROM_API(this.currentPage).then(() => this.isLoading = false)
                this.nextPageExists();
            }, 1000);
        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .v-catalog__list {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
</style>
