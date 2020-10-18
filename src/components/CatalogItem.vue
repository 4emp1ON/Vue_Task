<template>
    <div class="wrapper d-flex flex-column">
        <Popup
                v-if="isPopupVisible"
                rightBtnTitle="Save"
                :beerId="beer_data.id"
                :beerName="beer_data.name"
                :beerDescription="beer_data.description"
                @closePopup="closePopup"
                @saveChanges="saveChanges"
        />
        <v-card
                class="mx-auto my-12"
                max-width="374"
        >
            <template slot="progress">
                <v-progress-linear
                        color="deep-purple"
                        height="10"
                        indeterminate
                ></v-progress-linear>
            </template>

            <v-img
                    class="mt-3"
                    contain
                    max-height="200"
                    :src="beer_data.image_url ? beer_data.image_url : 'https://via.placeholder.com/200.png'"
            ></v-img>

            <v-card-title>{{ beer_data.name }}</v-card-title>

            <v-card-text>
                <v-row
                        align="center"
                        class="mx-0"
                >
                </v-row>

                <div class="my-4 subtitle-1">
                    Article: {{ beer_data.id }}
                </div>

                <div>{{ beer_data. description }}</div>
            </v-card-text>

            <v-divider class="mx-4 card__divider"></v-divider>

            <v-card-actions class="card__actions">
                <v-btn
                        color="red lighten-2"
                        text
                        @click="DROP_BEER(beer_data.id)"
                >
                    Delete
                </v-btn>
                <v-btn
                        color="deep-purple lighten-2"
                        text
                        @click="showPopup"
                >
                    Edit
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
    import Popup from "./Popup";
    import {mapActions} from 'vuex';

    export default {
        name: "CatalogItem",
        props: {
            beer_data: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        components: {
            Popup
        },
        data() {
            return {
                isPopupVisible: false
            }
        },
        methods: {
            ...mapActions([
                "DROP_BEER",
                "EDIT_BEER"
            ]),
            showPopup() {
                this.isPopupVisible = true;
            },
            closePopup() {
                this.isPopupVisible = false;
            },
            saveChanges(changes) {
                const {name, description} = changes;
                const beerId = this.beer_data.id;
                const data = {
                    id: beerId,
                    newName: name,
                    newDescription: description,
                }
                this.EDIT_BEER(data);
            },
        }
    }
</script>

<style scoped>
    .item__image {
        max-height: 200px;
    }

    .card__divider {
        margin-top: auto;
    }
</style>
