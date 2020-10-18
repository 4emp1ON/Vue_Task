<template>
    <div class="v-catalog">
        <h1>Catalog</h1>
        <div class="v-catalog__list">
            <catalog-item
                    v-for="beer in actualBeers"
                    :key="beer.id"
                    :beer_data="beer"
            />
        </div>
        <loading :active.sync="isLoading" />
        <v-btn @click="nextPage"
               v-if="!this.lastPage && this.showNextButton"
               :disabled = "isLoading"
        >
            {{ this.isLoading ? 'Loading' : 'Show next' }}
        </v-btn>
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
                currentPage: 12,
                lastPage: false,
                isLoading: true,
                showNextButton: false
            }
        },
        methods: {
            ...mapActions([
                'GET_BEERS_FROM_API'
            ]),
            async nextPage() {
                this.isLoading = true;
                setTimeout(() => {
                    this.currentPage++;
                    this.GET_BEERS_FROM_API(this.currentPage)
                        .then(() => this.isLoading = false);
                    this.nextPageExists();
                }, 1000)
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
            }
        },
        computed: {
            ...mapGetters([
                'BEERS',
                'DROPPED_BEERS',
                'EDITED_BEERS'
            ]),
            actualBeers() {
                let beers = this.BEERS.filter(beer => !this.DROPPED_BEERS.includes(beer.id));
                beers.map((beer) => {
                    if (this.EDITED_BEERS[beer.id]) {
                        beer.name = this.EDITED_BEERS[beer.id].newName;
                        beer.description = this.EDITED_BEERS[beer.id].newDescription;
                    }
                });

                return beers;
            },
        },

        mounted() {
            setTimeout(() => {
                this.GET_BEERS_FROM_API(this.currentPage).then(() => {
                    this.isLoading = false
                    this.showNextButton = true
                })
                this.nextPageExists();
            }, 2000)
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
