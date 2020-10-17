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
        <v-btn>Show next</v-btn>
    </div>
</template>

<script>
    import CatalogItem from './CatalogItem'
    import {mapActions, mapGetters} from 'vuex';

    export default {
        name: 'Beers',
        components: {
            CatalogItem
        },
        data() {
            return {
                currentPage: 1,
            }
        },
        methods: {
            ...mapActions([
                'GET_BEERS_FROM_API'
            ])
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
            this.GET_BEERS_FROM_API(this.currentPage);
        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.v-catalog__list{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}
</style>
